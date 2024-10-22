import { MessageSquare, Plus, Search, UserCircle } from "lucide-react";
import Card from "../../components/card";
import FooterNav from "../../components/footerNav";

function Chat() {
  return (
    <>
      <div className="h-full flex flex-col">
        <div className="p-4 overflow-y-auto">
          <div className="grid grid-cols-3 items-center text-stone-700">
            <UserCircle className="w-8 h-8" />
            <h1 className="text-center font-semibold">Chat</h1>
            <div className="justify-self-end">
              <MessageSquare className="w-8 h-8" />
            </div>
          </div>

          <div className="flex gap-4 items-center mt-6">
            <div className="bg-stone-200 relative rounded flex items-center px-2 py-1.5 text-sm grow">
              <Search className="mr-2 text-stone-500" />
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-transparent placeholder:text-stone-400 focus:outline-none"
              />
            </div>
            <button className="bg-white rounded-full p-1 shadow">
              <Plus className="text-green-400" />
            </button>
          </div>

          <h2 className="font-semibold text-xl mt-6">Infosec Club</h2>
          <div className="py-2 rounded-md mt-1 flex gap-2 overflow-x-auto scrollbar">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>

          <h2 className="font-semibold text-xl mt-8">Powerlifting</h2>
          <div className="py-2 rounded-md mt-1 flex gap-2 overflow-x-auto ">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>

          <h2 className="font-semibold text-xl mt-8">BSD</h2>
          <div className="py-2 rounded-md mt-1 flex gap-2 overflow-x-auto ">
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
