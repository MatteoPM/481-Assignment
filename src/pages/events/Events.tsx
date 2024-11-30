import Page from "@/components/page";
import SearchBar from "@/components/searchBar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useData } from "@/hooks/useData";
import EventCard from "@/pages/events/_components/eventCard";
import EventFilter from "@/pages/events/_components/eventFilter";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import EventTabs from "./_components/eventTabs";
import { eventCategories } from "./create/CreateEvent";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const typeParam = searchParams.get("type") || "all";
  const navigate = useNavigate();
  const [showCreationDialog, setShowCreationDialog] = useState(false);

  const [type, setType] = useState(typeParam);
  const [date, setDate] = useState("any");
  const [categories, setCategories] = useState<string[]>(eventCategories);

  const resetFilters = () => {
    setDate("any");
    setCategories(eventCategories);
  };

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
      return event.categories.every((category) =>
        categories.includes(category),
      );
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

          <button
            className="rounded-full bg-white p-1 shadow"
            onClick={() => {
              if (data.currentUser!.leaderGroupIds.length > 0) {
                navigate("/events/create");
              } else {
                setShowCreationDialog(true);
              }
            }}
          >
            <Plus className="text-green-400" />
          </button>
        </div>

        <EventFilter
          date={date}
          setDate={setDate}
          categories={categories}
          setCategories={setCategories}
          resetFilters={resetFilters}
        />

        {type === "all" && (
          <h2 className="mt-6 text-xl font-semibold">
            {q ? `Events Matching "${q}"` : "All Events"}
          </h2>
        )}

        {type === "rsvps" && (
          <h2 className="mt-6 text-xl font-semibold">
            {q ? `RSVPs Matching "${q}"` : "Your RSVPs"}
          </h2>
        )}

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
        {type === "all" && filteredEvents.length === 0 && (
          <div className="mt-8 text-balance text-center font-semibold text-muted-foreground">
            No events found. Adjust or{" "}
            <button
              className="text-primary"
              onClick={() => {
                searchParams.delete("q");
                setSearchParams(searchParams);

                resetFilters();
              }}
            >
              reset
            </button>{" "}
            your search query and filters.
          </div>
        )}
        {type === "rsvps" && filteredEvents.length === 0 && (
          <div className="mt-8 text-balance text-center font-semibold text-muted-foreground">
            {data.currentUser?.rsvpIds.length === 0 ? (
              "You have no RSVPs. Events that you RSVP for will appear here."
            ) : (
              <span>
                No RSVPs found. Adjust or{" "}
                <button
                  className="text-primary"
                  onClick={() => {
                    searchParams.delete("q");
                    setSearchParams(searchParams);

                    resetFilters();
                  }}
                >
                  reset
                </button>{" "}
                your search query and filters.
              </span>
            )}
          </div>
        )}

        <Dialog open={showCreationDialog} onOpenChange={setShowCreationDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>You Must Lead a Club to Create Events</DialogTitle>
              <DialogDescription>
                You can only create events for clubs that you are leading.
                Currently, you are not leading any clubs.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={() => {
                  setShowCreationDialog(false);
                }}
                variant={"outline"}
              >
                Okay
              </Button>
              <Button
                onClick={() => {
                  navigate("/groups/create");
                }}
              >
                Create Club
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Page>
    </>
  );
}

export default Events;
