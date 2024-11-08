import EventCard from "@/components/eventCard";
import EventFilter from "@/components/eventFilter";
import Page from "@/components/page";
import SearchBar from "@/components/searchBar";
import { events } from "@/placeholderData";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

function Events() {
  return (
    <>
      <Page title="Events">
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

        <div className="mt-6 space-y-3">
          <EventCard event={events[0]} />
          <EventCard event={events[1]} />
          <EventCard event={events[2]} />
        </div>

        {/* <h2 className="mt-6 text-xl font-semibold">RSVP'd</h2>
        <div className="mt-1 flex gap-2 overflow-x-auto rounded-md py-2 scrollbar">
          <Link to="/events/1" className="text-blue-400">
            <Card />
          </Link>
          <Card />
          <Card />
          <Card />
        </div>

        <h2 className="mt-8 text-xl font-semibold">Upcoming Events</h2>
        <div className="mt-1 flex gap-2 overflow-x-auto rounded-md py-2">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>

        <h2 className="mt-8 text-xl font-semibold">Suggested Events</h2>
        <div className="mt-1 flex gap-2 overflow-x-auto rounded-md py-2">
          <Card />
          <Card />
          <Card />
          <Card />
        </div> */}
      </Page>
    </>
  );
}

export default Events;
