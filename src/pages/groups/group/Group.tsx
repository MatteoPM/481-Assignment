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
import { useToast } from "@/hooks/use-toast";
import { useData } from "@/hooks/useData";
import ForumCard from "@/pages/chat/_components/forumCard";
import EventCard from "@/pages/events/_components/eventCard";
import { UserType } from "@/placeholderData";
import {
  BookOpenText,
  Calendar,
  ChartArea,
  Check,
  CheckCircle,
  Contact,
  Crown,
  DoorOpen,
  Loader,
  MessageSquareText,
  Plus,
  SquarePlus,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Group() {
  const { groupId } = useParams();
  const { data, setData } = useData();
  const navigate = useNavigate();
  const group = data.groups.find((group) => group.id === Number(groupId));
  const [joinRequestConfirmOpen, setJoinRequestConfirmOpen] = useState(false);
  const [joinConfirmOpen, setJoinConfirmOpen] = useState(false);
  const [leaveConfirmOpen, setLeaveConfirmOpen] = useState(false);
  const [acceptJoinOpen, setAcceptJoinOpen] = useState(false);
  const [rejectJoinOpen, setRejectJoinOpen] = useState(false);
  const [joiningUser, setJoiningUser] = useState<UserType | null>(null);
  const { toast } = useToast();

  if (!group) {
    throw new Error();
  }

  if (!data.currentUser) {
    throw new Error("No user");
  }

  const members = data.users.filter((user) =>
    user.leaderGroupIds.concat(user.memberGroupIds).includes(group.id),
  );
  const nonLeaders = data.users.filter((user) =>
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
                <Button size={"sm"} disabled>
                  <Crown className="size-[20px]" />
                  <span className="leading-none">Leading</span>
                </Button>
              )}
              {data.currentUser.memberGroupIds.includes(group.id) && (
                <Button
                  size={"sm"}
                  onClick={() => {
                    setLeaveConfirmOpen(true);
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
                  <Button size={"sm"} onClick={() => setJoinConfirmOpen(true)}>
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
                    disabled
                    onClick={() => setJoinRequestConfirmOpen(true)}
                  >
                    <Loader className="size-[20px]" />
                    <span className="leading-none">
                      Join Request Pending Approval
                    </span>
                  </Button>
                )}
              {group.leaderId === data.currentUser.id ||
                (data.currentUser!.isSuMember && (
                  <Button size={"sm"} variant={"outline"} asChild>
                    <Link to={`/groups/${group.id}/stats`}>
                      <ChartArea className="size-[20px]" />
                      <span className="leading-none">Stats</span>
                    </Link>
                  </Button>
                ))}
            </div>
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
              <SubHeader
                Icon={Users}
                text={
                  <span>
                    Members{" "}
                    <span className="font-normal text-muted-foreground">
                      ({members.length})
                    </span>
                  </span>
                }
                className="mt-6"
              />

              {!group.isCourse && (
                <>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Leader
                  </div>
                  <div className="mt-1 grid grid-cols-2 items-center gap-2 rounded-md scrollbar">
                    <User
                      user={
                        data.users.find((user) => user.id === group.leaderId)!
                      }
                    />
                  </div>
                </>
              )}

              {nonLeaders.length > 0 && (
                <>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Others
                  </div>
                  <div className="mt-1 grid grid-cols-2 gap-2 rounded-md scrollbar">
                    {data.users
                      .filter((user) => user.memberGroupIds.includes(group.id))
                      .map((user) => (
                        <User key={user.id} user={user} />
                      ))}
                  </div>
                </>
              )}

              <div className="mt-3 flex gap-3">
                <button
                  className="text-sm font-semibold text-primary disabled:opacity-50"
                  onClick={() => navigate(`/groups/${groupId}/members`)}
                  disabled={members.length === 0}
                >
                  View all
                </button>

                {group.leaderId === data.currentUser.id && group.isPrivate && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size={"sm"}
                        className="bg-orange-400 hover:bg-orange-400/90"
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
                                setJoiningUser(user);
                                setRejectJoinOpen(true);
                              }}
                            >
                              <X />
                            </Button>
                            <Button
                              size={"icon"}
                              onClick={() => {
                                setJoiningUser(user);
                                setAcceptJoinOpen(true);
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
                text={
                  <span>
                    Forums{" "}
                    <span className="font-normal text-muted-foreground">
                      ({forums.length})
                    </span>
                  </span>
                }
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
                <button
                  className="text-sm font-semibold text-primary disabled:opacity-50"
                  onClick={() => navigate(`/groups/${groupId}/forums`)}
                  disabled={forums.length === 0}
                >
                  View all
                </button>
                <Link
                  to={`/chat/create?groupId=${group.id}`}
                  className="flex items-center gap-1 rounded-full bg-white p-1 pr-2 text-sm text-green-400 shadow disabled:opacity-50"
                >
                  <Plus className="size-[20px]" />
                  <span className="">Create</span>
                </Link>
              </div>

              {!group.isCourse && (
                <>
                  <SubHeader
                    Icon={Calendar}
                    text={
                      <span>
                        Events{" "}
                        <span className="font-normal text-muted-foreground">
                          ({events.length})
                        </span>
                      </span>
                    }
                    className="mt-6"
                  />

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
                    <button
                      className="text-sm font-semibold text-primary disabled:opacity-50"
                      disabled={events.length === 0}
                      onClick={() => navigate(`/groups/${groupId}/events`)}
                    >
                      View all
                    </button>

                    {group.leaderId === data.currentUser.id && (
                      <Link
                        to={`/events/create?groupId=${group.id}`}
                        className="flex items-center gap-1 rounded-full bg-white p-1 pr-2 text-sm text-green-400 shadow disabled:opacity-50"
                      >
                        <Plus className="size-[20px]" />
                        <span className="">Create</span>
                      </Link>
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
                  toast({
                    title: (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="text-green-400" />
                        <span>Request sent successfully.</span>
                      </div>
                    ),
                    description:
                      "You will be notified when your request has been approved or denied.",
                  });
                  // setJoinRequestSentOpen(true);
                }}
              >
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog open={joinConfirmOpen} onOpenChange={setJoinConfirmOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Join {group.name}?</DialogTitle>
              <DialogDescription>You may leave at any time.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={() => {
                  setJoinConfirmOpen(false);
                }}
                variant={"outline"}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  joinClub();
                  setJoinConfirmOpen(false);
                  toast({
                    title: (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="text-green-400" />
                        <span>Joined successfully</span>
                      </div>
                    ),
                    description: `You are now a member of ${group.name}!`,
                  });
                  // setJoinRequestSentOpen(true);
                }}
              >
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog open={leaveConfirmOpen} onOpenChange={setLeaveConfirmOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Leave {group.name}?</DialogTitle>
              <DialogDescription>
                You may join again at any time.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={() => {
                  setLeaveConfirmOpen(false);
                }}
                variant={"outline"}
              >
                Cancel
              </Button>
              <Button
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

                  setLeaveConfirmOpen(false);
                  toast({
                    title: (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="text-green-400" />
                        <span>Left successfully</span>
                      </div>
                    ),
                    description: `You are no longer a member of ${group.name}.`,
                  });
                  // setJoinRequestSentOpen(true);
                }}
              >
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog open={acceptJoinOpen} onOpenChange={setAcceptJoinOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Accept {joiningUser!.username.split(" ")[0]}'s join request?
              </DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={() => {
                  setAcceptJoinOpen(false);
                }}
                variant={"outline"}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setData((draft) => {
                    draft.users
                      .find((user) => user.id === joiningUser!.id)!
                      .memberGroupIds.push(Number(groupId));

                    const group = draft.groups.find(
                      (group) => group.id === Number(groupId),
                    )!;

                    group.applicationIds = group.applicationIds.filter(
                      (id) => id !== joiningUser!.id,
                    );
                  });

                  setAcceptJoinOpen(false);
                  toast({
                    title: (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="text-green-400" />
                        <span>User accepted successfully</span>
                      </div>
                    ),
                    description: `${joiningUser!.username} is now a member of ${group.name}.`,
                  });
                }}
              >
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog open={rejectJoinOpen} onOpenChange={setRejectJoinOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Reject {joiningUser!.username.split(" ")[0]}'s join request?
              </DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={() => {
                  setRejectJoinOpen(false);
                }}
                variant={"outline"}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setData((draft) => {
                    const group = draft.groups.find(
                      (group) => group.id === Number(groupId),
                    )!;

                    group.applicationIds = group.applicationIds.filter(
                      (id) => id !== joiningUser!.id,
                    );
                  });

                  setRejectJoinOpen(false);
                  toast({
                    title: (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="text-green-400" />
                        <span>User rejected successfully</span>
                      </div>
                    ),
                    // description: `${joiningUser!.username} is now a member of ${group.name}.`,
                  });
                }}
              >
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Page>
    </>
  );
}

export default Group;
