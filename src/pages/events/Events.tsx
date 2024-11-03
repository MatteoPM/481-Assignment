import Page from "@/components/page";
import SearchBar from "@/components/searchBar";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../../components/card";

function Events() {
  return (
    <>
      <Page title="Events">
        <div className="flex items-center gap-4">
          <SearchBar searchUrl="/events/search" />

          <Link
            to={"/events/create"}
            className="rounded-full bg-white p-1 shadow"
          >
            <Plus className="text-green-400" />
          </Link>
        </div>

        <h2 className="mt-6 text-xl font-semibold">RSVP'd</h2>
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
        </div>
      </Page>
    </>
  );
}

export default Events;
