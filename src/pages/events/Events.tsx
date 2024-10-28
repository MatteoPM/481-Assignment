import { MessageSquare, Plus, Search, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../../components/card";
import FooterNav from "../../components/footerNav";

function Events() {
  return (
    <>
      <div className="flex h-full flex-col">
        <div className="overflow-y-auto p-4">
          <div className="grid grid-cols-3 items-center text-stone-700">
            <UserCircle className="h-8 w-8" />
            <h1 className="text-center font-semibold">Events</h1>
            <div className="justify-self-end">
              <MessageSquare className="h-8 w-8" />
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="relative flex grow items-center rounded bg-stone-200 px-2 py-1.5 text-sm">
              <Search className="mr-2 text-stone-500" />
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-transparent placeholder:text-stone-400 focus:outline-none"
              />
            </div>
            <Link
              to={"/events/create"}
              className="rounded-full bg-white p-1 shadow"
            >
              <Plus className="text-green-400" />
            </Link>
          </div>

          <h2 className="mt-6 text-xl font-semibold">RSVP'd</h2>
          <div className="mt-1 flex gap-2 overflow-x-auto rounded-md py-2 scrollbar">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>

          <h2 className="mt-8 text-xl font-semibold">Upcoming Events</h2>
          <div className="mt-1 flex gap-2 overflow-x-auto rounded-md py-2">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>

          <h2 className="mt-8 text-xl font-semibold">Suggested Events</h2>
          <div className="mt-1 flex gap-2 overflow-x-auto rounded-md py-2">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>

        <FooterNav />
      </div>
    </>
  );
}

export default Events;
