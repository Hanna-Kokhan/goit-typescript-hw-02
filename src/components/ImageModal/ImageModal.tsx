import Modal from "react-modal";
import css from "./ImageModal.module.css";
import { ImageModalData, UnsplashImage } from "../../types";

Modal.setAppElement("#root");

interface ImageModalProps {
  data: ImageModalData;
  onClose: () => void;
}

export default function ImageModal({
  data,
  onClose,
}: ImageModalProps): JSX.Element {
  if (!data) return <></>;

  return (
    <Modal
      isOpen={!!data}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <div className={css.content}>
        <img
          className={css.image}
          src={data.urls.regular}
          alt={data.alt_description || ""}
        />
        <div className={css.info}>
          <p>
            <strong>Author:</strong> {data.user.name}
          </p>
          <p>
            <strong>Likes:</strong> {data.likes}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {data.description || data.alt_description || "No description"}
          </p>
        </div>
      </div>
    </Modal>
  );
}
