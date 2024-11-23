import Page from "@/components/page";
import SearchBar from "@/components/searchBar";
import { useData } from "@/hooks/useData";
import { hasSameValues } from "@/lib/utils";
import ChatTabs from "@/pages/chat/_components/chatTabs";
import DmCard from "@/pages/chat/_components/dmCard";
import { Plus } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

function Dms() {
  const { data } = useData();
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";

  const users = data.users.slice(1);
  const filteredUsers = users
    .filter((user) => user.username.toLowerCase().includes(q.toLowerCase()))
    .filter((user) =>
      data.privateChats.some((chat) =>
        hasSameValues(chat.participantIds, [data.currentUser.id, user.id]),
      ),
    );

  return (
    <>
      <Page title="Chat" headerContent={<ChatTabs value="private" />}>
        <div className="flex items-center gap-4">
          <SearchBar placeholder="Search users..." />

          <Link
            to={"/chat/dms/create"}
            className="rounded-full bg-white p-1 shadow"
          >
            <Plus className="text-green-400" />
          </Link>
        </div>

        {filteredUsers.length > 0 && (
          <div className="mt-3 flex flex-col divide-y overflow-hidden rounded-md border bg-white shadow-sm">
            {filteredUsers.map((user) => (
              <DmCard user={user} key={user.username} />
            ))}
          </div>
        )}

        {filteredUsers.length === 0 && (
          <div className="mt-8 text-center font-semibold text-muted-foreground">
            No users found. Adjust your search query.
          </div>
        )}
      </Page>
    </>
  );
}

export default Dms;
