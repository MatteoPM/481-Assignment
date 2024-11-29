import { useData } from "@/hooks/useData";
import { cn, hasSameValues } from "@/lib/utils";
import GroupCard from "@/pages/groups/_components/groupCard";
import { UserType } from "@/placeholderData";
import {
  Ban,
  BookOpenText,
  Crown,
  MessageSquare,
  School,
  User,
  UserX,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import SubHeader from "./subHeader";

const UserDrawerContent = ({ user }: { user: UserType }) => {
  const { data, setData } = useData();
  const navigate = useNavigate();
  const { groupId } = useParams();

  const courses = user.memberGroupIds
    .map((id) => data.groups.find((group) => group.id === id)!)
    .filter((group) => group.isCourse)
    .sort((a, b) => a.name.localeCompare(b.name));

  const leadingClubs = user.leaderGroupIds
    .map((id) => data.groups.find((group) => group.id === id)!)
    .sort((a, b) => a.name.localeCompare(b.name));

  const memberClubs = user.memberGroupIds
    .map((id) => data.groups.find((group) => group.id === id)!)
    .filter((group) => !group.isCourse)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="max-h-[600px] overflow-auto p-8">
      <img
        src={user.avatarUrl}
        className="mx-auto size-[75px] rounded-full object-cover"
      />

      <div className="text-center text-lg font-medium">{user.username}</div>
      <div className="flex items-center justify-center gap-2">
        <div
          className={cn(
            "size-[8px] rounded-full",
            user.status === "online" && "bg-green-400",
            user.status === "offline" && "bg-stone-400",
            user.status === "away" && "bg-orange-400",
          )}
        ></div>

        <span className="block text-xs font-bold text-muted-foreground">
          {user.status.toUpperCase()}
        </span>
      </div>

      <SubHeader Icon={BookOpenText} text="About Me" />
      <div className="mt-1 text-sm text-gray-500">{user.bio}</div>

      {/* <div className="mt-6 rounded-md bg-stone-100 p-4 text-stone-600">
        {user.bio}
      </div> */}

      <SubHeader Icon={School} text="Courses" />
      {courses.length === 0 && (
        <div className="mb-6 mt-3 text-center font-semibold text-muted-foreground">
          No courses.
        </div>
      )}
      {courses.length > 0 && (
        <div className="mt-3 flex flex-col divide-y overflow-hidden rounded-md border bg-white shadow-sm">
          {courses.map((course) => (
            <GroupCard key={course.id} group={course} compact />
          ))}
        </div>
      )}

      <SubHeader Icon={Crown} text="Leading Clubs" />
      {leadingClubs.length === 0 && (
        <div className="mb-6 mt-3 text-center font-semibold text-muted-foreground">
          Not leading any clubs.
        </div>
      )}
      {leadingClubs.length > 0 && (
        <div className="mt-3 flex flex-col divide-y overflow-hidden rounded-md border bg-white shadow-sm">
          {leadingClubs.map((group) => (
            <GroupCard key={group.id} group={group} compact />
          ))}
        </div>
      )}

      <SubHeader Icon={User} text="Member of Clubs" />
      {memberClubs.length === 0 && (
        <div className="mb-6 mt-3 text-center font-semibold text-muted-foreground">
          Not a member of any clubs.
        </div>
      )}
      {memberClubs.length > 0 && (
        <div className="mt-3 flex flex-col divide-y overflow-hidden rounded-md border bg-white shadow-sm">
          {memberClubs.map((group) => (
            <GroupCard key={group.id} group={group} compact />
          ))}
        </div>
      )}

      {user.id !== data.currentUser!.id && (
        <>
          <div className="mt-10 flex w-full flex-col rounded-lg">
            <button
              className="flex items-center justify-between rounded-lg bg-stone-100 p-4 text-stone-700"
              onClick={() => {
                const ids = [data.currentUser!.id, user.id];

                const existingDm = data.privateChats.find((privateChat) =>
                  hasSameValues(privateChat.participantIds, ids),
                );

                if (existingDm) {
                  navigate(`/chat/dms/${existingDm.id}`, {});
                } else {
                  const id = data.privateChats.length;

                  setData((draft) => {
                    draft.privateChats.push({
                      id,
                      participantIds: ids,
                      messages: [],
                      seenIds: [],
                    });
                  });

                  navigate(`/chat/dms/${id}`, {});
                }
              }}
            >
              <span className="font-medium">Message</span>
              <MessageSquare />
            </button>
          </div>

          {groupId &&
            data.currentUser?.leaderGroupIds.includes(Number(groupId)) && (
              <div className="mt-6 flex w-full flex-col rounded-lg">
                <button
                  className="flex items-center justify-between rounded-lg bg-stone-100 p-4 text-destructive"
                  onClick={() => {
                    const id = user.id;
                    setData((draft) => {
                      const user = draft.users.find((user) => user.id === id)!;
                      user.memberGroupIds = user.memberGroupIds.filter(
                        (id) => id !== Number(groupId),
                      );
                    });
                  }}
                >
                  <span className="font-medium">Remove from Club</span>
                  <UserX />
                </button>
              </div>
            )}

          <div className="mt-6 flex w-full flex-col rounded-lg">
            <button className="flex items-center justify-between rounded-lg bg-stone-100 p-4 text-destructive">
              <span className="font-medium">Block User</span>
              <Ban />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDrawerContent;
