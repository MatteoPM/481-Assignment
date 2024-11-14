import Page from "@/components/page";
import EventCard from "@/pages/events/_components/eventCard";
import { events } from "@/placeholderData";
import EventTabs from "../_components/eventTabs";

function Rsvps() {
  return (
    <>
      <Page title="Events" headerContent={<EventTabs value="rsvps" />}>
        <h2 className="text-xl font-semibold">Your RSVPs</h2>

        <div className="mt-3 space-y-3">
          {events
            .sort((a, b) => a.startDateTime.localeCompare(b.startDateTime))
            .map((event) => (
              <EventCard event={event} />
            ))}
        </div>
      </Page>
    </>
  );
}

export default Rsvps;
