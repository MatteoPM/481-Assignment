import Page from "@/components/page";
import SearchBar from "@/components/searchBar";
import { useData } from "@/hooks/useData";
import EventCard from "@/pages/events/_components/eventCard";
import EventFilter from "@/pages/events/_components/eventFilter";
import { Plus } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import EventTabs from "./_components/eventTabs";

function Events() {
  const { data } = useData();
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";

  const filteredEvents = data.events
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
      <Page title="Events" headerContent={<EventTabs value="all" />}>
        <div className="top-0 flex items-center gap-4">
          <SearchBar placeholder="Search groups / event names..." />

          <Link
            to={"/events/create"}
            className="rounded-full bg-white p-1 shadow"
          >
            <Plus className="text-green-400" />
          </Link>
        </div>

        <EventFilter />

        <h2 className="mt-6 text-xl font-semibold">
          {q ? `Events Matching "${q}"` : "All Events"}
        </h2>

        {filteredEvents.length > 0 && (
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
        {filteredEvents.length === 0 && (
          <div className="mt-8 text-center font-semibold text-muted-foreground">
            No events found. Adjust your search query.
          </div>
        )}
      </Page>
    </>
  );
}

export default Events;
