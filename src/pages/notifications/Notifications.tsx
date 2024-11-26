import Page from "@/components/page";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarDays, MessageCircleMore, Users } from "lucide-react";
import { useState } from "react";

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
          <div className="flex items-start space-x-4 rounded-lg bg-card p-4 shadow-sm">
            <div className="rounded-full bg-primary/10 p-2">
              <MessageCircleMore />
            </div>
            <div className="flex-grow">
              <h2 className="font-semibold">
                <span className="text-primary">Sergio Barnes</span> sent a
                message
              </h2>
              <p className="text-sm text-muted-foreground">
                Hey, how are you doing?
              </p>
              <span className="text-xs text-muted-foreground">2m ago</span>

              <Button size={"sm"} className="mt-3 block w-full">
                Reply
              </Button>
            </div>
          </div>

          <div className="flex items-start space-x-4 rounded-lg bg-card p-4 shadow-sm">
            <div className="rounded-full bg-primary/10 p-2">
              <Users />
            </div>
            <div className="flex-grow">
              <h2 className="font-semibold">
                <span className="text-primary">Debbie Hopkins</span> requested
                to join the{" "}
                <span className="text-primary">Caffeine Crusaders</span> club
              </h2>

              <span className="block text-xs text-muted-foreground">
                2m ago
              </span>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <Button size={"sm"}>Accept</Button>
                <Button size={"sm"} variant={"destructive"}>
                  Reject
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-4 rounded-lg bg-card p-4 shadow-sm">
            <div className="rounded-full bg-primary/10 p-2">
              <CalendarDays />
            </div>
            <div className="flex-grow">
              <h2 className="font-semibold">
                <span className="text-primary">Brenda Pease</span> requested to
                attend the{" "}
                <span className="text-primary">
                  Late-Night Study Jam with Coffee Tasting
                </span>{" "}
                event
              </h2>

              <span className="block text-xs text-muted-foreground">
                2m ago
              </span>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <Button size={"sm"}>Accept</Button>
                <Button size={"sm"} variant={"destructive"}>
                  Reject
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Page>
    </>
  );
}

export default Notifications;
