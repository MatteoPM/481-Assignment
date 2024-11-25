import { CalendarDays, Home, MessageCircleMore, Users } from "lucide-react";
import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const FooterNav = () => {
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
          to={"/chat"}
          className={({ isActive }) =>
            twMerge(
              "flex flex-col items-center py-3",
              isActive && "text-primary",
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
              isActive && "text-primary",
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
