import {
  CalendarDays,
  MessageCircleMore,
  MoreHorizontal,
  Users,
} from "lucide-react";

const FooterNav = () => {
  return (
    <>
      <footer className="grid grid-flow-col mt-auto border-t-2 bg-white w-full">
        <div className="flex flex-col items-center py-3">
          <MessageCircleMore />
          Chat
        </div>
        <div className="flex flex-col items-center py-3">
          <Users />
          Groups
        </div>
        <div className="flex flex-col items-center py-3">
          <CalendarDays />
          Events
        </div>
        <div className="flex flex-col items-center py-3">
          <MoreHorizontal />
          More
        </div>
      </footer>
    </>
  );
};

export default FooterNav;
