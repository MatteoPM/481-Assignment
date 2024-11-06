import { Search, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SearchBar = ({
  searchUrl,
  initialValue,
  placeholder,
}: {
  searchUrl: string;
  initialValue?: string | null;
  placeholder?: string;
}) => {
  const [query, setQuery] = useState(initialValue || "");
  const navigate = useNavigate();
  const location = useLocation();

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
          <Search className="mr-2 size-5 text-stone-500" />
        </button>
        <input
          type="text"
          placeholder={placeholder || "Search"}
          className="w-full bg-transparent placeholder:text-stone-400 focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {location.pathname.includes("search") && (
          <Link
            to={searchUrl.replace("/search", "")}
            className="flex items-center justify-center rounded-full bg-stone-400 p-0.5 text-white"
          >
            <X className="size-3.5 text-stone-300" />
          </Link>
        )}
      </form>
    </>
  );
};

export default SearchBar;
