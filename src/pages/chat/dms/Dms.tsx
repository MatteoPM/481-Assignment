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
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";

  const hasDms = data.privateChats.some((dm) => {
    return dm.participantIds.includes(data.currentUser!.id);
  });

  const filteredDms = data.privateChats
    .filter((dm) => {
      if (!dm.participantIds.includes(data.currentUser!.id)) {
        return false;
      }

      if (dm.messages.length === 0) {
        return false;
      }

      const participantTitle = dm.participantIds
        .filter((id) => id !== data.currentUser!.id)
        .map((id) =>
          data.users.find((user) => user.id === id)!.username.toLowerCase(),
        )
        .sort()
        .join(", ");

      return participantTitle.includes(q.toLowerCase());
    })
    .sort((a, b) =>
      b.messages.at(-1)!.dateTime.localeCompare(a.messages.at(-1)!.dateTime),
    );

  return (
    <>
      <Page title="Chat" headerContent={<ChatTabs value="private" />}>
        <div className="flex items-center gap-4">
          <SearchBar placeholder="Search names..." />

          <Link
            to={"/chat/dms/create"}
            className="rounded-full bg-white p-1 shadow"
          >
            <Plus className="text-green-400" />
          </Link>
        </div>

        {!hasDms && (
          <div className="mt-8 text-balance text-center font-semibold text-muted-foreground">
            You have no private messages.
          </div>
        )}

        {hasDms && filteredDms.length > 0 && (
          <>
            <div className="mt-3 flex flex-col divide-y overflow-hidden rounded-md border bg-white shadow-sm">
              {filteredDms.map((dm) => {
                const dmId =
                  data.privateChats.find((privateChat) =>
                    hasSameValues(
                      privateChat.participantIds,
                      dm.participantIds,
                    ),
                  )?.id ?? -1;

                return (
                  <Link key={dm.id} to={`/chat/dms/${dmId}`}>
                    <DmCard dm={dm} key={dm.id} />
                  </Link>
                );
              })}
            </div>

            {q && (
              <p className="mt-2 text-center text-sm font-medium text-muted-foreground">
                End of results.
              </p>
            )}
          </>
        )}

        {hasDms && filteredDms.length === 0 && (
          <div className="mt-8 text-balance text-center font-semibold text-muted-foreground">
            No private messages found. Adjust or{" "}
            <button
              className="text-primary"
              onClick={() => {
                searchParams.delete("q");
                setSearchParams(searchParams);
              }}
            >
              reset
            </button>{" "}
            your search query.
          </div>
        )}
      </Page>
    </>
  );
}

export default Dms;
