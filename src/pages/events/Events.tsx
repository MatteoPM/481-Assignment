import Page from "@/components/page";
import SearchBar from "@/components/searchBar";
import EventCard from "@/pages/events/_components/eventCard";
import EventFilter from "@/pages/events/_components/eventFilter";
import { events } from "@/placeholderData";
import { Plus } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import EventTabs from "./_components/eventTabs";

function Events() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";

  return (
    <>
      <Page title="Events" headerContent={<EventTabs value="all" />}>
        <div className="top-0 flex items-center gap-4">
          <SearchBar placeholder="Search all events..." />

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

        <div className="mt-3 space-y-3">
          {events
            .filter((event) =>
              event.title.toLowerCase().includes(q.toLowerCase()),
            )
            .sort((a, b) => a.startDateTime.localeCompare(b.startDateTime))
            .map((event) => (
              <EventCard event={event} key={event.id} />
            ))}
        </div>
      </Page>
    </>
  );
}

export default Events;
