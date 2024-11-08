import EventCard from "@/components/eventCard";
import ForumCard from "@/components/forumCard";
import GroupCard from "@/components/groupCard";
import Page from "@/components/page";
import { events } from "@/placeholderData";
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
          <GroupCard compact />
          <GroupCard compact />
          <GroupCard compact />
        </div>
      </Page>
    </>
  );
}

export default App;
