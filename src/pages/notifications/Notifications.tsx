import Page from "@/components/page";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import UserDrawerContent from "@/components/userDrawerContent";
import { useData } from "@/hooks/useData";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  MessageCircleMore,
  Trash2,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const types = [
  {
    label: "All",
  },
  {
    label: "Chat",
    Icon: <MessageCircleMore className="size-[20px]" />,
  },
  {
    label: "Group",
    Icon: <Users className="size-[20px]" />,
  },
  {
    label: "Event",
    Icon: <CalendarDays className="size-[20px]" />,
  },
];

function Notifications() {
  const [type, setType] = useState("all");
  const { data, setData } = useData();
  const [clearConfirmOpen, setClearConfirmOpen] = useState(false);

  const filteredNotifications = data.currentUser!.notifications.filter(
    (notification) => {
      if (type === "all") {
        return true;
      } else if (type === "chat") {
        return notification.category === "chat";
      } else if (type === "group") {
        return notification.category === "group";
      } else if (type === "event") {
        return notification.category === "event";
      }
    },
  );

  useEffect(() => {
    setData((draft) => {
      const currentUser = draft.users.find(
        (user) => user.id === draft.currentUser!.id,
      )!;
      draft.currentUser = currentUser;

      currentUser.notifications.forEach((notification) => {
        notification.read = true;
      });
    });
  }, [setData]);

  return (
    <>
      <Page
        title="Notifications"
        showBackButton
        hideFooter
        bodyClassname="h-full flex flex-col p-0"
      >
        <div className="m-4 flex flex-wrap gap-2">
          {types.map((type2) => (
            <button
              key={type2.label}
              className={cn(
                `flex items-center gap-1 rounded-full bg-gray-200/50 px-3 py-1 text-gray-800`,
                type === type2.label.toLowerCase() &&
                  "bg-primary/10 text-primary",
              )}
              onClick={() => setType(type2.label.toLowerCase())}
            >
              {type2.Icon}
              {type2.label}
            </button>
          ))}
        </div>

        <Button
          size={"sm"}
          variant={"destructive"}
          className="mb-4 ml-auto mr-2 inline-block"
          onClick={() => setClearConfirmOpen(true)}
          disabled={data.currentUser!.notifications.length === 0}
        >
          Clear All
        </Button>

        <div className="grow overflow-auto p-4 px-0 pt-0">
          {filteredNotifications.length === 0 && (
            <div className="mb-6 mt-3 text-center font-semibold text-muted-foreground">
              No {type !== "all" && type} notifications.
            </div>
          )}
          {filteredNotifications.length > 0 && (
            <div className="isolate flex flex-col divide-y border bg-white">
              <AnimatePresence>
                {filteredNotifications.map((notification) => {
                  return (
                    <motion.div
                      key={`notif-${notification.id}`}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        opacity: {
                          transition: {
                            duration: 0,
                          },
                        },
                      }}
                      className="relative"
                    >
                      <div className="absolute inset-y-0 right-0 -z-10 flex items-center justify-end bg-destructive px-[16px]">
                        <Trash2 className="size-[30px] text-destructive-foreground" />
                      </div>
                      <motion.div
                        drag="x"
                        dragConstraints={{ left: -62, right: 0 }}
                        dragElastic={{ left: 0, right: 0 }}
                        dragSnapToOrigin
                        onDragEnd={(_, info) => {
                          if (info.offset.x <= -62) {
                            setData((draft) => {
                              const currentUser = draft.users.find(
                                (user) => user.id === draft.currentUser!.id,
                              )!;
                              draft.currentUser = currentUser;

                              currentUser.notifications =
                                currentUser.notifications.filter(
                                  (notif) => notif.id !== notification.id,
                                );
                            });
                          }
                        }}
                        className="flex items-start space-x-4 overflow-hidden bg-card p-4"
                      >
                        <div className="rounded-full bg-primary/10 p-2">
                          {notification.category === "chat" && (
                            <MessageCircleMore />
                          )}
                          {notification.category === "group" && <Users />}
                          {notification.category === "event" && (
                            <CalendarDays />
                          )}
                        </div>
                        <div className="flex-grow">
                          {notification.type === "message" && (
                            <>
                              <h2 className="font-semibold">
                                <Drawer>
                                  <DrawerTrigger
                                    className="shrink-0 pt-2"
                                    asChild
                                  >
                                    <span className="cursor-pointer text-primary">
                                      {
                                        data.users.find(
                                          (user) =>
                                            user.id ===
                                            notification.data.senderId,
                                        )!.username
                                      }
                                    </span>
                                  </DrawerTrigger>
                                  <DrawerContent className="">
                                    <UserDrawerContent
                                      user={
                                        data.users.find(
                                          (user) =>
                                            user.id ===
                                            notification.data.senderId,
                                        )!
                                      }
                                    />
                                  </DrawerContent>
                                </Drawer>{" "}
                                sent a message:
                              </h2>
                              <p className="text-sm text-muted-foreground">
                                {notification.data.message}
                              </p>

                              <div className="mt-2 flex items-center justify-between">
                                <span className="shrink-0 text-xs text-muted-foreground">
                                  {formatDistanceToNow(notification.time, {
                                    addSuffix: true,
                                  })}
                                </span>

                                <Button
                                  size={"sm"}
                                  className="flex w-full items-center justify-end p-0"
                                  variant={"link"}
                                  asChild
                                >
                                  <Link
                                    to={`/chat/dms/${notification.data.chatId}`}
                                  >
                                    <ArrowRight />
                                  </Link>
                                </Button>
                              </div>
                            </>
                          )}
                          {notification.type === "joinRequest" && (
                            <>
                              <h2 className="font-semibold">
                                <Drawer>
                                  <DrawerTrigger
                                    className="shrink-0 pt-2"
                                    asChild
                                  >
                                    <span className="cursor-pointer text-primary">
                                      {
                                        data.users.find(
                                          (user) =>
                                            user.id ===
                                            notification.data.requesterId,
                                        )!.username
                                      }
                                    </span>
                                  </DrawerTrigger>
                                  <DrawerContent className="">
                                    <UserDrawerContent
                                      user={
                                        data.users.find(
                                          (user) =>
                                            user.id ===
                                            notification.data.requesterId,
                                        )!
                                      }
                                    />
                                  </DrawerContent>
                                </Drawer>{" "}
                                has joined{" "}
                                <Link
                                  to={`/groups/${notification.data.clubId}`}
                                  className="text-primary"
                                >
                                  {
                                    data.groups.find(
                                      (group) =>
                                        group.id === notification.data.clubId,
                                    )!.name
                                  }
                                </Link>
                              </h2>

                              <div className="mt-2 flex items-center justify-between">
                                <span className="shrink-0 text-xs text-muted-foreground">
                                  {formatDistanceToNow(notification.time, {
                                    addSuffix: true,
                                  })}
                                </span>

                                <Button
                                  size={"sm"}
                                  className="flex w-full items-center justify-end p-0"
                                  variant={"link"}
                                  asChild
                                >
                                  <Link
                                    to={`/groups/${notification.data.clubId}`}
                                  >
                                    <ArrowRight />
                                  </Link>
                                </Button>
                              </div>
                            </>
                          )}
                          {notification.type === "eventReminder" && (
                            <>
                              <h2 className="font-semibold">
                                <Link
                                  to={`/events/${notification.data.eventId}`}
                                  className="text-primary"
                                >
                                  {
                                    data.events.find(
                                      (event) =>
                                        event.id === notification.data.eventId,
                                    )!.title
                                  }
                                </Link>{" "}
                                begins in 1 day
                              </h2>

                              <div className="mt-2 flex items-center justify-between">
                                <span className="shrink-0 text-xs text-muted-foreground">
                                  {formatDistanceToNow(notification.time, {
                                    addSuffix: true,
                                  })}
                                </span>

                                <Button
                                  size={"sm"}
                                  className="flex w-full items-center justify-end p-0"
                                  variant={"link"}
                                >
                                  <Link
                                    to={`/events/${notification.data.eventId}`}
                                  >
                                    <ArrowRight />
                                  </Link>
                                </Button>
                              </div>
                            </>
                          )}
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </Page>
      <Dialog open={clearConfirmOpen} onOpenChange={setClearConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Clear all notifications?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => {
                setClearConfirmOpen(false);
              }}
              variant={"outline"}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setData((draft) => {
                  const currentUser = draft.users.find(
                    (user) => user.id === draft.currentUser!.id,
                  )!;
                  draft.currentUser = currentUser;

                  draft.currentUser.notifications = [];
                });

                setClearConfirmOpen(false);
              }}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Notifications;
