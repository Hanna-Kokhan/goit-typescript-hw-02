import { useState, useEffect } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";
import css from "./App.module.css";
import { Toaster } from "react-hot-toast";
import { UnsplashImage, UnsplashSearchResponse, ImageModalData } from "./types";

const ACCESS_KEY: string = "9Fvr_mU7CqsJ9MEc9I6dm69ffq7oQVEZaQC5ORu5ni0";

export default function App() {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ImageModalData>(null);
  const [totalImages, setTotalImages] = useState<number>(0);
  const [hasMoreImages, setHasMoreImages] = useState<boolean>(true);
  const [initialLoadComplete, setInitialLoadComplete] =
    useState<boolean>(false);

  useEffect(() => {
    if (!query) return;

    if (!hasMoreImages && page > 1) {
      setLoading(false);
      return;
    }

    const fetchImages = async (): Promise<void> => {
      setLoading(true);
      setError(false);

      try {
        const response: AxiosResponse<UnsplashSearchResponse> = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: { query, page, per_page: 16 },
            headers: {
              Authorization: `Client-ID ${ACCESS_KEY}`,
            },
          }
        );

        if (page === 1) {
          setImages(response.data.results);
          setTotalImages(response.data.total);
          setHasMoreImages(response.data.total_pages > page);
        } else {
          setImages((prevImages) => [...prevImages, ...response.data.results]);
          setHasMoreImages(response.data.total_pages > page);
        }

        setInitialLoadComplete(true);
      } catch (e: unknown) {
        const err = e as AxiosError;
        console.error("Fetch images error:", err);

        if (err.response && images.length > 0) {
          if (err.response.status === 404 || err.response.status === 403) {
            setHasMoreImages(false);
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
        setHasMoreImages(false);
        setInitialLoadComplete(true);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearch = (newQuery: string): void => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setError(false);
    setModalData(null);
    setTotalImages(0);
    setHasMoreImages(true);
    setInitialLoadComplete(false);
  };

  const loadMore = (): void => {
    if (hasMoreImages && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const showLoadMoreButton =
    images.length > 0 && !loading && hasMoreImages && !error;

  const showNoResultsMessage =
    initialLoadComplete &&
    !loading &&
    images.length === 0 &&
    totalImages === 0 &&
    !error;

  const showEndOfResultsMessage =
    initialLoadComplete &&
    !loading &&
    !hasMoreImages &&
    images.length > 0 &&
    !error;

  return (
    <div className={css.container}>
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

      <SearchBar onSubmit={handleSearch} />

      {error && <ErrorMessage />}

      <ImageGallery images={images} onImageClick={setModalData} />

      {loading && <Loader />}

      {showLoadMoreButton && <LoadMoreBtn onClick={loadMore} />}

      {showNoResultsMessage && (
        <p className={css.endMessage}>
          No images found for your request. Please try a different query.
        </p>
      )}

      {showEndOfResultsMessage && (
        <p className={css.endMessage}>
          These are all the images for your request.
        </p>
      )}

      {modalData && (
        <ImageModal data={modalData} onClose={() => setModalData(null)} />
      )}
    </div>
  );
}
