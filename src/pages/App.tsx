import Page from "@/components/page";
import ForumCard from "@/pages/chat/_components/forumCard";
import EventCard from "@/pages/events/_components/eventCard";
import GroupCard from "@/pages/groups/_components/groupCard";
import { events, groups } from "@/placeholderData";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <Page title="Dashboard">
        <h2 className="text-xl font-semibold">Recent Posts</h2>
        <div className="mt-3 flex flex-col divide-y overflow-hidden rounded-md border bg-white shadow-sm">
          <ForumCard />
          <ForumCard />
          <ForumCard />
          <ForumCard />
        </div>

        <Link to={""} className="py-2 text-sm text-muted-foreground">
          View all
        </Link>

        <h2 className="mt-8 text-xl font-semibold">Upcoming Events</h2>
        <div className="mt-6 space-y-3">
          <EventCard event={events[0]} />
          <EventCard event={events[1]} />
          <EventCard event={events[2]} />
        </div>

        <h2 className="mt-8 text-xl font-semibold">Suggested Groups</h2>
        <div className="mt-3 flex flex-col divide-y overflow-hidden rounded-md border bg-white shadow-sm">
          {groups
            .filter((group) => !group.isCourse)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((group) => (
              <GroupCard group={group} />
            ))}
        </div>
      </Page>
    </>
  );
}

export default App;
