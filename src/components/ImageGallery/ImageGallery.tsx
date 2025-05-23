import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";
import { UnsplashImage } from "../../types";

interface ImageGalleryProps {
  images: UnsplashImage[];
  onImageClick: (image: UnsplashImage) => void;
}

export default function ImageGallery({
  images,
  onImageClick,
}: ImageGalleryProps) {
  if (!images.length) return null;

  return (
    <ul className={css.gallery}>
      {images.map((image) => (
        <li key={image.id}>
          <ImageCard image={image} onClick={() => onImageClick(image)} />
        </li>
      ))}
    </ul>
  );
}
