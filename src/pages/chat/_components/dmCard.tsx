import { useData } from "@/hooks/useData";
import { cn } from "@/lib/utils";
import { PrivateChat } from "@/placeholderData";
import { formatRelative } from "date-fns";

const DmCard = ({ dm, className }: { dm: PrivateChat; className?: string }) => {
  const { data } = useData();

  const otherParticipants = dm.participantIds
    .filter((id) => id !== data.currentUser!.id)
    .map((id) => data.users.find((user) => user.id === id)!);

  const lastMessage = dm.messages[dm.messages.length - 1];

  return (
    <div
      className={cn(
        "grid grid-cols-[auto_1fr_auto] gap-2 p-3 transition-colors hover:bg-muted/50",
        className,
      )}
    >
      {otherParticipants.length === 1 && (
        <div className="relative">
          <img
            src={otherParticipants[0].avatarUrl}
            className="size-[40px] rounded-full object-cover"
          />
          <div
            className={cn(
              "absolute bottom-[3px] right-[3px] size-[12px] rounded-full border-2 border-white",
              otherParticipants[0].status === "online" && "bg-green-400",
              otherParticipants[0].status === "offline" && "bg-stone-400",
              otherParticipants[0].status === "away" && "bg-orange-400",
            )}
          ></div>
        </div>
      )}
      {otherParticipants.length > 1 && (
        <div className="relative size-[40px]">
          <img
            src={otherParticipants[0].avatarUrl}
            className="size-[30px] rounded-full object-cover"
          />
          <img
            src={otherParticipants[1].avatarUrl}
            className="absolute bottom-0 right-0 size-[32px] rounded-full border-2 border-white object-cover"
          />
        </div>
      )}

      <div className="truncate">
        <span
          className={cn(
            "block truncate font-medium",
            dm.seenIds.includes(data.currentUser!.id) &&
              "text-muted-foreground",
          )}
        >
          {otherParticipants
            .map((participant) => participant.username)
            .sort()
            .join(", ")}
        </span>
        <p className="truncate text-sm text-stone-500">{lastMessage.message}</p>
      </div>

      <div className="ml-auto shrink-0 self-start text-xs text-muted-foreground">
        {formatRelative(lastMessage.dateTime, new Date())}
      </div>
    </div>
  );
};

export default DmCard;
