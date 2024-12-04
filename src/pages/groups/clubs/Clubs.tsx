import Page from "@/components/page";
import SearchBar from "@/components/searchBar";
import SubHeader from "@/components/subHeader";
import { useData } from "@/hooks/useData";
import GroupCard from "@/pages/groups/_components/groupCard";
import { Crown, Plus, User } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import GroupTabs from "../_components/groupTabs";

function Clubs() {
  const { data } = useData();
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";

  const filteredClubs = data.groups
    .filter((group) => !group.isCourse)
    .filter((group) => group.name.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  const leadingClubs = data
    .currentUser!.leaderGroupIds.map(
      (id) => data.groups.find((group) => group.id === id)!,
    )
    .sort((a, b) => a.name.localeCompare(b.name));
  const memberClubs = data
    .currentUser!.memberGroupIds.map(
      (id) => data.groups.find((group) => group.id === id)!,
    )
    .filter((group) => !group.isCourse)
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
              <>
                <div className="mt-3 flex flex-col divide-y overflow-hidden rounded-md border bg-white shadow-sm">
                  {filteredClubs.map((group) => (
                    <GroupCard key={group.id} group={group} compact />
                  ))}
                </div>
                {q && (
                  <p className="mt-2 text-center text-sm font-medium text-muted-foreground">
                    End of results.
                  </p>
                )}
              </>
            )}
            {filteredClubs.length === 0 && (
              <div className="mt-8 text-center font-semibold text-muted-foreground">
                No clubs found. Adjust your search query.
              </div>
            )}
          </>
        ) : (
          <>
            <h2 className="mt-6 text-xl font-semibold">Your Clubs</h2>

            <SubHeader Icon={Crown} text="Leader" />
            {leadingClubs.length === 0 && (
              <div className="mt-4 text-center font-semibold text-muted-foreground">
                You are not leading any clubs.
              </div>
            )}
            {leadingClubs.length > 0 && (
              <div className="mt-3 flex flex-col divide-y overflow-hidden rounded-md border bg-white shadow-sm">
                {leadingClubs.map((group) => (
                  <GroupCard key={group.id} group={group} compact />
                ))}
              </div>
            )}

            <SubHeader Icon={User} text="Member" />
            {memberClubs.length === 0 && (
              <div className="mt-4 text-center font-semibold text-muted-foreground">
                You are not a member of any clubs.
              </div>
            )}
            {memberClubs.length > 0 && (
              <div className="mt-3 flex flex-col divide-y overflow-hidden rounded-md border bg-white shadow-sm">
                {memberClubs.map((group) => (
                  <GroupCard key={group.id} group={group} compact />
                ))}
              </div>
            )}

            <h2 className="mt-8 text-xl font-semibold">Suggested Clubs</h2>
            <div className="mt-3 flex flex-col divide-y overflow-hidden rounded-md border bg-white shadow-sm">
              {data.groups
                .filter((group) => !group.isCourse)
                .filter(
                  (group) =>
                    !data.currentUser!.leaderGroupIds.includes(group.id) &&
                    !data.currentUser!.memberGroupIds.includes(group.id),
                )
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((group) => (
                  <GroupCard key={group.id} group={group} />
                ))}
            </div>
          </>
        )}
      </Page>
    </>
  );
}

export default Clubs;
