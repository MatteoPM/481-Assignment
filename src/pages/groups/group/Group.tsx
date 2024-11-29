import Page from "@/components/page";
import SubHeader from "@/components/subHeader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
  Loader,
  MessageSquareText,
  Plus,
  SquarePlus,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

function Group() {
  const { groupId } = useParams();
  const { data, setData } = useData();
  const group = data.groups.find((group) => group.id === Number(groupId));
  const [joinRequestConfirmOpen, setJoinRequestConfirmOpen] = useState(false);
  const [joinRequestSentOpen, setJoinRequestSentOpen] = useState(false);

  if (!group) {
    throw new Error();
  }

  if (!data.currentUser) {
    throw new Error("No user");
  }

  const members = data.users.filter((user) =>
    user.memberGroupIds.includes(group.id),
  );

  const forums = data.forums.filter((forum) => forum.groupId === group.id);
  const events = data.events.filter((event) => event.groupId === group.id);

  const joinClub = () => {
    if (group.isPrivate) {
      setData((draft) => {
        draft.groups
          .find((group) => group.id === Number(groupId))
          ?.applicationIds.push(data.currentUser!.id);
      });
    } else {
      setData((draft) => {
        const user = draft.users.find(
          (user) => user.id === draft.currentUser!.id,
        )!;
        draft.currentUser = user;

        user.memberGroupIds.push(group.id);
      });
    }
  };

  return (
    <>
      <Page title={group.name} showBackButton bodyClassname="p-0 flex flex-col">
        <img
          className="h-[150px] shrink-0 rounded-b-xl object-cover shadow-lg"
          src={group.bannerUrl}
        />

        <div className="p-4">
          <div className="mb-4 border-b pb-4">
            <h2 className="text-2xl font-bold">{group.name}</h2>
            {group.isPrivate && (
              <span className="rounded-full bg-purple-400/10 px-2 py-1 text-xs text-purple-400">
                Private
              </span>
            )}
          </div>

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
                      const user = draft.users.find(
                        (user) => user.id === draft.currentUser!.id,
                      )!;
                      draft.currentUser = user;

                      user.memberGroupIds = user.memberGroupIds.filter(
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
              {!group.isPrivate &&
                group.leaderId !== data.currentUser.id &&
                !data.currentUser.memberGroupIds.includes(group.id) && (
                  <Button size={"sm"} className="w-full" onClick={joinClub}>
                    <SquarePlus className="size-[20px]" />
                    <span className="leading-none">Join</span>
                  </Button>
                )}
              {group.isPrivate &&
                group.leaderId !== data.currentUser.id &&
                !data.currentUser.memberGroupIds.includes(group.id) &&
                !group.applicationIds.includes(data.currentUser!.id) && (
                  <Button
                    size={"sm"}
                    className="w-full"
                    onClick={() => setJoinRequestConfirmOpen(true)}
                  >
                    <SquarePlus className="size-[20px]" />
                    <span className="leading-none">Request to Join</span>
                  </Button>
                )}
              {group.isPrivate &&
                group.leaderId !== data.currentUser.id &&
                !data.currentUser.memberGroupIds.includes(group.id) &&
                group.applicationIds.includes(data.currentUser!.id) && (
                  <Button
                    size={"sm"}
                    className="w-full"
                    disabled
                    onClick={() => setJoinRequestConfirmOpen(true)}
                  >
                    <Loader className="size-[20px]" />
                    <span className="leading-none">
                      Join Request Pending Approval
                    </span>
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

          {group.isPrivate &&
          !data
            .currentUser!.leaderGroupIds.concat(
              data.currentUser!.memberGroupIds,
            )
            .includes(group.id) ? (
            <div className="mt-6 text-balance text-center text-muted-foreground">
              You must be a member to view this private club's activity.
            </div>
          ) : (
            <>
              <SubHeader Icon={Users} text="Members" className="mt-6" />

              {members.length === 0 && (
                <div className="mb-6 mt-3 text-center font-semibold text-muted-foreground">
                  No members.
                </div>
              )}
              {members.length > 0 && (
                <div className="mt-3 grid grid-cols-2 gap-2 rounded-md scrollbar">
                  {data.users
                    .filter((user) => user.memberGroupIds.includes(group.id))
                    .map((user) => (
                      <User key={user.id} user={user} />
                    ))}
                </div>
              )}

              <div className="mt-3 flex gap-3">
                <Button
                  size={"sm"}
                  className="w-full"
                  disabled={members.length === 0}
                >
                  <Expand className="size-[15px]" />
                  <span className="leading-none">View All</span>
                </Button>

                {group.leaderId === data.currentUser.id && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size={"sm"}
                        className="w-full bg-orange-400 hover:bg-orange-400/90"
                        disabled={group.applicationIds.length === 0}
                      >
                        <Contact className="size-[15px]" />
                        <span className="leading-none">
                          Applications ({group.applicationIds.length})
                        </span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[350px] rounded-lg">
                      <DialogHeader>
                        <DialogTitle>Membership Requests</DialogTitle>
                      </DialogHeader>

                      {group.applicationIds.map((id) => {
                        const user = data.users.find((user) => user.id === id)!;

                        return (
                          <div className="flex items-center gap-2">
                            <User user={user} />
                            <Button
                              size={"icon"}
                              variant={"destructive"}
                              className="ml-auto"
                              onClick={() => {
                                setData((draft) => {
                                  const group = draft.groups.find(
                                    (group) => group.id === Number(groupId),
                                  )!;

                                  group.applicationIds =
                                    group.applicationIds.filter(
                                      (id) => id !== user.id,
                                    );
                                });
                              }}
                            >
                              <X />
                            </Button>
                            <Button
                              size={"icon"}
                              onClick={() => {
                                setData((draft) => {
                                  draft.users
                                    .find((user) => user.id === user.id)!
                                    .memberGroupIds.push(Number(groupId));

                                  const group = draft.groups.find(
                                    (group) => group.id === Number(groupId),
                                  )!;

                                  group.applicationIds =
                                    group.applicationIds.filter(
                                      (id) => id !== user.id,
                                    );
                                });
                              }}
                            >
                              <Check />
                            </Button>
                          </div>
                        );
                      })}
                    </DialogContent>
                  </Dialog>
                )}
              </div>

              <SubHeader
                Icon={MessageSquareText}
                text="Forums"
                className="mt-6"
              />

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
                <Button
                  size={"sm"}
                  className="w-full"
                  disabled={forums.length === 0}
                >
                  <Expand className="size-[20px]" />
                  <span className="leading-none">View All</span>
                </Button>

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

                  {events.length > 0 && (
                    <div className="mt-3 space-y-3">
                      {events.map((event) => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                  )}
                  {events.length === 0 && (
                    <div className="mb-6 mt-3 text-center font-semibold text-muted-foreground">
                      No events exist.
                    </div>
                  )}

                  <div className="mt-3 flex gap-3">
                    <Button
                      size={"sm"}
                      className="w-full"
                      disabled={events.length === 0}
                    >
                      <Expand className="size-[20px]" />
                      <span className="leading-none">View All</span>
                    </Button>

                    {group.leaderId === data.currentUser.id && (
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
            </>
          )}
        </div>

        <Dialog
          open={joinRequestConfirmOpen}
          onOpenChange={setJoinRequestConfirmOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request to join {group.name}?</DialogTitle>
              <DialogDescription>
                You will become a member if your request is approved by the club
                leader.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={() => {
                  setJoinRequestConfirmOpen(false);
                }}
                variant={"outline"}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  joinClub();
                  setJoinRequestConfirmOpen(false);
                  setJoinRequestSentOpen(true);
                }}
              >
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog
          open={joinRequestSentOpen}
          onOpenChange={setJoinRequestSentOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request sent successfully.</DialogTitle>
              <DialogDescription>
                You will be notified when your request has been approved or
                denied.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </Page>
    </>
  );
}

export default Group;
