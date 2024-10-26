import { MessageSquare, Plus, SearchIcon, UserCircle } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Card from "../../../components/card";
import FooterNav from "../../../components/footerNav";

function Search() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const navigate = useNavigate();
  const [query, setQuery] = useState(q || "");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (query) {
      navigate(`/groups/search?q=${query}`);
    }
  };

  return (
    <>
      <div className="h-full flex flex-col">
        <div className="p-4 overflow-y-auto">
          <div className="grid grid-cols-3 items-center text-stone-700">
            <UserCircle className="w-8 h-8" />
            <h1 className="text-center font-semibold">Groups</h1>
            <div className="justify-self-end">
              <MessageSquare className="w-8 h-8" />
            </div>
          </div>

          <div className="flex gap-4 items-center mt-6">
            <form
              onSubmit={handleSubmit}
              className="bg-stone-200 relative rounded flex items-center px-2 py-1.5 text-sm grow"
            >
              <button type="submit" className="cursor-pointer">
                <SearchIcon className="mr-2 text-stone-500" />
              </button>
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-transparent placeholder:text-stone-400 focus:outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </form>
            <button className="bg-white rounded-full p-1 shadow">
              <Plus className="text-green-400" />
            </button>
          </div>

          <h2 className="font-semibold text-xl mt-6">Results for "{query}"</h2>
          <div className="grid grid-cols-2 mt-2 gap-3">
            <Link to="/groups/1">
              <Card />
            </Link>
            <Card />
            <Card />
            <Card />
          </div>
        </div>

        <FooterNav />
      </div>
    </>
  );
}

export default Search;
