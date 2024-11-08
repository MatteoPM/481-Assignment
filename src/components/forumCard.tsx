import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const ForumCard = () => {
  return (
    <Link
      to={"/chat/1"}
      className="flex shrink-0 snap-start snap-always justify-between p-2 active:bg-stone-50"
    >
      <div>
        <div>
          <div className="font-medium">Forum Title</div>
          <div className="mt-1 text-xs text-muted-foreground">
            By <span className="">John Smeeth</span>
          </div>

          <div className="text-xs text-muted-foreground">
            Last reply by First Last 20 minutes ago
          </div>
        </div>
      </div>

      <ChevronRight className="self-center text-stone-500" />
    </Link>
  );
};

export default ForumCard;
