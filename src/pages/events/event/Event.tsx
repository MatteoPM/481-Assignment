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
import { useParams } from "react-router-dom";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});

function Event() {
  const { eventId } = useParams();
  const event = events.find((event) => event.id === Number(eventId))!;

  const startDate = new Date(event.startDateTime);
  const endDate = new Date(event.endDateTime);

  const group = groups.find((group) => group.id === Number(event.groupId))!;

  return (
    <>
      <Page
        title={event.title}
        showBackButton
        bodyClassname="p-0 flex flex-col"
      >
        <img
          className="h-[150px] shrink-0 rounded-b-xl object-cover shadow-lg"
          src={event.bannerUrl}
        />

        <div className="p-4">
          <h2 className="mb-4 border-b pb-4 text-2xl font-bold">
            {event.title}
          </h2>

          <h3 className="mt-4 flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>Date and Time (MST)</span>
          </h3>
          <div className="mt-1 text-sm text-gray-500">
            <div className="flex items-baseline">
              <span className="w-14 text-xs font-bold">STARTS</span>
              <span>{dateFormatter.format(startDate)}</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-14 text-xs font-bold">ENDS</span>
              <span>{dateFormatter.format(endDate)}</span>
            </div>
          </div>

          <h3 className="mt-4 flex items-center">
            <MapPinIcon className="mr-2 h-4 w-4" />
            <span>Location</span>
          </h3>
          <div className="mt-1 text-sm text-gray-500">{event.location}</div>

          <h3 className="mt-4 flex items-center">
            <BookOpenText className="mr-2 h-4 w-4" />
            <span>Description</span>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{event.description}</p>

          <h3 className="mt-4 flex items-center">
            <Tags className="mr-2 h-4 w-4" />
            <span>Categories</span>
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {events[0].categories.sort().map((perk) => (
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
            <GroupCard group={group} />
          </div>

          <Button className="sticky bottom-4 mt-auto w-full">RSVP</Button>
        </div>
      </Page>
    </>
  );
}

export default Event;
