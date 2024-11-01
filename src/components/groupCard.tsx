import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export type Group = {
  name: string;
  bannerUrl: string;
  description: string;
  memberCount: number;
};

const GroupCard = ({ compact }: { compact?: boolean }) => {
  if (compact) {
    return (
      <Link
        to={"/groups/1"}
        className="flex shrink-0 snap-start snap-always justify-between p-2 active:bg-stone-50"
      >
        <div>
          <div className="flex items-center gap-2">
            <img
              className="size-[35px] rounded-full object-cover"
              src="https://assets.ppy.sh/user-cover-presets/4/2fd772ad175c5687370e0aab50799a84adef7d0fff3f97dccfa5c94384ebb8af.jpeg"
            />
            <div>
              <div>Group Name</div>
            </div>
          </div>
        </div>

        <ChevronRight className="self-center text-stone-500" />
      </Link>
    );
  }

  return (
    <Link
      to={"/groups/1"}
      className="flex h-[110px] shrink-0 snap-start snap-always justify-between overflow-hidden rounded-md border bg-white p-2 shadow-sm active:bg-stone-50"
    >
      <div>
        <div className="flex items-center gap-2">
          <img
            className="size-[35px] rounded-full object-cover"
            src="https://assets.ppy.sh/user-cover-presets/4/2fd772ad175c5687370e0aab50799a84adef7d0fff3f97dccfa5c94384ebb8af.jpeg"
          />
          <div>
            <div>Group Name</div>
            <div className="text-xs text-muted-foreground">15 members</div>
          </div>
        </div>

        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          Group Description blah blah. Does it wrap? Does it truncate? Testing
          testing testing join our group pls i beg of you
        </p>
      </div>

      <ChevronRight className="self-center text-stone-500" />
    </Link>
  );
};

export default GroupCard;
