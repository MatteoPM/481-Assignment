import Page from "@/components/page";
import SearchBar from "@/components/searchBar";
import ChatTabs from "@/pages/chat/_components/chatTabs";
import ForumCard from "@/pages/chat/_components/forumCard";
import { Plus } from "lucide-react";

function Chat() {
  return (
    <>
      <Page title="Chat" headerContent={<ChatTabs value="forums" />}>
        <div className="flex items-center gap-4">
          <SearchBar placeholder="Search groups/topics..." />

          <button className="rounded-full bg-white p-1 shadow">
            <Plus className="text-green-400" />
          </button>
        </div>

        <div className="mt-3 flex flex-col divide-y overflow-hidden rounded-md border bg-white shadow-sm">
          <ForumCard />
          <ForumCard />
          <ForumCard />
          <ForumCard />
        </div>

        <p className="mt-2 text-center text-sm font-medium text-muted-foreground">
          End of results.
        </p>
      </Page>
    </>
  );
}

export default Chat;
