import Page from "@/components/page";
import SubHeader from "@/components/subHeader";
import User from "@/components/user";
import { useData } from "@/hooks/useData";
import { Crown, Users } from "lucide-react";
import { useParams } from "react-router-dom";

function GroupMembers() {
  const { groupId } = useParams();
  const { data } = useData();
  const group = data.groups.find((group) => group.id === Number(groupId));

  if (!group) {
    throw new Error();
  }

  if (!data.currentUser) {
    throw new Error("No user");
  }

  const members = data.users.filter((user) =>
    user.leaderGroupIds.concat(user.memberGroupIds).includes(group.id),
  );
  const nonLeaders = data.users.filter((user) =>
    user.memberGroupIds.includes(group.id),
  );

  return (
    <>
      <Page title={`Members`} showBackButton bodyClassname="flex flex-col">
        <SubHeader
          Icon={Users}
          text={
            <span>
              {group.name} Members{" "}
              <span className="font-normal text-muted-foreground">
                ({members.length})
              </span>
            </span>
          }
          className="mt-0"
        />

        {!group.isCourse && (
          <div className="mt-3 grid grid-cols-2 items-center gap-2 rounded-md scrollbar">
            <User
              user={data.users.find((user) => user.id === group.leaderId)!}
            />
            <Crown className="size-4" />
          </div>
        )}

        {nonLeaders.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-2 rounded-md scrollbar">
            {data.users
              .filter((user) => user.memberGroupIds.includes(group.id))
              .map((user) => (
                <User key={user.id} user={user} />
              ))}
          </div>
        )}
      </Page>
    </>
  );
}

export default GroupMembers;
