import Page from "@/components/page";
import SearchBar from "@/components/searchBar";
import { Button } from "@/components/ui/button";
import GroupCard from "@/pages/groups/_components/groupCard";
import { groups } from "@/placeholderData";
import { Filter, Plus } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import GroupTabs from "../_components/groupTabs";

function SearchGroups() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q")!;

  const filteredClubs = groups
    .filter((group) => !group.isCourse)
    .filter((group) => group.name.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  const leadingClubs = filteredClubs.filter((group) => group.leaderId === 0);
  const memberClubs = filteredClubs.filter((group) => group.leaderId !== 0);

  return (
    <>
      <Page title="Groups" headerContent={<GroupTabs value="clubs" />}>
        <div className="flex items-center gap-4">
          <SearchBar />

          <button className="rounded-full bg-white p-1 shadow">
            <Plus className="text-green-400" />
          </button>
        </div>

        <Button variant={"outline"} className="mt-2 w-full">
          <Filter className="w-[15px]" />
          <span>Filters</span>
        </Button>

        <h2 className="mt-6 text-xl font-semibold">Results for "{q}"</h2>
        <div className="mt-1 grid gap-2 rounded-md py-2">
          {groups
            .filter(
              (group) =>
                !group.isCourse &&
                group.name.toLowerCase().includes(q?.toLowerCase()),
            )
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((group) => (
              <GroupCard group={group} />
            ))}
        </div>

        <p className="mt-2 text-center text-sm font-medium text-muted-foreground">
          End of results.
        </p>
      </Page>
    </>
  );
}

export default SearchGroups;
