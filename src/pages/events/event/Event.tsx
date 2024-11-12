import GroupCard from "@/components/groupCard";
import Page from "@/components/page";
import { Button } from "@/components/ui/button";
import { events, groups } from "@/placeholderData";
import {
  BookOpenText,
  CalendarIcon,
  MapPinIcon,
  Tags,
  Users,
} from "lucide-react";

function Event() {
  return (
    <>
      <Page title="Event Page" showBackButton bodyClassname="p-0 flex flex-col">
        <img
          className="h-[150px] shrink-0 rounded-b-xl object-cover shadow-lg"
          src="https://assets.ppy.sh/user-cover-presets/4/2fd772ad175c5687370e0aab50799a84adef7d0fff3f97dccfa5c94384ebb8af.jpeg"
        />

        <div className="relative flex grow flex-col p-4">
          <h2 className="text-2xl font-bold">Event Title</h2>

          <h3 className="mt-4 flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>Date and Time (MST)</span>
          </h3>
          <div className="mt-1 text-sm text-gray-500">
            <div className="flex items-baseline">
              <span className="w-14 text-xs font-bold">STARTS</span>
              <span>Sat, Nov 9, 2024 9:00 PM</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-14 text-xs font-bold">ENDS</span>
              <span>Sun, Nov 10, 2024 2:00 AM</span>
            </div>
          </div>

          <h3 className="mt-4 flex items-center">
            <MapPinIcon className="mr-2 h-4 w-4" />
            <span>Location</span>
          </h3>
          <div className="mt-1 text-sm text-gray-500">
            <div>The Back Alley</div>
            <div>4630 Macleod Trail Calgary, AB T2G 5E8</div>
          </div>

          <h3 className="mt-4 flex items-center">
            <BookOpenText className="mr-2 h-4 w-4" />
            <span>Description</span>
          </h3>
          <p className="text-sm text-stone-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio,
            enim ipsum est architecto nisi nesciunt aperiam quisquam officia
            obcaecati adipisci et? Voluptatem nulla, recusandae natus corporis
            quas hic animi ut.
          </p>

          <h3 className="mt-4 flex items-center">
            <Tags className="mr-2 h-4 w-4" />
            <span>Categories</span>
          </h3>
          <div className="mt-1 flex flex-wrap gap-2">
            <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
              {events[0].theme}
            </span>
            <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
              {events[0].category}
            </span>
            {events[0].perks.map((perk) => (
              <span
                key={perk}
                className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary"
              >
                {perk}
              </span>
            ))}
          </div>

          <h3 className="mt-4 flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Hosting Group
          </h3>
          <div className="mb-4 mt-2">
            <GroupCard group={groups[0]} />
          </div>

          <Button className="sticky bottom-4 mt-auto">RSVP</Button>
        </div>
      </Page>
    </>
  );
}

export default Event;
