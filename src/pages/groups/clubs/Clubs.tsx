import Page from "@/components/page";
import SearchBar from "@/components/searchBar";
import { Button } from "@/components/ui/button";
import GroupCard from "@/pages/groups/_components/groupCard";
import { groups } from "@/placeholderData";
import { Filter, Plus } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import GroupTabs from "../_components/groupTabs";

function Clubs() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";

  const filteredJoinedGroups = groups
    .filter((group) => !group.isCourse)
    .filter((group) => group.name.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <Page title="Groups" headerContent={<GroupTabs value="clubs" />}>
        <div className="flex items-center gap-4">
          <SearchBar placeholder="Search clubs..." />

          <Link
            to={"/groups/create"}
            className="rounded-full bg-white p-1 shadow"
          >
            <Plus className="text-green-400" />
          </Link>
        </div>

        <Button variant={"outline"} className="mt-2 w-full">
          <Filter className="w-[15px]" />
          <span>Filters</span>
        </Button>

        <h2 className="mt-6 text-xl font-semibold">Your Clubs</h2>
        <div className="mt-3 flex flex-col divide-y overflow-hidden rounded-md border bg-white shadow-sm">
          {groups
            .filter((group) => !group.isCourse)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((group) => (
              <GroupCard group={group} compact />
            ))}
        </div>

        <h2 className="mt-8 text-xl font-semibold">Suggested Clubs</h2>
        <div className="mt-1 grid snap-x snap-mandatory auto-cols-[300px] grid-flow-col grid-rows-2 gap-2 overflow-x-auto rounded-md py-2">
          {groups
            .filter((group) => !group.isCourse)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((group) => (
              <GroupCard group={group} />
            ))}
        </div>
      </Page>
    </>
  );
}

export default Clubs;