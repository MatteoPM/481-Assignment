import { useData } from "@/hooks/useData";
import { Forum } from "@/placeholderData";
import { Link } from "react-router-dom";

const ForumCard = ({ forum }: { forum: Forum }) => {
  const { data } = useData();
  const group = data.groups.find((group) => group.id === forum.groupId)!;

  return (
    <Link
      to={`/chat/${forum.id}`}
      className="flex items-center p-3 transition-colors hover:bg-muted/50"
    >
      <div className="">
        <div>
          <h2 className="text-lg font-semibold leading-none">{forum.title}</h2>
          <p className="text-sm text-muted-foreground">
            in{" "}
            <Link
              to={`/groups/${group.id}`}
              className="font-medium text-primary"
            >
              {group.name}
            </Link>
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
