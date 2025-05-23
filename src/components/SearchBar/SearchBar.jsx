import { useState } from "react";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSubmit }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) {
      toast.error("Enter your search request!");
      return;
    }
    onSubmit(input.trim());
    setInput("");
  };

  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit} className={css.searchBar}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className={css.searchButton} type="submit">
          Search
        </button>
      </form>
    </header>
  );
}
