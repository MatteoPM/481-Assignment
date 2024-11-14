import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const ChatTabs = ({ value }: { value: string }) => {
  return (
    <Tabs value={value} className="mt-3">
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="forums" asChild>
          <Link to={"/chat"}>Forums</Link>
        </TabsTrigger>
        <TabsTrigger value="private" asChild>
          <Link to={"/chat/dms"}>Private Messages</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ChatTabs;
