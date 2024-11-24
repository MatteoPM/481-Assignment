import { useData } from "@/hooks/useData";
import { cn } from "@/lib/utils";
import { PrivateChat } from "@/placeholderData";
import { formatRelative } from "date-fns";

const DmCard = ({ dm, className }: { dm: PrivateChat; className?: string }) => {
  const { data } = useData();

  const participants = dm.participantIds
    .filter((id) => id !== data.currentUser.id)
    .map((id) => data.users.find((user) => user.id === id)!);

  const lastMessage = dm.messages[dm.messages.length - 1];

  return (
    <div
      className={cn(
        "grid grid-cols-[auto_1fr_auto] gap-2 p-3 transition-colors hover:bg-muted/50",
        className,
      )}
    >
      <img
        src={participants[0].avatarUrl}
        className="size-[40px] rounded-full object-cover"
      />

      <div className="truncate">
        <span className="block truncate font-medium">
          {participants
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
