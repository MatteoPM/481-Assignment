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
import { useData } from "@/hooks/useData";
import ForumCard from "@/pages/chat/_components/forumCard";
import EventCard from "@/pages/events/_components/eventCard";
import {
  BookOpenText,
  Calendar,
  ChartArea,
  Check,
  Contact,
  Crown,
  DoorOpen,
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
  const { data, setData } = useData();
  const group = data.groups.find((group) => group.id === Number(groupId));

  if (!group) {
    throw new Error();
  }
  const forums = data.forums.filter((forum) => forum.groupId === group.id);

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
              {group.leaderId === data.currentUser.id && (
                <Button size={"sm"} disabled className="w-full">
                  <Crown className="size-[20px]" />
                  <span className="leading-none">Leading</span>
                </Button>
              )}
              {data.currentUser.memberGroupIds.includes(group.id) && (
                <Button
                  size={"sm"}
                  className="w-full"
                  onClick={() => {
                    setData((draft) => {
                      draft.currentUser.memberGroupIds =
                        draft.currentUser.memberGroupIds.filter(
                          (id) => id !== group.id,
                        );
                    });
                  }}
                  variant={"destructive"}
                >
                  <DoorOpen className="size-[20px]" />
                  <span className="leading-none">Leave</span>
                </Button>
              )}
              {group.leaderId !== data.currentUser.id &&
                !data.currentUser.memberGroupIds.includes(group.id) && (
                  <Button
                    size={"sm"}
                    disabled={
                      group.leaderId === data.currentUser.id ||
                      data.currentUser.memberGroupIds.includes(group.id)
                    }
                    className="w-full"
                    onClick={() => {
                      setData((draft) => {
                        draft.currentUser.memberGroupIds.push(group.id);
                      });
                    }}
                  >
                    <SquarePlus className="size-[20px]" />
                    <span className="leading-none">Join</span>
                  </Button>
                )}

              {group.leaderId === data.currentUser.id && (
                <Button
                  size={"sm"}
                  variant={"outline"}
                  asChild
                  className="w-full"
                >
                  <Link to={`/groups/${group.id}/stats`}>
                    <ChartArea className="size-[20px]" />
                    <span className="leading-none">Stats</span>
                  </Link>
                </Button>
              )}
            </div>
          )}

          {!group.isCourse && (
            <>
              <SubHeader Icon={Crown} text="Leader" className="mt-6" />

              <div className="mt-3 grid grid-cols-2 gap-2 rounded-md scrollbar">
                <User
                  user={data.users.find((user) => user.id === group.leaderId)!}
                />
              </div>
            </>
          )}

          <SubHeader Icon={Users} text="Members" className="mt-6" />

          <div className="mt-3 grid grid-cols-2 gap-2 rounded-md scrollbar">
            {data.users
              .filter((user) => user.memberGroupIds.includes(group.id))
              .map((user) => (
                <User key={user.id} user={user} />
              ))}
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
                  <User user={data.users[1]} />
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

          {forums.length > 0 && (
            <div className="mt-3 flex flex-col divide-y overflow-hidden rounded-md border bg-white shadow-sm">
              {forums.map((forum) => (
                <ForumCard key={forum.id} forum={forum} />
              ))}
            </div>
          )}

          {forums.length === 0 && (
            <div className="mb-6 mt-3 text-center font-semibold text-muted-foreground">
              No forums exist.
            </div>
          )}

          <div className="mt-3 flex gap-3">
            {forums.length > 0 && (
              <Button size={"sm"} className="w-full">
                <Expand className="size-[20px]" />
                <span className="leading-none">View All</span>
              </Button>
            )}

            <Button
              size={"sm"}
              className="w-full bg-green-400 hover:bg-green-400/90"
              asChild
            >
              <Link to={`/chat/create?groupId=${group.id}`}>
                <Plus className="size-[20px]" />
                <span className="leading-none">Create</span>
              </Link>
            </Button>
          </div>

          {!group.isCourse && (
            <>
              <SubHeader Icon={Calendar} text="Events" className="mt-6" />

              <div className="mt-3 space-y-3">
                {data.events
                  .filter((event) => event.groupId === group.id)
                  .map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
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
                    <Link to={`/events/create?groupId=${group.id}`}>
                      <Plus className="size-[20px]" />
                      <span className="leading-none">Create</span>
                    </Link>
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </Page>
    </>
  );
}

export default Group;
