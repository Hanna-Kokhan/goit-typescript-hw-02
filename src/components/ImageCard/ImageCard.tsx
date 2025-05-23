import css from "./ImageCard.module.css";
import { UnsplashImage } from "../../types";

interface ImageCardProps {
  image: UnsplashImage;
  onClick: (image: UnsplashImage) => void;
}

const ImageCard = ({ image, onClick }: ImageCardProps): JSX.Element => (
  <div className={css.imageCard} onClick={() => onClick(image)}>
    <img
      className={css.image}
      src={image.urls.small}
      alt={image.alt_description || ""}
    />
  </div>
);

export default ImageCard;
