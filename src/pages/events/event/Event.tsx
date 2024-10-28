import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, UserCircle } from "lucide-react";
import Card from "../../../components/card";
import FooterNav from "../../../components/footerNav";

function Event() {
  const date = new Date();
  return (
    <>
      <div className="flex h-full flex-col">
        <div className="overflow-y-auto p-4">
          <div className="grid grid-cols-3 items-center text-stone-700">
            <UserCircle className="h-8 w-8" />
            <h1 className="text-center font-semibold">Event Page</h1>
          </div>
          <img
            className="mt-4 h-[120px] rounded-lg object-cover"
            src="https://assets.ppy.sh/user-cover-presets/4/2fd772ad175c5687370e0aab50799a84adef7d0fff3f97dccfa5c94384ebb8af.jpeg"
          />

          <h2 className="mt-3 text-center text-xl font-semibold">
            Event Title
          </h2>

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
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio,
            enim ipsum est architecto nisi nesciunt aperiam quisquam officia
            obcaecati adipisci et? Voluptatem nulla, recusandae natus corporis
            quas hic animi ut.
          </p>

          <h2 className="mt-8 text-xl font-semibold">Attendees</h2>
          <div className="mt-1 flex gap-2 overflow-x-auto rounded-md py-2">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>

        <FooterNav />
      </div>
    </>
  );
}

export default Event;
