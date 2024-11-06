import GroupCard from "@/components/groupCard";
import Page from "@/components/page";
import SearchBar from "@/components/searchBar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useSearchParams } from "react-router-dom";

function Search() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");

  return (
    <>
      <Page title="Groups">
        <div className="flex items-center gap-4">
          <SearchBar searchUrl="/groups/search" initialValue={q} />

          <button className="rounded-full bg-white p-1 shadow">
            <Plus className="text-green-400" />
          </button>
        </div>

        <Button variant={"outline"} className="mt-2 w-full">
          Filters
        </Button>

        <h2 className="mt-6 text-xl font-semibold">Results for "{q}"</h2>
        <div className="mt-1 grid gap-2 rounded-md py-2">
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
        </div>

        <p className="mt-2 text-center text-sm font-medium text-muted-foreground">
          End of results.
        </p>
      </Page>
    </>
  );
}

export default Search;
