import Page from "@/components/page";
import SubHeader from "@/components/subHeader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import User from "@/components/user";
import ForumCard from "@/pages/chat/_components/forumCard";
import EventCard from "@/pages/events/_components/eventCard";
import {
  events,
  forums,
  groups,
  placeholderUser,
  placeholderUser2,
  placeholderUser3,
} from "@/placeholderData";
import {
  BookOpenText,
  Calendar,
  ChartArea,
  Check,
  Contact,
  Expand,
  MessageSquareText,
  Plus,
  SquarePlus,
  Users,
  X,
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
            <div className="mt-6 flex gap-3">
              <Button
                size={"sm"}
                disabled={group.leaderId === 0}
                className="w-full"
              >
                <SquarePlus className="size-[20px]" />
                <span className="leading-none">Join</span>
              </Button>

              {group.leaderId === 0 && (
                <Button
                  size={"sm"}
                  variant={"outline"}
                  asChild
                  className="w-full"
                >
                  <Link to={"/chat/create"}>
                    <ChartArea className="size-[20px]" />
                    <span className="leading-none">Stats</span>
                  </Link>
                </Button>
              )}
            </div>
          )}

          <SubHeader Icon={Users} text="Members" className="mt-6" />

          <div className="mt-3 grid grid-cols-2 gap-2 rounded-md scrollbar">
            <User user={placeholderUser} />
            <User user={placeholderUser2} />
            <User user={placeholderUser3} />
          </div>

          <Button size={"sm"} className="mt-3 w-full">
            <Expand className="size-[15px]" />
            <span className="leading-none">View All</span>
          </Button>

          {group.leaderId === 0 && (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size={"sm"}
                  className="mt-2 w-full bg-orange-400 hover:bg-orange-400/90"
                >
                  <Contact className="size-[15px]" />
                  <span className="leading-none">
                    Membership Applications (1)
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[350px] rounded-lg">
                <DialogHeader>
                  <DialogTitle>Membership Requests</DialogTitle>
                </DialogHeader>

                <div className="flex items-center gap-2">
                  <User user={placeholderUser} />
                  <Button
                    size={"icon"}
                    variant={"destructive"}
                    className="ml-auto"
                  >
                    <X />
                  </Button>
                  <Button size={"icon"}>
                    <Check />
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}

          <SubHeader Icon={MessageSquareText} text="Forums" className="mt-6" />

          <div className="mt-3 flex flex-col divide-y overflow-hidden rounded-md border bg-white shadow-sm">
            {forums.map((forum) => (
              <ForumCard forum={forum} />
            ))}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <Button size={"sm"}>
              <Expand className="size-[20px]" />
              <span className="leading-none">View All</span>
            </Button>

            <Button
              size={"sm"}
              className="bg-green-400 hover:bg-green-400/90"
              asChild
            >
              <Link to={"/chat/create"}>
                <Plus className="size-[20px]" />
                <span className="leading-none">Create</span>
              </Link>
            </Button>
          </div>

          <SubHeader Icon={Calendar} text="Events" className="mt-6" />

          <div className="mt-3 space-y-3">
            <EventCard event={events[0]} />
            <EventCard event={events[1]} />
            <EventCard event={events[2]} />
          </div>

          <div className="mt-3 flex gap-3">
            <Button size={"sm"} className="w-full">
              <Expand className="size-[20px]" />
              <span className="leading-none">View All</span>
            </Button>

            {group.leaderId === 0 && (
              <Button
                size={"sm"}
                className="w-full bg-green-400 hover:bg-green-400/90"
                asChild
              >
                <Link to={"/events/create"}>
                  <Plus className="size-[20px]" />
                  <span className="leading-none">Create</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </Page>
    </>
  );
}

export default Group;
