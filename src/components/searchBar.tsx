import { Search } from "lucide-react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({
  searchUrl,
  initialValue,
}: {
  searchUrl: string;
  initialValue?: string | null;
}) => {
  const [query, setQuery] = useState(initialValue || "");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (query) {
      navigate(`${searchUrl}?q=${query}`);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="relative flex grow items-center rounded bg-stone-200 px-2 py-1.5 text-sm"
      >
        <button type="submit" className="cursor-pointer">
          <Search className="mr-2 text-stone-500" />
        </button>
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-transparent placeholder:text-stone-400 focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </>
  );
};

export default SearchBar;
