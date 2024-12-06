import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useData } from "@/hooks/useData";
import { Link } from "react-router-dom";

const GroupTabs = ({ value }: { value: string }) => {
  const { data } = useData();

  const groupsWithJoinRequests = data.groups
    .filter((group) => group.leaderId === data.currentUser!.id)
    .filter((group) => group.applicationIds.length > 0);

  return (
    <Tabs value={value} className="mt-3">
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="courses" asChild>
          <Link to={"/groups"}>Courses</Link>
        </TabsTrigger>
        <TabsTrigger value="clubs" asChild>
          <Link to={"/groups/clubs"}>
            <span>Clubs</span>
            {groupsWithJoinRequests.length > 0 && (
              <div className="ml-2 flex size-[18px] items-center justify-center rounded-full bg-red-400/10 text-xs text-red-400">
                {groupsWithJoinRequests.length}
              </div>
            )}
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default GroupTabs;
