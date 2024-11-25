import { useData } from "@/hooks/useData";
import { cn } from "@/lib/utils";
import GroupCard from "@/pages/groups/_components/groupCard";
import { UserType } from "@/placeholderData";
import { Ban, Crown, MessageSquare, School, User } from "lucide-react";
import { Link } from "react-router-dom";
import SubHeader from "./subHeader";

const UserDrawerContent = ({ user }: { user: UserType }) => {
  const { data } = useData();

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
    <div className="p-8">
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

      <div className="mt-10 flex w-full flex-col rounded-lg">
        <Link
          to={"/chat/dms/1"}
          className="flex items-center justify-between rounded-lg bg-stone-100 p-4 text-stone-700"
        >
          <span className="font-medium">Message</span>
          <MessageSquare />
        </Link>
      </div>

      <div className="mt-6 flex w-full flex-col rounded-lg">
        <button className="flex items-center justify-between rounded-lg bg-stone-100 p-4 text-destructive">
          <span className="font-medium">Block User</span>
          <Ban />
        </button>
      </div>
    </div>
  );
};

export default UserDrawerContent;
