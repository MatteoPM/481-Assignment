import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useData } from "@/hooks/useData";
import { Link } from "react-router-dom";

const ChatTabs = ({ value }: { value: string }) => {
  const { data } = useData();

  const unreadMessages = data.privateChats
    .filter((dm) => dm.messages.length > 0)
    .filter((dm) => dm.participantIds.includes(data.currentUser!.id))
    .filter((dm) => !dm.seenIds.includes(data.currentUser!.id)).length;

  return (
    <Tabs value={value} className="mt-3">
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="forums" asChild>
          <Link to={"/chat"}>Forums</Link>
        </TabsTrigger>
        <TabsTrigger value="private" asChild>
          <Link to={"/chat/dms"} className="relative">
            <span>Private Messages</span>
            {unreadMessages > 0 && (
              <div className="ml-2 flex size-[18px] items-center justify-center rounded-full bg-red-400/10 text-xs text-red-400">
                {unreadMessages}
              </div>
            )}
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ChatTabs;
