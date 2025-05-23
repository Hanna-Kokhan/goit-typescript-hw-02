import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick }) => (
  <div className={css.loadMore}>
    <button className={css.loadMoreButton} onClick={onClick}>
      Load more
    </button>
  </div>
);

export default LoadMoreBtn;
