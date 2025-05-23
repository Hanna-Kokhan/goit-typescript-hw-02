import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn = ({ onClick }: LoadMoreBtnProps): JSX.Element => (
  <div className={css.loadMore}>
    <button className={css.loadMoreButton} onClick={onClick}>
      Load more
    </button>
  </div>
);

export default LoadMoreBtn;
