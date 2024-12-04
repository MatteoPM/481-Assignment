import Page from "@/components/page";
import { Button } from "@/components/ui/button";
import { useData } from "@/hooks/useData";
import ForumCard from "@/pages/chat/_components/forumCard";
import EventCard from "@/pages/events/_components/eventCard";
import { CalendarDays, MessageCircleMore } from "lucide-react";
import { Link } from "react-router-dom";
function App() {
  const { data } = useData();

  const unreadNotifications = data.currentUser!.notifications.filter(
    (notification) => !notification.read,
  );

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
        <h2 className="mb-4 text-balance text-center text-sm font-semibold text-muted-foreground">
          Welcome back, {data.currentUser?.username.split(" ")[0]}. You have{" "}
          <Link to={"/notifications"} className="text-primary">
            {unreadNotifications.length > 0 ? unreadNotifications.length : "no"}{" "}
            unread notifications.
          </Link>
        </h2>

        <h2 className="text-xl font-semibold">Recent Forums</h2>
        <div className="mt-3 flex flex-col divide-y overflow-hidden rounded-md border bg-white shadow-sm">
          {data.forums.slice(0, 3).map((forum) => (
            <ForumCard key={forum.id} forum={forum} />
          ))}
        </div>

        <Button size={"sm"} className="mt-3 w-full" asChild>
          <Link to={"/chat"}>
            <MessageCircleMore className="size-[15px]" />
            <span className="leading-none">Chat</span>
          </Link>
        </Button>

        <h2 className="mt-6 text-xl font-semibold">Upcoming Events</h2>
        <div className="mt-3 space-y-3">
          {data.events.slice(0, 3).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <Button size={"sm"} className="mt-3 w-full" asChild>
          <Link to={"/events"}>
            <CalendarDays className="size-[15px]" />
            <span className="leading-none">Events</span>
          </Link>
        </Button>
      </Page>
    </>
  );
}

export default App;
