import { FadeLoader } from "react-spinners";
import css from "./Loader.module.css";

export default function Loader(): JSX.Element {
  return (
    <div className={css.loader}>
      <FadeLoader color="#2e8abd" />
    </div>
  );
}
