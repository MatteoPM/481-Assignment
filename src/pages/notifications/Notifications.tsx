import Page from "@/components/page";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import UserDrawerContent from "@/components/userDrawerContent";
import { useData } from "@/hooks/useData";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  CalendarDays,
  MessageCircleMore,
  Users,
} from "lucide-react";
import { useState } from "react";
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
  const { data } = useData();

  return (
    <>
      <Page title="Notifications" showBackButton hideFooter>
        <div className="flex flex-wrap gap-3">
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
        <div className="mt-3 flex flex-col divide-y overflow-hidden rounded-md border bg-white shadow-sm">
          {data.currentUser!.notifications.map((notification) => {
            return (
              <>
                <div className="flex items-start space-x-4 rounded-lg bg-card p-4 shadow-sm">
                  <div className="rounded-full bg-primary/10 p-2">
                    {notification.category === "chat" && <MessageCircleMore />}
                    {notification.category === "group" && <Users />}
                    {notification.category === "event" && <CalendarDays />}
                  </div>
                  <div className="flex-grow">
                    {notification.type === "message" && (
                      <>
                        <h2 className="font-semibold">
                          <Drawer>
                            <DrawerTrigger className="shrink-0 pt-2" asChild>
                              <span className="cursor-pointer text-primary">
                                {
                                  data.users.find(
                                    (user) =>
                                      user.id === notification.data.senderId,
                                  )!.username
                                }
                              </span>
                            </DrawerTrigger>
                            <DrawerContent className="">
                              <UserDrawerContent
                                user={
                                  data.users.find(
                                    (user) =>
                                      user.id === notification.data.senderId,
                                  )!
                                }
                              />
                            </DrawerContent>
                          </Drawer>{" "}
                          sent a message
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          {notification.data.message}
                        </p>

                        <div className="mt-2 flex items-center justify-between">
                          <span className="shrink-0 text-xs text-muted-foreground">
                            2m ago
                          </span>

                          <Button
                            size={"sm"}
                            className="flex w-full items-center justify-end"
                            variant={"link"}
                          >
                            Chat <ArrowRight />
                          </Button>
                        </div>
                      </>
                    )}
                    {notification.type === "joinRequest" && (
                      <>
                        <h2 className="font-semibold">
                          <Drawer>
                            <DrawerTrigger className="shrink-0 pt-2" asChild>
                              <span className="cursor-pointer text-primary">
                                {
                                  data.users.find(
                                    (user) =>
                                      user.id === notification.data.requesterId,
                                  )!.username
                                }
                              </span>
                            </DrawerTrigger>
                            <DrawerContent className="">
                              <UserDrawerContent
                                user={
                                  data.users.find(
                                    (user) =>
                                      user.id === notification.data.requesterId,
                                  )!
                                }
                              />
                            </DrawerContent>
                          </Drawer>{" "}
                          requested to join the{" "}
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
                          </Link>{" "}
                          club
                        </h2>

                        <div className="mt-2 flex items-center justify-between">
                          <span className="shrink-0 text-xs text-muted-foreground">
                            2m ago
                          </span>

                          <Button
                            size={"sm"}
                            className="flex w-full items-center justify-end"
                            variant={"link"}
                          >
                            Group <ArrowRight />
                          </Button>
                        </div>
                      </>
                    )}
                    {notification.type === "eventReminder" && (
                      <>
                        <h2 className="font-semibold">
                          <span className="text-primary">
                            {
                              data.events.find(
                                (event) =>
                                  event.id === notification.data.eventId,
                              )!.title
                            }
                          </span>{" "}
                          begins in 1 day
                        </h2>

                        <div className="mt-2 flex items-center justify-between">
                          <span className="shrink-0 text-xs text-muted-foreground">
                            2m ago
                          </span>

                          <Button
                            size={"sm"}
                            className="flex w-full items-center justify-end"
                            variant={"link"}
                          >
                            Event <ArrowRight />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </Page>
    </>
  );
}

export default Notifications;
