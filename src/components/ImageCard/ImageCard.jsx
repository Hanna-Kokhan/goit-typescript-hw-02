import css from "./ImageCard.module.css";

const ImageCard = ({ image, onClick }) => (
  <div className={css.imageCard} onClick={() => onClick(image)}>
    <img
      className={css.image}
      src={image.urls.small}
      alt={image.alt_description}
    />
  </div>
);

export default ImageCard;
