import Page from "@/components/page";
import SearchBar from "@/components/searchBar";
import { useData } from "@/hooks/useData";
import GroupCard from "@/pages/groups/_components/groupCard";
import { useSearchParams } from "react-router-dom";
import GroupTabs from "../_components/groupTabs";

function Courses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const { data } = useData();

  const filteredCourses = data.groups
    .filter((group) => group.isCourse)
    .filter((group) => data.currentUser!.memberGroupIds.includes(group.id))
    .filter((group) => group.name.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <Page title="Groups" headerContent={<GroupTabs value="courses" />}>
        <SearchBar placeholder="Search courses..." />

        <h2 className="mt-6 text-xl font-semibold">
          {q ? `Courses Matching "${q}"` : "Your Courses"}
        </h2>
        {filteredCourses.length > 0 && (
          <>
            <div className="mt-3 flex flex-col divide-y overflow-hidden rounded-md border bg-white shadow-sm">
              {filteredCourses.map((group) => (
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
        {filteredCourses.length === 0 && (
          <div className="mt-8 text-balance text-center font-semibold text-muted-foreground">
            No courses found. Adjust or{" "}
            <button
              className="text-primary"
              onClick={() => {
                searchParams.delete("q");
                setSearchParams(searchParams);
              }}
            >
              reset
            </button>{" "}
            your search query.
          </div>
        )}
      </Page>
    </>
  );
}

export default Courses;
