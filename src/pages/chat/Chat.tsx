import Page from "@/components/page";
import SearchBar from "@/components/searchBar";
import { useData } from "@/hooks/useData";
import ChatTabs from "@/pages/chat/_components/chatTabs";
import ForumCard from "@/pages/chat/_components/forumCard";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ChatFilter, {
  clubFilters,
  courseFilters,
} from "./_components/chatFilter";

function Chat() {
  const { data } = useData();
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const [courseFilter, setCourseFilter] =
    useState<(typeof courseFilters)[number]>("All Courses");
  const [clubFilter, setClubFilter] =
    useState<(typeof clubFilters)[number]>("All Clubs");

  const filteredForums = data.forums
    .filter((forum) => {
      const group = data.groups.find((group) => group.id === forum.groupId)!;

      if (group.isCourse) {
        if (courseFilter === "No Courses") {
          return false;
        } else if (courseFilter === "My Courses") {
          return data.currentUser!.memberGroupIds.includes(group.id);
        }
      }

      if (!group.isCourse) {
        if (clubFilter === "No Clubs") {
          return false;
        } else if (clubFilter === "My Clubs") {
          return data
            .currentUser!.leaderGroupIds.concat(
              data.currentUser!.memberGroupIds,
            )
            .includes(group.id);
        }
      }

      return (
        forum.title.toLowerCase().includes(q.toLowerCase()) ||
        group.name.toLowerCase().includes(q.toLowerCase())
      );
    })
    .sort((a, b) =>
      b.messages.at(-1)!.dateTime.localeCompare(a.messages.at(-1)!.dateTime),
    );
  return (
    <>
      <Page title="Chat" headerContent={<ChatTabs value="forums" />}>
        <div className="flex items-center gap-4">
          <SearchBar placeholder="Search groups/topics..." />

          <Link
            to={"/chat/create"}
            className="rounded-full bg-white p-1 shadow"
          >
            <Plus className="text-green-400" />
          </Link>
        </div>

        <ChatFilter
          courseFilter={courseFilter}
          setCourseFilter={setCourseFilter}
          clubFilter={clubFilter}
          setClubFilter={setClubFilter}
        />

        {filteredForums.length > 0 && (
          <>
            <div className="mt-3 flex flex-col divide-y overflow-hidden rounded-md border bg-white shadow-sm">
              {filteredForums.map((forum) => (
                <ForumCard key={forum.id} forum={forum} />
              ))}
            </div>

            {q && (
              <p className="mt-2 text-center text-sm font-medium text-muted-foreground">
                End of results.
              </p>
            )}
          </>
        )}

        {filteredForums.length === 0 && (
          <div className="mt-8 text-center font-semibold text-muted-foreground">
            No forums found. Adjust your search query and/or filters.
          </div>
        )}
      </Page>
    </>
  );
}

export default Chat;
