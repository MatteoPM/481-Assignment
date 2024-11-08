import { UserType } from "@/placeholderData";
import { Link } from "react-router-dom";

const DmCard = ({ user }: { user: UserType }) => {
  return (
    <Link to={"/chat/dms/1"} className="flex gap-4 p-3">
      <img
        src={user.avatarUrl}
        className="size-[50px] rounded-full object-cover"
      />

      <div>
        <span className="block font-medium">{user.username}</span>
        <p className="text-sm text-stone-500">Information yada yada</p>
      </div>
    </Link>
  );
};

export default DmCard;
