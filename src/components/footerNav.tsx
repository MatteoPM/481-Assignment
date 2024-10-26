import { CalendarDays, Home, MessageCircleMore, Users } from "lucide-react";
import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const FooterNav = () => {
  return (
    <>
      <footer className="grid grid-flow-col mt-auto border-t-2 bg-white w-full">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            twMerge(
              "flex flex-col items-center py-3",
              isActive && "text-blue-500"
            )
          }
        >
          <Home />
          Home
        </NavLink>
        <NavLink
          to={"/chat"}
          className={({ isActive }) =>
            twMerge(
              "flex flex-col items-center py-3",
              isActive && "text-blue-500"
            )
          }
        >
          <MessageCircleMore />
          Chat
        </NavLink>
        <NavLink
          to={"/groups"}
          className={({ isActive }) =>
            twMerge(
              "flex flex-col items-center py-3",
              isActive && "text-blue-500"
            )
          }
        >
          <Users />
          Groups
        </NavLink>
        <NavLink
          to={"/events"}
          className={({ isActive }) =>
            twMerge(
              "flex flex-col items-center py-3",
              isActive && "text-blue-500"
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
