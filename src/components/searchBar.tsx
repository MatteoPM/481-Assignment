import { Search, X } from "lucide-react";
import { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";

const SearchBar = ({ placeholder }: { placeholder?: string }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value) {
      setSearchParams({ q: value }, { replace: true });
    } else {
      searchParams.delete("q");
      setSearchParams(searchParams, { replace: true });
    }
  };

  return (
    <>
      <div className="relative flex grow items-center rounded bg-stone-200 px-2 py-1.5 text-sm">
        <Search className="mr-2 size-5 shrink-0 text-stone-500" />

        <input
          type="text"
          value={searchParams.get("q") || ""}
          placeholder={placeholder || "Search"}
          className="w-full bg-transparent placeholder:text-stone-400 focus:outline-none"
          onChange={handleChange}
        />

        {q && (
          <button
            onClick={() => {
              searchParams.delete("q");
              setSearchParams(searchParams);
            }}
            className="flex items-center justify-center rounded-full bg-stone-400 p-0.5 text-white"
          >
            <X className="size-3.5 text-stone-300" />
          </button>
        )}
      </div>
    </>
  );
};

export default SearchBar;
