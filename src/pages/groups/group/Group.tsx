import Page from "@/components/page";
import { Button } from "@/components/ui/button";
import User from "@/components/user";
import ForumCard from "@/pages/chat/_components/forumCard";
import EventCard from "@/pages/events/_components/eventCard";
import {
  events,
  groups,
  placeholderUser,
  placeholderUser2,
  placeholderUser3,
} from "@/placeholderData";
import { Link, useParams } from "react-router-dom";

function Group() {
  const { groupId } = useParams();
  const group = groups.find((group) => group.id === Number(groupId));

  if (!group) {
    throw new Error();
  }

  return (
    <>
      <Page title={group.name} showBackButton>
        <img
          className="h-[120px] w-full rounded-lg object-cover"
          src={group.bannerUrl}
        />
        <div className="mt-3 flex items-center gap-3">
          <h1 className="text-lg font-semibold">{group.name}</h1>

          <Button className="ml-auto">Join</Button>

          <Button variant={"outline"} asChild>
            <Link to={"/groups/1/stats"}>Stats</Link>
          </Button>
        </div>

        <p className="mt-2 text-stone-600">{group.description}</p>

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
