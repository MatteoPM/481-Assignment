import { useData } from "@/hooks/useData";
import { Event } from "@/placeholderData";
import { Calendar, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";

const EventCard = ({ event }: { event: Event }) => {
  const { data } = useData();

  const group = data.groups.find(
    (group) => group.id === Number(event.groupId),
  )!;

  return (
    <Link
      to={`/events/${event.id}`}
      key={event.id}
      className="block w-full overflow-hidden rounded-lg bg-card text-card-foreground shadow"
    >
      <div
        className={`bg-black/75 bg-cover bg-center p-4 bg-blend-darken`}
        style={{
          backgroundImage: `url('${event.bannerUrl}')`,
        }}
      >
        <h3 className="text-lg font-semibold text-white">{event.title}</h3>

        {/* <span className="rounded-full bg-green-400/10 px-2 py-1 text-xs text-green-400">
          RSVP'd ✅
        </span> */}
        {/* <span className="rounded-full bg-orange-400/10 px-2 py-1 text-xs text-orange-400">
          RSVP Pending 🕒
        </span> */}
        {/* <span className="rounded-full bg-red-400/10 px-2 py-1 text-xs text-red-400">
          RSVP Rejected ❌
        </span> */}

        <div className="mt-2 space-y-1">
          <div className="flex items-center text-sm text-stone-200">
            <Calendar className="mr-2 h-4 w-4" />
            {new Date(event.startDateTime).toLocaleString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </div>

          <div className="flex items-center text-sm text-stone-300">
            <MapPin className="mr-2 h-4 w-4" />
            {event.location}
          </div>

          <div className="flex items-center text-sm text-stone-300">
            <Users className="mr-2 h-4 w-4" />
            {group.name}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 p-4">
        {event.categories
          .slice()
          .sort()
          .map((category) => (
            <span
              key={category}
              className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary"
            >
              {category}
            </span>
          ))}
      </div>
    </Link>
  );
};

export default EventCard;
