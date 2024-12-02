import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useData } from "@/hooks/useData";
import { CircleHelp, LogOut, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useUnderDevelopment } from "./contexts/UnderDevelopmentContext";
import { Separator } from "./ui/separator";

const UserDrawer = () => {
  const { data, setData } = useData();
  const { setShowUnderDevelopment } = useUnderDevelopment();
  const testUser = data.currentUser!;

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button className="relative shrink-0 rounded-full border bg-white p-0 text-stone-600 shadow-sm">
          <img
            src={testUser.avatarUrl}
            className="size-[35px] rounded-full object-cover"
          />

          <div className="absolute right-[-5px] top-[-5px] flex size-[20px] items-center justify-center rounded-full bg-red-400 text-white shadow-sm">
            3
          </div>
        </button>
      </DrawerTrigger>
      <DrawerContent
        className="top-0 flex w-[300px] flex-col rounded-r-none"
        aria-describedby="undefined"
      >
        <DrawerTitle className="sr-only" />
        <DrawerDescription className="sr-only" />
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
          <button
            onClick={() => {
              setShowUnderDevelopment(true);
            }}
            className="flex gap-4 p-3 font-medium text-stone-800"
          >
            <CircleHelp /> <span>Help</span>
          </button>
          <Link
            to={"/settings"}
            className="flex gap-4 p-3 font-medium text-stone-800"
          >
            <Settings /> <span>Settings</span>
          </Link>

          <Separator className="" />
          <button
            // to={"/login"}
            className="flex items-center gap-4 p-3 font-medium text-stone-800"
            onClick={() => {
              setData((draft) => {
                draft.currentUser = null;
              });
            }}
          >
            <LogOut /> <span>Sign Out</span>
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default UserDrawer;
