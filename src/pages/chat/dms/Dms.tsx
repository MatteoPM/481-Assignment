import Page from "@/components/page";
import SearchBar from "@/components/searchBar";
import ChatTabs from "@/pages/chat/_components/chatTabs";
import DmCard from "@/pages/chat/_components/dmCard";
import {
  placeholderUser,
  placeholderUser2,
  placeholderUser3,
} from "@/placeholderData";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

function Dms() {
  return (
    <>
      <Page
        title="Chat"
        headerContent={<ChatTabs value="private" />}
        bodyClassname="p-0"
      >
        <div className="flex items-center gap-4 p-4">
          <SearchBar placeholder="Search users..." searchUrl="/chat/search" />

          <Link
            to={"/chat/dms/create"}
            className="rounded-full bg-white p-1 shadow"
          >
            <Plus className="text-green-400" />
          </Link>
        </div>

        <div className="divide-y divide-solid">
          <DmCard user={placeholderUser} />
          <DmCard user={placeholderUser2} />
          <DmCard user={placeholderUser3} />
        </div>
      </Page>
    </>
  );
}

export default Dms;
