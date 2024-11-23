import { useData } from "@/hooks/useData";
import { cn, hasSameValues } from "@/lib/utils";
import { UserType } from "@/placeholderData";
import { Link } from "react-router-dom";

const DmCard = ({
  user,
  className,
}: {
  user: UserType;
  className?: string;
}) => {
  const { data } = useData();

  const dmId =
    data.privateChats.find((privateChat) => {
      console.log(privateChat);

      return hasSameValues(privateChat.participantIds, [0, 1]);
    })?.id || -1;

  return (
    <Link
      to={`/chat/dms/${dmId}`}
      className={cn(
        "flex items-center gap-2 p-3 transition-colors hover:bg-muted/50",
        className,
      )}
    >
      <img
        src={user.avatarUrl}
        className="size-[40px] rounded-full object-cover"
      />

      <div>
        <span className="block font-medium">{user.username}</span>
        <p className="text-sm text-stone-500">Last message goes here</p>
      </div>

      <div className="ml-auto self-start text-xs text-muted-foreground">
        <span>5 mins ago</span>
      </div>
    </Link>
  );
};

export default DmCard;
