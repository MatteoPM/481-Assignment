import { MessageSquare, Plus, SearchIcon, UserCircle } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/card";
import FooterNav from "../../components/footerNav";

function Chat() {
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
            <h1 className="text-center font-semibold">Chat</h1>
            <div className="justify-self-end">
              <MessageSquare className="h-8 w-8" />
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

          <h2 className="mt-6 text-xl font-semibold">Infosec Club</h2>
          <div className="mt-1 flex gap-2 overflow-x-auto rounded-md py-2 scrollbar">
            <Link to="/chat/1" className="text-blue-400">
              <Card />
            </Link>
            <Card />
            <Card />
            <Card />
          </div>

          <h2 className="mt-8 text-xl font-semibold">Powerlifting</h2>
          <div className="mt-1 flex gap-2 overflow-x-auto rounded-md py-2">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>

          <h2 className="mt-8 text-xl font-semibold">BSD</h2>
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

export default Chat;
