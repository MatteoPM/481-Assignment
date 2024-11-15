import Page from "@/components/page";
import SubHeader from "@/components/subHeader";
import { Button } from "@/components/ui/button";
import GroupCard from "@/pages/groups/_components/groupCard";
import { events, groups } from "@/placeholderData";
import { BookOpenText, Calendar, MapPin, Tags, Users } from "lucide-react";
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

          <SubHeader Icon={Calendar} text="Date and Time (MST)" />
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

          <SubHeader Icon={MapPin} text="Location" />

          <div className="mt-1 text-sm text-gray-500">{event.location}</div>

          <SubHeader Icon={BookOpenText} text="Description" />

          <p className="mt-1 text-sm text-gray-500">{event.description}</p>

          <SubHeader Icon={Tags} text="Categories" />

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

          <SubHeader Icon={Users} text="Hosting Group" />
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
