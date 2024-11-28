import Page from "@/components/page";
import { Button } from "@/components/ui/button";
import { useData } from "@/hooks/useData";
import ForumCard from "@/pages/chat/_components/forumCard";
import EventCard from "@/pages/events/_components/eventCard";
import GroupCard from "@/pages/groups/_components/groupCard";
import { CalendarDays, MessageCircleMore, Users } from "lucide-react";
import { Link } from "react-router-dom";

function App() {
  const { data } = useData();

  return (
    <>
      <Page
        title={
          <div className="flex items-center justify-center gap-1">
            <img
              className="size-[25px] object-contain"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/University_of_Calgary_coat_of_arms_without_motto_scroll.svg/1200px-University_of_Calgary_coat_of_arms_without_motto_scroll.svg.png"
            />

            <span>uCal Engage</span>
          </div>
        }
      >
        <h2 className="text-xl font-semibold">Recent Forums</h2>
        <div className="mt-3 flex flex-col divide-y overflow-hidden rounded-md border bg-white shadow-sm">
          {data.forums.slice(0, 3).map((forum) => (
            <ForumCard key={forum.id} forum={forum} />
          ))}
        </div>

        <Button size={"sm"} className="mt-3 w-full" asChild>
          <Link to={"/chat"}>
            <MessageCircleMore className="size-[15px]" />
            <span className="leading-none">View all</span>
          </Link>
        </Button>

        <h2 className="mt-6 text-xl font-semibold">Upcoming Events</h2>
        <div className="mt-3 space-y-3">
          {data.events.slice(0, 3).map((event) => (
            <EventCard event={event} />
          ))}
        </div>

        <Button size={"sm"} className="mt-3 w-full" asChild>
          <Link to={"/events"}>
            <CalendarDays className="size-[15px]" />
            <span className="leading-none">View all</span>
          </Link>
        </Button>

        <h2 className="mt-6 text-xl font-semibold">Suggested Clubs</h2>
        <div className="mt-3 flex flex-col divide-y overflow-hidden rounded-md border bg-white shadow-sm">
          {data.groups
            .filter((group) => !group.isCourse)
            .sort((a, b) => a.name.localeCompare(b.name))
            .slice(0, 3)
            .map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
        </div>

        <Button size={"sm"} className="mt-3 w-full" asChild>
          <Link to={"/groups/clubs#test"}>
            <Users className="size-[15px]" />
            <span className="leading-none">View all</span>
          </Link>
        </Button>
      </Page>
    </>
  );
}

export default App;
