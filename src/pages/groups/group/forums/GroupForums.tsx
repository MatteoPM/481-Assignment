import Page from "@/components/page";
import SubHeader from "@/components/subHeader";
import { useData } from "@/hooks/useData";
import ForumCard from "@/pages/chat/_components/forumCard";
import { MessageSquareText } from "lucide-react";
import { useParams } from "react-router-dom";

function GroupForums() {
  const { groupId } = useParams();
  const { data } = useData();
  const group = data.groups.find((group) => group.id === Number(groupId));

  if (!group) {
    throw new Error();
  }

  const forums = data.forums.filter((forum) => forum.groupId === group.id);

  return (
    <>
      <Page title={`Forums`} showBackButton bodyClassname="flex flex-col">
        <SubHeader
          Icon={MessageSquareText}
          text={
            <span>
              {group.name} Forums{" "}
              <span className="font-normal text-muted-foreground">
                ({forums.length})
              </span>
            </span>
          }
          className="mt-0"
        />

        {forums.length > 0 && (
          <div className="mt-3 flex flex-col divide-y overflow-hidden rounded-md border bg-white shadow-sm">
            {forums.map((forum) => (
              <ForumCard key={forum.id} forum={forum} />
            ))}
          </div>
        )}

        {forums.length === 0 && (
          <div className="mb-6 mt-3 text-center font-semibold text-muted-foreground">
            No forums exist.
          </div>
        )}
      </Page>
    </>
  );
}

export default GroupForums;
