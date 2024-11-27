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
        <img
          src={otherParticipants[0].avatarUrl}
          className="size-[40px] rounded-full object-cover"
        />
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
        <span className="block truncate font-medium">
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
