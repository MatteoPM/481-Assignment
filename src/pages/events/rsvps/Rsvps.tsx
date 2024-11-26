import Page from "@/components/page";
import SearchBar from "@/components/searchBar";
import { useData } from "@/hooks/useData";
import EventCard from "@/pages/events/_components/eventCard";
import { useSearchParams } from "react-router-dom";
import EventFilter from "../_components/eventFilter";
import EventTabs from "../_components/eventTabs";

function Rsvps() {
  const { data } = useData();
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";

  const filteredRsvps = data.events
    .filter((event) => {
      const group = data.groups.find((group) => group.id === event.groupId)!;

      return (
        event.title.toLowerCase().includes(q.toLowerCase()) ||
        group.name.toLowerCase().includes(q.toLowerCase())
      );
    })
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
          <>
            <div className="mt-3 space-y-3">
              {data.events
                .filter((event) =>
                  event.title.toLowerCase().includes(q.toLowerCase()),
                )
                .sort((a, b) => a.startDateTime.localeCompare(b.startDateTime))
                .map((event) => (
                  <EventCard event={event} key={event.id} />
                ))}
            </div>
            {q && (
              <p className="mt-2 text-center text-sm font-medium text-muted-foreground">
                End of results.
              </p>
            )}
          </>
        )}
        {filteredRsvps.length === 0 && (
          <div className="mt-8 text-center font-semibold text-muted-foreground">
            No events found. Adjust your search query.
          </div>
        )}
      </Page>
    </>
  );
}

export default Rsvps;
