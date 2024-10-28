import { UserType } from "@/placeholderData";

const DmCard = ({ user }: { user: UserType }) => {
  return (
    <div className="flex gap-4 p-3">
      <img
        src={user.avatarUrl}
        className="size-[50px] rounded-full object-cover"
      />

      <div>
        <span className="block font-medium">{user.username}</span>
        <p className="text-sm text-stone-500">Information yada yada</p>
      </div>
    </div>
  );
};

export default DmCard;
