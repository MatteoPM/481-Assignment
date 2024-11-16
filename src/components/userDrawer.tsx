import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { testUser } from "@/placeholderData";
import { CircleHelp, LogOut, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";

const UserDrawer = () => {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button className="shrink-0 overflow-hidden rounded-full border bg-white p-0 text-stone-600">
          <img src={testUser.avatarUrl} className="size-[35px] object-cover" />
        </button>
      </DrawerTrigger>
      <DrawerContent className="top-0 flex w-[300px] flex-col rounded-r-none">
        <div className="flex flex-col items-center p-4">
          <img
            src={testUser.avatarUrl}
            className="size-[80px] rounded-full object-cover"
          />

          <div className="text-xl font-semibold">{testUser.username}</div>
        </div>

        <Link
          to={"/notifications"}
          className="mx-auto flex items-center justify-center gap-2 rounded-full border border-orange-400 bg-orange-100 p-2 text-sm text-stone-500"
        >
          <span className="text-orange-400">Notifications</span>{" "}
          <span className="flex size-[20px] items-center justify-center rounded-full bg-red-400 text-white">
            3
          </span>
        </Link>

        <div className="mt-auto">
          <Link to={""} className="flex gap-4 p-3 font-medium text-stone-800">
            <CircleHelp /> <span>Help</span>
          </Link>
          <Link to={""} className="flex gap-4 p-3 font-medium text-stone-800">
            <Settings /> <span>Settings</span>
          </Link>

          <Separator className="" />
          <Link
            to={"/login"}
            className="flex items-center gap-4 p-3 font-medium text-stone-800"
          >
            <LogOut /> <span>Sign Out</span>
          </Link>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default UserDrawer;
