import Page from "@/components/page";
import SearchBar from "@/components/searchBar";
import { Plus } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import Card from "../../../components/card";

function Search() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");

  return (
    <>
      <Page title="Groups">
        <div className="flex items-center gap-4">
          <SearchBar searchUrl="/groups/search" />

          <button className="rounded-full bg-white p-1 shadow">
            <Plus className="text-green-400" />
          </button>
        </div>

        <h2 className="mt-6 text-xl font-semibold">Results for "{q}"</h2>
        <div className="mt-2 grid grid-cols-2 gap-3">
          <Link to="/groups/1">
            <Card />
          </Link>
          <Card />
          <Card />
          <Card />
        </div>
      </Page>
    </>
  );
}

export default Search;
