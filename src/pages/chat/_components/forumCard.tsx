import { Forum, groups } from "@/placeholderData";
import { Link } from "react-router-dom";

const ForumCard = ({ forum }: { forum: Forum }) => {
  const group = groups.find((group) => group.id === forum.groupId)!;

  return (
    <Link
      to={`/chat/${forum.id}`}
      className="flex items-center p-3 transition-colors hover:bg-muted/50"
    >
      <div className="">
        <div>
          <h2 className="text-lg font-semibold leading-none">{forum.title}</h2>
          <p className="text-sm text-muted-foreground">
            in <span className="font-medium text-stone-700">{group.name}</span>
          </p>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>Last reply 1 day ago</span>
        </div>
      </div>
      <img
        className="ml-auto size-[40px] rounded-full object-cover"
        src={group.bannerUrl}
      />
    </Link>
  );
};

export default ForumCard;
