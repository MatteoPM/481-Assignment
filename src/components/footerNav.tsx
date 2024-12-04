import { useData } from "@/hooks/useData";
import { CalendarDays, Home, MessageCircleMore, Users } from "lucide-react";
import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const FooterNav = () => {
  const { data } = useData();

  const hasUnreadMessages = data.privateChats
    .filter((dm) => dm.messages.length > 0)
    .filter((dm) => dm.participantIds.includes(data.currentUser!.id))
    .some((dm) => !dm.seenIds.includes(data.currentUser!.id));

  return (
    <>
      <footer className="mt-auto grid w-full grid-flow-col border-t-2 bg-white">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            twMerge(
              "flex flex-col items-center py-3",
              isActive && "text-primary",
            )
          }
        >
          <Home />
          Home
        </NavLink>
        <NavLink
          to={"/groups"}
          className={({ isActive }) =>
            twMerge(
              "flex flex-col items-center py-3",
              isActive && "text-primary",
            )
          }
        >
          <Users />
          Groups
        </NavLink>
        <NavLink
          to={"/chat"}
          className={({ isActive }) =>
            twMerge(
              "relative flex flex-col items-center py-3",
              isActive && "text-primary",
            )
          }
        >
          <MessageCircleMore className="relative"></MessageCircleMore>
          <span>Chat</span>
          {hasUnreadMessages && (
            <div className="absolute right-[20px] top-[10px] size-[10px] rounded-full bg-red-400"></div>
          )}
        </NavLink>
        <NavLink
          to={"/events"}
          className={({ isActive }) =>
            twMerge(
              "flex flex-col items-center py-3",
              isActive && "text-primary",
            )
          }
        >
          <CalendarDays />
          Events
        </NavLink>
      </footer>
    </>
  );
};

export default FooterNav;
