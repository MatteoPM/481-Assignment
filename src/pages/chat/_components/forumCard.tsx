import { Link } from "react-router-dom";

const ForumCard = () => {
  return (
    <Link
      to={"/chat/1"}
      className="flex items-center p-3 transition-colors hover:bg-muted/50"
    >
      <div className="">
        <div>
          <h2 className="text-lg font-semibold leading-none">Topic Name</h2>
          <p className="text-sm text-muted-foreground">
            in <span className="font-medium text-stone-700">Group</span>
          </p>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>Last reply 1 day ago</span>
        </div>
      </div>
      <img
        className="ml-auto size-[40px] rounded-full object-cover"
        src={
          "https://s.brightspace.com/course-images/images/9a6e566b-3c24-4b23-8bf1-d1e90be1a208/tile-high-density-max-size.jpg"
        }
      />
    </Link>
  );
};

export default ForumCard;
