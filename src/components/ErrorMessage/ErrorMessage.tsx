import css from "./ErrorMessage.module.css";

export default function ErrorMessage(): JSX.Element {
  return (
    <p className={css.error}>Oops! Something went wrong. Please try again.</p>
  );
}
