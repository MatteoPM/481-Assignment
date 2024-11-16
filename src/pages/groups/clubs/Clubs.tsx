import Page from "@/components/page";
import SearchBar from "@/components/searchBar";
import GroupCard from "@/pages/groups/_components/groupCard";
import { groups } from "@/placeholderData";
import { Plus } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import GroupTabs from "../_components/groupTabs";

function Clubs() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";

  const filteredClubs = groups
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

        {q ? (
          <>
            <h2 className="mt-6 text-xl font-semibold">Clubs Matching "{q}"</h2>
            {filteredClubs.length > 0 && (
              <div className="mt-3 flex flex-col divide-y overflow-hidden rounded-md border bg-white shadow-sm">
                {filteredClubs.map((group) => (
                  <GroupCard group={group} compact />
                ))}
              </div>
            )}
            {filteredClubs.length === 0 && (
              <div className="mt-8 text-center font-semibold text-muted-foreground">
                No clubs found. Adjust your filters.
              </div>
            )}
          </>
        ) : (
          <>
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
          </>
        )}
      </Page>
    </>
  );
}

export default Clubs;
