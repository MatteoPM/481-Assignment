import { cn } from "@/lib/utils";
import { UserType } from "@/placeholderData";
import { useLocation } from "react-router-dom";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import UserDrawerContent from "./userDrawerContent";

const User = ({ user }: { user: UserType }) => {
  const location = useLocation();

  return (
    <Drawer key={`drawer-${location.pathname}-${user.id}`}>
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

      <DrawerContent key={`drawerContent-${location.pathname}-${user.id}`}>
        <DrawerTitle className="sr-only" />
        <DrawerDescription className="sr-only" />
        <UserDrawerContent user={user} />
      </DrawerContent>
    </Drawer>
  );
};

export default User;
