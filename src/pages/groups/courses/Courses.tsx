import Page from "@/components/page";
import SearchBar from "@/components/searchBar";
import { useData } from "@/hooks/useData";
import GroupCard from "@/pages/groups/_components/groupCard";
import { useSearchParams } from "react-router-dom";
import GroupTabs from "../_components/groupTabs";

function Courses() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const { data } = useData();

  const filteredCourses = data.groups
    .filter((group) => group.isCourse)
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
          <div className="mt-3 flex flex-col divide-y overflow-hidden rounded-md border bg-white shadow-sm">
            {filteredCourses.map((group) => (
              <GroupCard key={group.id} group={group} compact />
            ))}
          </div>
        )}
        {filteredCourses.length === 0 && (
          <div className="mt-8 text-center font-semibold text-muted-foreground">
            No clubs found. Adjust your search query.
          </div>
        )}
      </Page>
    </>
  );
}

export default Courses;
