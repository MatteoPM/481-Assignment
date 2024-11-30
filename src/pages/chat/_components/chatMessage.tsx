import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useData } from "@/hooks/useData";
import { cn } from "@/lib/utils";
import { ChatMessageType } from "@/placeholderData";
import { formatRelative } from "date-fns";
import UserDrawerContent from "../../../components/userDrawerContent";

const ChatMessage = ({ chatMessage }: { chatMessage: ChatMessageType }) => {
  const { data } = useData();
  const isOwnMessage = chatMessage.user.id === data.currentUser!.id;

  return (
    <div
      className={cn(
        "flex items-start gap-2",
        isOwnMessage && "flex-row-reverse",
      )}
    >
      <Drawer>
        <DrawerTrigger className="shrink-0 pt-2">
          <img
            src={chatMessage.user.avatarUrl}
            className="size-[50px] rounded-full object-cover shadow"
          />
        </DrawerTrigger>
        <DrawerContent className="">
          <UserDrawerContent user={chatMessage.user} />
        </DrawerContent>
      </Drawer>
      <div>
        <div className="flex items-baseline gap-2">
          <span className="block font-medium">{chatMessage.user.username}</span>
          <span className="text-xs text-stone-500">
            {formatRelative(chatMessage.dateTime, new Date())}
          </span>
        </div>
        <div
          className={cn(
            "mt-1 w-fit rounded-md border bg-white p-2 text-sm text-stone-700",
            isOwnMessage && "ml-auto bg-primary/5",
          )}
        >
          {chatMessage.message}
        </div>
        {/* {chatMessage.read && (
          <div className="mt-0.5 text-end text-xs text-muted-foreground">
            <span className="font-medium">Read</span> 11:28 AM
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ChatMessage;
