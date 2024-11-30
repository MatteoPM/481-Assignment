import { useData } from "@/hooks/useData";
import { cn } from "@/lib/utils";
import { Group } from "@/placeholderData";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const GroupCard = ({
  compact,
  group,
  showBorder,
}: {
  compact?: boolean;
  group: Group;
  showBorder?: boolean;
}) => {
  const { data } = useData();

  const memberCount = data.users.filter((user) => {
    return user.leaderGroupIds.concat(user.memberGroupIds).includes(group.id);
  }).length;

  if (compact) {
    return (
      <Link
        to={`/groups/${group.id ?? 0}`}
        className="flex shrink-0 snap-start snap-always justify-between p-2 transition-colors hover:bg-muted/50 active:bg-stone-50"
      >
        <div>
          <div className="flex items-center gap-2">
            <img
              className="size-[35px] rounded-full object-cover"
              src={group.bannerUrl}
            />
            <div>
              <div>{group.name || "Group Name"}</div>
            </div>
          </div>
        </div>

        <ChevronRight className="self-center text-stone-500" />
      </Link>
    );
  }

  return (
    <Link
      to={`/groups/${group.id ?? 0}`}
      className={cn(
        "flex h-[110px] shrink-0 snap-start snap-always justify-between overflow-hidden bg-white p-2 active:bg-stone-50",
        showBorder && "rounded-md border shadow-sm",
      )}
    >
      <div>
        <div className="flex items-center gap-2">
          <img
            className="size-[35px] rounded-full object-cover"
            src={group.bannerUrl}
          />
          <div>
            <div>{group.name}</div>
            <div className="text-xs text-muted-foreground">
              {memberCount} member{memberCount !== 1 ? "s" : ""}
            </div>
          </div>
        </div>

        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {group.description}
        </p>
      </div>

      <ChevronRight className="shrink-0 self-center text-stone-500" />
    </Link>
  );
};

export default GroupCard;
