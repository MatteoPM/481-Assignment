import Page from "@/components/page";
import SearchBar from "@/components/searchBar";
import ForumCard from "@/pages/chat/_components/forumCard";
import { Plus } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import ChatTabs from "../_components/chatTabs";

function ChatSearch() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");

  return (
    <>
      <Page title="Chat" headerContent={<ChatTabs value="private" />}>
        <div className="flex items-center gap-4">
          <SearchBar searchUrl="/chat/search" initialValue={q} />

          <button className="rounded-full bg-white p-1 shadow">
            <Plus className="text-green-400" />
          </button>
        </div>

        <h2 className="mt-6 text-xl font-semibold">Results for "{q}"</h2>
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

export default ChatSearch;
