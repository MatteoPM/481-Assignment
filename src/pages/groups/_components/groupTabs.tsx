import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const GroupTabs = ({ value }: { value: string }) => {
  return (
    <Tabs value={value} className="mt-3">
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="courses" asChild>
          <Link to={"/groups"}>Courses</Link>
        </TabsTrigger>
        <TabsTrigger value="clubs" asChild>
          <Link to={"/groups/clubs"}>Clubs</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default GroupTabs;
