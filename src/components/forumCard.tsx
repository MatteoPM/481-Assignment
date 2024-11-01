import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const ForumCard = () => {
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
            <div>Forum Title</div>
            <div>By (username)</div>

            <div>Last reply by (username)</div>
            <div>20 minutes ago</div>
          </div>
        </div>
      </div>

      <ChevronRight className="self-center text-stone-500" />
    </Link>
  );
};

export default ForumCard;
