import ChatTabs from "@/components/chatTabs";
import Page from "@/components/page";
import SearchBar from "@/components/searchBar";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../../components/card";

function Chat() {
  return (
    <>
      <Page title="Chat" headerContent={<ChatTabs value="forums" />}>
        <div className="flex items-center gap-4">
          <SearchBar
            searchUrl="/chat/search"
            placeholder="Search clubs, topics..."
          />

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
      </Page>
    </>
  );
}

export default Chat;
