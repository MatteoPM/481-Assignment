import Page from "@/components/page";
import SearchBar from "@/components/searchBar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useData } from "@/hooks/useData";
import { hasSameValues } from "@/lib/utils";
import { RotateCw, Send } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useImmer } from "use-immer";

function CreateDm() {
  const { data, setData } = useData();
  const [searchParams] = useSearchParams();
  const [ids, setIds] = useImmer<number[]>([]);
  const q = searchParams.get("q") || "";
  const users = data.users.filter((user) => user.id !== data.currentUser!.id);
  const navigate = useNavigate();

  const filteredUsers = users
    .filter((user) => user.username.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => a.username.localeCompare(b.username));

  return (
    <>
      <Page title="Send Message" showBackButton bodyClassname="p-0">
        <div className="relative h-full">
          <div className="flex items-center gap-4 p-4">
            <SearchBar placeholder="Search users..." />
          </div>

          <div className="flex items-center gap-4 px-4 text-sm text-muted-foreground">
            <Button
              size={"icon"}
              variant={"destructive"}
              disabled={ids.length === 0}
              className="size-[30px]"
              onClick={() => setIds([])}
            >
              <RotateCw className="size-[18px]" />
            </Button>
            <span>
              {ids.length} user{ids.length !== 1 ? "s" : ""} selected
            </span>
          </div>

          {filteredUsers.length > 0 && (
            <div className="mt-4 divide-y divide-solid border-y">
              {filteredUsers.map((user) => (
                <label
                  key={user.id}
                  className="flex items-center gap-2 bg-white"
                  htmlFor={`dm-${user.id}`}
                >
                  <div className="flex items-center gap-2 p-3 transition-colors">
                    <img
                      src={user.avatarUrl}
                      className="size-[40px] rounded-full object-cover shadow-sm"
                    />

                    <div>
                      <span className="block font-medium">{user.username}</span>
                    </div>
                  </div>

                  <Checkbox
                    className="ml-auto mr-3"
                    id={`dm-${user.id}`}
                    checked={ids.includes(user.id)}
                    onCheckedChange={(checked) => {
                      setIds((draft) => {
                        if (checked) {
                          draft.push(user.id);
                        } else {
                          return draft.filter((id) => id !== user.id);
                        }
                      });
                    }}
                  />
                </label>
              ))}
            </div>
          )}
          {filteredUsers.length === 0 && (
            <div className="mt-8 text-center font-semibold text-muted-foreground">
              No users found. Adjust your search query.
            </div>
          )}

          <Button
            className="absolute bottom-4 right-4 flex size-[50px] items-center justify-center rounded-full p-0"
            disabled={ids.length === 0}
            onClick={() => {
              const allIds = [...ids, data.currentUser!.id];

              const existingDm = data.privateChats.find((privateChat) =>
                hasSameValues(privateChat.participantIds, allIds),
              );

              if (existingDm) {
                navigate(`/chat/dms/${existingDm.id}`, {
                  replace: true,
                });
              } else {
                const id = data.privateChats.length;

                setData((draft) => {
                  draft.privateChats.push({
                    id,
                    participantIds: allIds,
                    messages: [],
                    seenIds: [],
                  });
                });

                navigate(`/chat/dms/${id}`, {
                  replace: true,
                });
              }
            }}
          >
            <Send className="relative right-[2px] top-[2px] size-[25px] text-stone-100" />
          </Button>
        </div>
      </Page>
    </>
  );
}

export default CreateDm;
