import Page from "@/components/page";
import { Button } from "@/components/ui/button";
import User from "@/components/user";
import { cn } from "@/lib/utils";
import {
  placeholderUser,
  placeholderUser2,
  placeholderUser3,
} from "@/placeholderData";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

function Event() {
  const date = new Date();
  return (
    <>
      <Page title="Event Page" showBackButton>
        <img
          className="h-[120px] rounded-lg object-cover"
          src="https://assets.ppy.sh/user-cover-presets/4/2fd772ad175c5687370e0aab50799a84adef7d0fff3f97dccfa5c94384ebb8af.jpeg"
        />

        <h2 className="mt-3 text-center text-xl font-semibold">Event Title</h2>

        <div className="my-5 flex gap-6">
          <Button
            variant={"outline"}
            className={cn(
              "pointer-events-none grow pl-3 text-left font-normal",
            )}
          >
            {date ? format(date, "PPP") : <span>Enter Date</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
          <button className="ml-auto rounded-md bg-blue-500 px-2 py-1 text-white">
            RSVP
          </button>
        </div>

        <p className="mt-2 text-stone-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, enim
          ipsum est architecto nisi nesciunt aperiam quisquam officia obcaecati
          adipisci et? Voluptatem nulla, recusandae natus corporis quas hic
          animi ut.
        </p>

        <h2 className="mt-8 text-xl font-semibold">
          Attendees{" "}
          <span className="font-normal text-muted-foreground">(3)</span>
        </h2>
        <div className="mt-1 grid grid-cols-2 gap-2 rounded-md py-2 scrollbar">
          <User user={placeholderUser} />
          <User user={placeholderUser2} />
          <User user={placeholderUser3} />
        </div>
      </Page>
    </>
  );
}

export default Event;
