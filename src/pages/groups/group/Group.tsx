import EventCard from "@/components/eventCard";
import ForumCard from "@/components/forumCard";
import Page from "@/components/page";
import { Button } from "@/components/ui/button";
import User from "@/components/user";
import {
  events,
  placeholderUser,
  placeholderUser2,
  placeholderUser3,
} from "@/placeholderData";
import { Link } from "react-router-dom";

function Group() {
  return (
    <>
      <Page title="Group Details" showBackButton>
        <img
          className="h-[120px] rounded-lg object-cover"
          src="https://assets.ppy.sh/user-cover-presets/4/2fd772ad175c5687370e0aab50799a84adef7d0fff3f97dccfa5c94384ebb8af.jpeg"
        />
        <div className="mt-3 flex items-center gap-3">
          <h1 className="text-lg font-semibold">Group Name</h1>

          <Button className="ml-auto">Join</Button>

          <Button variant={"outline"} asChild>
            <Link to={"/groups/1/stats"}>Stats</Link>
          </Button>
        </div>

        <p className="mt-2 text-stone-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, enim
          ipsum est architecto nisi nesciunt aperiam quisquam officia obcaecati
          adipisci et? Voluptatem nulla, recusandae natus corporis quas hic
          animi ut.
        </p>

        <h2 className="mt-6 text-xl font-semibold">
          Members <span className="font-normal text-muted-foreground">(3)</span>
        </h2>
        <div className="mt-1 grid grid-cols-2 gap-2 rounded-md py-2 scrollbar">
          <User user={placeholderUser} />
          <User user={placeholderUser2} />
          <User user={placeholderUser3} />
        </div>

        <Link to={""} className="py-2 text-sm text-muted-foreground">
          View all
        </Link>

        <h2 className="mt-8 text-xl font-semibold">Forums</h2>
        <div className="mt-3 flex flex-col divide-y overflow-hidden rounded-md border bg-white shadow-sm">
          <ForumCard />
          <ForumCard />
          <ForumCard />
          <ForumCard />
          <ForumCard />
        </div>

        <h2 className="mt-8 text-xl font-semibold">Events</h2>
        <div className="mt-3 space-y-3">
          <EventCard event={events[0]} />
          <EventCard event={events[1]} />
          <EventCard event={events[2]} />
        </div>
      </Page>
    </>
  );
}

export default Group;
