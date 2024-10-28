import DmCard from "@/components/dmCard";
import FooterNav from "@/components/footerNav";
import {
  placeholderUser,
  placeholderUser2,
  placeholderUser3,
} from "@/placeholderData";
import { Plus, ScrollText, SearchIcon, UserCircle } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dms() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (query) {
      navigate(`/chat/search?q=${query}`);
    }
  };

  return (
    <>
      <div className="flex h-full flex-col">
        <div className="overflow-y-auto p-4">
          <div className="grid grid-cols-3 items-center text-stone-700">
            <UserCircle className="h-8 w-8" />
            <h1 className="text-center font-semibold">Private Messages</h1>
            <div className="justify-self-end">
              <Link to={"/chat"} className="hover:text-blue-400">
                <ScrollText className="h-8 w-8" />
              </Link>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <form
              onSubmit={handleSubmit}
              className="relative flex grow items-center rounded bg-stone-200 px-2 py-1.5 text-sm"
            >
              <button type="submit" className="cursor-pointer">
                <SearchIcon className="mr-2 text-stone-500" />
              </button>
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-transparent placeholder:text-stone-400 focus:outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </form>
            <button className="rounded-full bg-white p-1 shadow">
              <Plus className="text-green-400" />
            </button>
          </div>
        </div>

        <div className="divide-y divide-solid">
          <Link to={"/chat/dms/1"} className="text-blue-400">
            <DmCard user={placeholderUser} />
          </Link>
          <DmCard user={placeholderUser2} />
          <DmCard user={placeholderUser3} />
        </div>

        <FooterNav />
      </div>
    </>
  );
}

export default Dms;
