import Page from "@/components/page";
import GroupCard from "@/pages/groups/_components/groupCard";
import { groups } from "@/placeholderData";
import GroupTabs from "../_components/groupTabs";

function Courses() {
  return (
    <>
      <Page title="Groups" headerContent={<GroupTabs value="courses" />}>
        <h2 className="text-xl font-semibold">Your Courses</h2>
        <div className="mt-3 flex flex-col divide-y overflow-hidden rounded-md border bg-white shadow-sm">
          {groups
            .filter((group) => group.isCourse)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((group) => (
              <GroupCard group={group} compact />
            ))}
        </div>
      </Page>
    </>
  );
}

export default Courses;
