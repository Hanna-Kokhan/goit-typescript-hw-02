import { useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps): JSX.Element {
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
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
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
        />
        <button className={css.searchButton} type="submit">
          Search
        </button>
      </form>
    </header>
  );
}
