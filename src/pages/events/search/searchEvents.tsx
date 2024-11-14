import Page from "@/components/page";
import SearchBar from "@/components/searchBar";
import EventCard from "@/pages/events/_components/eventCard";
import EventFilter from "@/pages/events/_components/eventFilter";
import { events } from "@/placeholderData";
import { Plus } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

function SearchEvents() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q")!;

  return (
    <>
      <Page title="Events">
        <div className="top-0 flex items-center gap-4">
          <SearchBar searchUrl="/events/search" initialValue={q} />

          <Link
            to={"/events/create"}
            className="rounded-full bg-white p-1 shadow"
          >
            <Plus className="text-green-400" />
          </Link>
        </div>

        <EventFilter />

        <h2 className="mt-4 text-xl font-semibold">Results for "{q}"</h2>
        <div className="mt-3 space-y-3">
          {events
            .filter((event) =>
              event.title.toLowerCase().includes(q?.toLowerCase()),
            )
            .sort((a, b) => a.startDateTime.localeCompare(b.startDateTime))
            .map((event) => (
              <EventCard event={event} />
            ))}
        </div>

        <p className="mt-2 text-center text-sm font-medium text-muted-foreground">
          End of results.
        </p>
      </Page>
    </>
  );
}

export default SearchEvents;
