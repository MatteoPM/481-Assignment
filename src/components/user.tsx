import { cn } from "@/lib/utils";
import { UserType } from "@/placeholderData";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import UserDrawerContent from "./userDrawerContent";

const User = ({ user }: { user: UserType }) => {
  if (!user) {
    throw new Error("wafsehj");
  }
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="flex items-center gap-2 rounded-full border bg-white p-1.5 pr-3 shadow-sm">
          <img
            src={user.avatarUrl}
            className="size-[25px] rounded-full object-cover"
          />

          <span className="truncate text-sm text-muted-foreground">
            {user.username}
          </span>

          <div
            className={cn(
              "ml-auto size-[8px] shrink-0 rounded-full",
              user.status === "online" && "bg-green-400",
              user.status === "offline" && "bg-gray-400",
              user.status === "away" && "bg-orange-400",
            )}
          ></div>
        </button>
      </DrawerTrigger>

      <DrawerContent>
        <UserDrawerContent user={user} />
      </DrawerContent>
    </Drawer>
  );
};

export default User;
