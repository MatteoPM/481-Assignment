import Page from "@/components/page";
import SearchBar from "@/components/searchBar";
import EventCard from "@/pages/events/_components/eventCard";
import EventFilter from "@/pages/events/_components/eventFilter";
import { events } from "@/placeholderData";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import EventTabs from "./_components/eventTabs";

function Events() {
  return (
    <>
      <Page title="Events" headerContent={<EventTabs value="all" />}>
        <div className="top-0 flex items-center gap-4">
          <SearchBar searchUrl="/events/search" />

          <Link
            to={"/events/create"}
            className="rounded-full bg-white p-1 shadow"
          >
            <Plus className="text-green-400" />
          </Link>
        </div>

        <EventFilter />

        <h2 className="mt-6 text-xl font-semibold">All Events</h2>

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

export default Events;
