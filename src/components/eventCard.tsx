import { Event } from "@/placeholderData";
import { Calendar, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";

const EventCard = ({ event }: { event: Event }) => {
  return (
    <Link
      to={"/events/1"}
      key={event.id}
      className="block w-full overflow-hidden rounded-lg bg-card text-card-foreground shadow"
    >
      <div className="space-y-2 bg-black/50 bg-[url('https://assets.ppy.sh/user-cover-presets/4/2fd772ad175c5687370e0aab50799a84adef7d0fff3f97dccfa5c94384ebb8af.jpeg')] bg-cover p-4 bg-blend-darken">
        <h3 className="text-lg font-semibold text-white">{event.title}</h3>

        <div className="flex items-center text-sm text-stone-300">
          <Calendar className="mr-2 h-4 w-4" />
          {new Date(event.dateTime).toLocaleString("en-US", {
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
          {event.group}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 p-4">
        <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
          {event.theme}
        </span>
        <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
          {event.category}
        </span>
        {event.perks.map((perk) => (
          <span
            key={perk}
            className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary"
          >
            {perk}
          </span>
        ))}
      </div>
    </Link>
  );
};

export default EventCard;
