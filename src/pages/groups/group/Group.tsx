import Page from "@/components/page";
import SubHeader from "@/components/subHeader";
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
import {
  BookOpenText,
  Calendar,
  Expand,
  MessageSquareText,
  Plus,
  Users,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

function Group() {
  const { groupId } = useParams();
  const group = groups.find((group) => group.id === Number(groupId));

  if (!group) {
    throw new Error();
  }

  return (
    <>
      <Page title={group.name} showBackButton bodyClassname="p-0 flex flex-col">
        <img
          className="h-[150px] shrink-0 rounded-b-xl object-cover shadow-lg"
          src={group.bannerUrl}
        />

        <div className="p-4">
          <h2 className="mb-4 border-b pb-4 text-2xl font-bold">
            {group.name}
          </h2>

          <SubHeader Icon={BookOpenText} text="Description" className="mt-4" />

          <p className="mt-1 text-sm text-gray-500">{group.description}</p>

          {!group.isCourse && (
            <div className="mt-6 flex items-center gap-3">
              <Button className="">Join</Button>

              <Button variant={"outline"} asChild>
                <Link to={"/groups/1/stats"}>Stats</Link>
              </Button>

              <Button variant={"outline"} asChild>
                <Link to={"/events/create"}>Create Event</Link>
              </Button>
            </div>
          )}

          <SubHeader Icon={Users} text="Members" className="mt-6" />

          <div className="mt-1 grid grid-cols-2 gap-2 rounded-md py-2 scrollbar">
            <User user={placeholderUser} />
            <User user={placeholderUser2} />
            <User user={placeholderUser3} />
          </div>

          <Button size={"sm"} className="mt-2 w-full">
            <Expand className="size-[15px]" />
            <span className="leading-none">View All</span>
          </Button>

          <SubHeader Icon={MessageSquareText} text="Forums" className="mt-6" />

          <div className="mt-3 flex flex-col divide-y overflow-hidden rounded-md border bg-white shadow-sm">
            <ForumCard />
            <ForumCard />
            <ForumCard />
            <ForumCard />
            <ForumCard />
          </div>

          <div className="mt-2 grid grid-cols-2 gap-3">
            <Button size={"sm"}>
              <Expand className="size-[20px]" />
              <span className="leading-none">View All</span>
            </Button>

            <Button size={"sm"} className="bg-green-400 hover:bg-green-400/90">
              <Plus className="size-[20px]" />
              <span className="leading-none">Create</span>
            </Button>
          </div>

          <SubHeader Icon={Calendar} text="Events" className="mt-6" />

          <div className="mt-3 space-y-3">
            <EventCard event={events[0]} />
            <EventCard event={events[1]} />
            <EventCard event={events[2]} />
          </div>

          <Link to={""} className="py-2 text-sm text-muted-foreground">
            View all
          </Link>
        </div>
      </Page>
    </>
  );
}

export default Group;
