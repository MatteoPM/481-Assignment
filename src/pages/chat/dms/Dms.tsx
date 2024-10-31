import DmCard from "@/components/dmCard";
import Page from "@/components/page";
import SearchBar from "@/components/searchBar";
import {
  placeholderUser,
  placeholderUser2,
  placeholderUser3,
} from "@/placeholderData";
import { Plus, ScrollText } from "lucide-react";
import { Link } from "react-router-dom";

function Dms() {
  return (
    <>
      <Page
        title="Private Messages"
        rightHeaderButtons={
          <Link to={"/chat"} className="text-stone-600 hover:text-blue-400">
            <ScrollText className="size-7" />
          </Link>
        }
      >
        <div className="flex items-center gap-4">
          <SearchBar searchUrl="/chat/search" />

          <button className="rounded-full bg-white p-1 shadow">
            <Plus className="text-green-400" />
          </button>
        </div>

        <div className="my-2 divide-y divide-solid">
          <Link to={"/chat/dms/1"} className="text-blue-400">
            <DmCard user={placeholderUser} />
          </Link>
          <DmCard user={placeholderUser2} />
          <DmCard user={placeholderUser3} />
        </div>
      </Page>
    </>
  );
}

export default Dms;
