import Page from "@/components/page";
import SearchBar from "@/components/searchBar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useData } from "@/hooks/useData";
import DmCard from "@/pages/chat/_components/dmCard";
import { Send } from "lucide-react";
import { useSearchParams } from "react-router-dom";

function CreateDm() {
  const { data } = useData();
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const users = data.users.slice(1);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <>
      <Page title="New Message" showBackButton bodyClassname="p-0">
        <div className="relative h-full">
          <div className="flex items-center gap-4 p-4">
            <SearchBar placeholder="Search users..." />
          </div>

          {filteredUsers.length > 0 && (
            <div className="divide-y divide-solid">
              {filteredUsers.map((user) => (
                <div className="flex items-center gap-2">
                  <DmCard user={user} key={user.username} className="pr-0" />

                  <Checkbox className="ml-auto mr-3" />
                </div>
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
            disabled
          >
            <Send className="relative right-[2px] top-[2px] size-[30px] text-stone-100" />
          </Button>
        </div>
      </Page>
    </>
  );
}

export default CreateDm;
