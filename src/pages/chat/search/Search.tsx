import Page from "@/components/page";
import SearchBar from "@/components/searchBar";
import { MessageSquare, Plus } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import Card from "../../../components/card";

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
        <div className="mt-2 grid grid-cols-2 gap-3">
          <Link to="/chat/1">
            <Card />
          </Link>
          <Card />
          <Card />
          <Card />
        </div>
      </Page>
    </>
  );
}

export default ChatSearch;
