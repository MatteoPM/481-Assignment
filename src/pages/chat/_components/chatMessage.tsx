import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { ChatMessageType, testUser } from "@/placeholderData";
import UserDrawerContent from "../../../components/userDrawerContent";

const ChatMessage = ({ chatMessage }: { chatMessage: ChatMessageType }) => {
  const isOwnMessage = chatMessage.user.username === testUser.username;

  return (
    <div
      className={cn(
        "flex items-start gap-2",
        isOwnMessage && "flex-row-reverse",
      )}
    >
      <Drawer>
        <DrawerTrigger className="pt-2">
          <img
            src={chatMessage.user.avatarUrl}
            className="size-[50px] rounded-full object-cover"
          />
        </DrawerTrigger>
        <DrawerContent className="">
          <UserDrawerContent user={chatMessage.user} />
        </DrawerContent>
      </Drawer>
      <div>
        <div className="flex items-baseline gap-2">
          <span className="block font-medium">{chatMessage.user.username}</span>
          <span className="text-xs text-stone-500">Today at 8:27 PM</span>
        </div>
        <div
          className={cn(
            "mt-1 rounded-md border bg-white p-2 text-sm text-stone-700",
            isOwnMessage && "bg-primary/5",
          )}
        >
          {chatMessage.message}
        </div>
        {chatMessage.read && (
          <div className="mt-0.5 text-end text-xs text-muted-foreground">
            <span className="font-medium">Read</span> 11:28 AM
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
