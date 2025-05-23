import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";
import css from "./App.module.css";
import { Toaster } from "react-hot-toast";

const ACCESS_KEY = "9Fvr_mU7CqsJ9MEc9I6dm69ffq7oQVEZaQC5ORu5ni0";

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: { query, page, per_page: 16 },
            headers: {
              Authorization: `Client-ID ${ACCESS_KEY}`,
            },
          }
        );

        if (page === 1) {
          setTotalImages(response.data.total);
        }

        setImages((prev) => [...prev, ...response.data.results]);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setTotalImages(0);
  };

  const loadMore = () => setPage((prev) => prev + 1);

  const allImagesLoaded = images.length >= totalImages;

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage />}
      <ImageGallery images={images} onImageClick={setModalData} />
      {loading && <Loader />}

      {images.length > 0 && !loading && !allImagesLoaded && (
        <LoadMoreBtn onClick={loadMore} />
      )}

      {images.length > 0 && allImagesLoaded && (
        <p className={css.endMessage}>
          There are no more images for your request.
        </p>
      )}

      {modalData && (
        <ImageModal data={modalData} onClose={() => setModalData(null)} />
      )}

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </div>
  );
}
