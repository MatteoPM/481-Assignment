import Page from "@/components/page";
import SubHeader from "@/components/subHeader";
import { useData } from "@/hooks/useData";
import EventCard from "@/pages/events/_components/eventCard";
import { Calendar } from "lucide-react";
import { useParams } from "react-router-dom";

function GroupEvents() {
  const { groupId } = useParams();
  const { data } = useData();
  const group = data.groups.find((group) => group.id === Number(groupId));

  if (!group) {
    throw new Error();
  }

  if (!data.currentUser) {
    throw new Error("No user");
  }

  const events = data.events.filter((event) => event.groupId === group.id);

  return (
    <>
      <Page title={"Events"} showBackButton bodyClassname=" flex flex-col">
        <SubHeader
          Icon={Calendar}
          text={
            <span>
              {group.name} Events{" "}
              <span className="font-normal text-muted-foreground">
                ({events.length})
              </span>
            </span>
          }
          className="mt-0"
        />

        {events.length > 0 && (
          <div className="mt-3 space-y-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
        {events.length === 0 && (
          <div className="mb-6 mt-3 text-center font-semibold text-muted-foreground">
            No events exist.
          </div>
        )}
      </Page>
    </>
  );
}

export default GroupEvents;
