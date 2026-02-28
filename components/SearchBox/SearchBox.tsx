import css from "./SearchBox.module.css";

interface SearchBoxProps {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBox({ handleSearch }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={handleSearch}
    />
  );
}
