import { Event, groups } from "@/placeholderData";
import { Calendar, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";

const EventCard = ({ event }: { event: Event }) => {
  const group = groups.find((group) => group.id === Number(event.groupId))!;

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

        <div className="mt-2 space-y-1">
          <div className="flex items-center text-sm text-stone-300">
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
        {event.categories.sort().map((category) => (
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
