import Page from "@/components/page";
import SearchBar from "@/components/searchBar";
import EventCard from "@/pages/events/_components/eventCard";
import { events } from "@/placeholderData";
import { useSearchParams } from "react-router-dom";
import EventFilter from "../_components/eventFilter";
import EventTabs from "../_components/eventTabs";

function Rsvps() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";

  const filteredRsvps = events
    .filter((event) => event.title.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => a.startDateTime.localeCompare(b.startDateTime));

  return (
    <>
      <Page title="Events" headerContent={<EventTabs value="rsvps" />}>
        <SearchBar placeholder="Search RSVPs..." />

        <EventFilter />

        <h2 className="mt-6 text-xl font-semibold">
          {q ? `RSVPs Matching "${q}"` : "Your RSVPs"}
        </h2>

        {filteredRsvps.length > 0 && (
          <div className="mt-3 space-y-3">
            {filteredRsvps.map((event) => (
              <EventCard event={event} />
            ))}
          </div>
        )}
        {filteredRsvps.length === 0 && (
          <div className="mt-8 text-center font-semibold text-muted-foreground">
            No RSVPs found. Adjust your filters.
          </div>
        )}
      </Page>
    </>
  );
}

export default Rsvps;
