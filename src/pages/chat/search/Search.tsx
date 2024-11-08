import ForumCard from "@/components/forumCard";
import Page from "@/components/page";
import SearchBar from "@/components/searchBar";
import { MessageSquare, Plus } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

function ChatSearch() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");

  return (
    <>
      <Page
        title="Chat"
        rightHeaderButtons={
          <>
            <Link
              to={"/chat/dms"}
              className="text-stone-600 hover:text-blue-400"
            >
              <MessageSquare className="size-7 font-light" />
            </Link>
          </>
        }
      >
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
