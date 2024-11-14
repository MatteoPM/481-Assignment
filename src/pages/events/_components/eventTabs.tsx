import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const EventTabs = ({ value }: { value: string }) => {
  return (
    <Tabs value={value} className="mt-3">
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="all" asChild>
          <Link to={"/events"}>All Events</Link>
        </TabsTrigger>
        <TabsTrigger value="rsvps" asChild>
          <Link to={"/events/rsvps"}>Your RSVPs</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default EventTabs;
