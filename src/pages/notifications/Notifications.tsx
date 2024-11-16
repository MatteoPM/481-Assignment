import Page from "@/components/page";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarDays, MessageCircleMore, Users } from "lucide-react";
import { useState } from "react";

function Notifications() {
  const [type, setType] = useState("all");

  return (
    <>
      <Page title="Notifications" showBackButton hideFooter>
        <div className="flex flex-wrap gap-3">
          {["All", "Chat", "Group", "Event"].map((type2) => (
            <button
              key={type2}
              className={cn(
                `rounded-full bg-gray-200/50 px-3 py-1 text-gray-800`,
                type === type2.toLowerCase() && "bg-primary/10 text-primary",
              )}
              onClick={() => setType(type2.toLowerCase())}
            >
              {type2}
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
                <span className="text-primary">John Smeeth</span> sent a message
              </h2>
              <p className="text-sm text-muted-foreground">
                Hey, how are you going?
              </p>
              <span className="mt-1 text-xs text-muted-foreground">2m ago</span>

              <Button size={"sm"} className="mt-2 block w-full">
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
                <span className="text-primary">Guy Fieri</span> requested to
                join the <span className="text-primary">Jazz Band</span> club
              </h2>

              <span className="mt-1 block text-xs text-muted-foreground">
                2m ago
              </span>

              <div className="mt-2 grid grid-cols-2 gap-2">
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
                <span className="text-primary">Ash Ketchum</span> requested to
                attend the{" "}
                <span className="text-primary">Pokemon Go Meetup</span> event
              </h2>

              <span className="mt-1 block text-xs text-muted-foreground">
                2m ago
              </span>

              <div className="mt-2 grid grid-cols-2 gap-2">
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
