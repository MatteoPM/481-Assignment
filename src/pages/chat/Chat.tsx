import ChatTabs from "@/components/chatTabs";
import ForumCard from "@/components/forumCard";
import Page from "@/components/page";
import SearchBar from "@/components/searchBar";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

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
        <div className="mt-3 flex flex-col divide-y overflow-hidden rounded-md border bg-white shadow-sm">
          <ForumCard />
          <ForumCard />
          <ForumCard />
          <ForumCard />
        </div>

        <Link to={""} className="py-2 text-sm text-muted-foreground">
          View all
        </Link>

        <h2 className="mt-6 text-xl font-semibold">Powerlifting</h2>
        <div className="mt-3 flex flex-col divide-y overflow-hidden rounded-md border bg-white shadow-sm">
          <ForumCard />
          <ForumCard />
          <ForumCard />
          <ForumCard />
        </div>

        <Link to={""} className="py-2 text-sm text-muted-foreground">
          View all
        </Link>

        <h2 className="mt-6 text-xl font-semibold">BSD</h2>
        <div className="mt-3 flex flex-col divide-y overflow-hidden rounded-md border bg-white shadow-sm">
          <ForumCard />
          <ForumCard />
          <ForumCard />
          <ForumCard />
        </div>
      </Page>
    </>
  );
}

export default Chat;
