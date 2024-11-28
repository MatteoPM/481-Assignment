import { useData } from "@/hooks/useData";
import { cn } from "@/lib/utils";
import { Forum } from "@/placeholderData";
import { formatRelative } from "date-fns";
import { Link } from "react-router-dom";

const ForumCard = ({ forum }: { forum: Forum }) => {
  const { data } = useData();
  const group = data.groups.find((group) => group.id === forum.groupId)!;

  const lastMessage = forum.messages[forum.messages.length - 1];

  return (
    <Link
      to={`/chat/${forum.id}`}
      className="flex items-center p-3 transition-colors hover:bg-muted/50"
    >
      <div className="">
        <div>
          <h2
            className={cn(
              "text-lg font-semibold leading-none",
              data.currentUser!.seenForumIds.includes(forum.id) &&
                "text-foreground/50",
            )}
          >
            {forum.title}
          </h2>
          <p className="text-sm text-muted-foreground">
            in{" "}
            <Link
              to={`/groups/${group.id}`}
              className="font-medium text-primary"
            >
              {group.name}
            </Link>
          </p>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Last reply {formatRelative(lastMessage.dateTime, new Date())}
          </span>
        </div>
      </div>
      <img
        className="ml-auto size-[40px] rounded-full object-cover"
        src={group.bannerUrl}
      />
    </Link>
  );
};

export default ForumCard;
