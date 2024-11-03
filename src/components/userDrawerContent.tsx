import { cn } from "@/lib/utils";
import { UserType } from "@/placeholderData";
import { Ban } from "lucide-react";

const UserDrawerContent = ({ user }: { user: UserType }) => {
  return (
    <div className="flex flex-col items-center p-8">
      <img
        src={user.avatarUrl}
        className="size-[75px] rounded-full object-cover"
      />

      <div className="text-lg font-medium">{user.username}</div>
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "ml-auto size-[8px] rounded-full",
            user.status === "online" && "bg-green-400",
            user.status === "offline" && "bg-stone-400",
            user.status === "away" && "bg-orange-400",
          )}
        ></div>

        <span className="block text-xs font-bold text-muted-foreground">
          {user.status.toUpperCase()}
        </span>
      </div>

      <div className="mt-10 flex w-full flex-col rounded-lg bg-stone-100">
        <button className="flex items-center justify-between p-4 text-destructive">
          <span className="font-medium">Block User</span>
          <Ban />
        </button>
      </div>
    </div>
  );
};

export default UserDrawerContent;
