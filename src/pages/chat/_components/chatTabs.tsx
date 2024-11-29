import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useData } from "@/hooks/useData";
import { Link } from "react-router-dom";

const ChatTabs = ({ value }: { value: string }) => {
  const { data } = useData();

  const hasUnreadMessages = data.privateChats
    .filter((dm) => dm.messages.length > 0)
    .filter((dm) => dm.participantIds.includes(data.currentUser!.id))
    .some((dm) => !dm.seenIds.includes(data.currentUser!.id));

  return (
    <Tabs value={value} className="mt-3">
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="forums" asChild>
          <Link to={"/chat"}>Forums</Link>
        </TabsTrigger>
        <TabsTrigger value="private" asChild>
          <Link to={"/chat/dms"} className="relative">
            <span>Private Messages</span>
            {hasUnreadMessages && (
              <div className="absolute right-[18px] top-[4px] size-[10px] rounded-full bg-red-400"></div>
            )}
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ChatTabs;
