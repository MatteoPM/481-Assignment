import Page from "@/components/page";
import SearchBar from "@/components/searchBar";
import { useData } from "@/hooks/useData";
import EventCard from "@/pages/events/_components/eventCard";
import EventFilter from "@/pages/events/_components/eventFilter";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import EventTabs from "./_components/eventTabs";

const now = new Date();
const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const startOfTomorrow = new Date(startOfToday);
startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);
const startOfNextDay = new Date(startOfTomorrow);
startOfNextDay.setDate(startOfNextDay.getDate() + 1);

const startOfThisWeek = new Date(startOfToday);
startOfThisWeek.setDate(startOfThisWeek.getDate() - startOfThisWeek.getDay()); // Start of the week (Sunday)

const startOfNextWeek = new Date(startOfThisWeek);
startOfNextWeek.setDate(startOfNextWeek.getDate() + 7); // Next week starts

const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1); // First day of this month
const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1); // First day of next month

function Events() {
  const { data } = useData();
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const typeParam = searchParams.get("type") || "all";

  const [type, setType] = useState(typeParam);
  const [date, setDate] = useState("any");
  const [categories, setCategories] = useState<string[]>([]);

  const filteredEvents = data.events
    .filter(
      (event) => type === "all" || data.currentUser!.rsvpIds.includes(event.id),
    )
    .filter((event) => {
      const itemDate = new Date(event.startDateTime);

      switch (date) {
        case "any":
          return true; // No filter
        case "today":
          return itemDate >= startOfToday && itemDate < startOfTomorrow;
        case "tomorrow":
          return itemDate >= startOfTomorrow && itemDate < startOfNextDay;
        case "this-week":
          return itemDate >= startOfThisWeek && itemDate < startOfNextWeek;
        case "this-month":
          return itemDate >= startOfThisMonth && itemDate < startOfNextMonth;
        case "next-month": {
          const startOfFollowingMonth = new Date(
            now.getFullYear(),
            now.getMonth() + 2,
            1,
          );
          return (
            itemDate >= startOfNextMonth && itemDate < startOfFollowingMonth
          );
        }
        default:
          return false; // Invalid range
      }
    })
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
      <Page
        title="Events"
        headerContent={<EventTabs value={type} setValue={setType} />}
      >
        <div className="top-0 flex items-center gap-4">
          <SearchBar placeholder="Search groups / event names..." />

          <Link
            to={"/events/create"}
            className="rounded-full bg-white p-1 shadow"
          >
            <Plus className="text-green-400" />
          </Link>
        </div>

        <EventFilter
          date={date}
          setDate={setDate}
          categories={categories}
          setCategories={setCategories}
        />

        <h2 className="mt-6 text-xl font-semibold">
          {q ? `Events Matching "${q}"` : "All Events"}
        </h2>

        {filteredEvents.length > 0 && (
          <>
            <div className="mt-3 space-y-3">
              {filteredEvents.map((event) => (
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
