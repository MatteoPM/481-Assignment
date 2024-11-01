import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ChatMessageType } from "@/placeholderData";
import UserDrawerContent from "./userDrawerContent";

const ChatMessage = ({ chatMessage }: { chatMessage: ChatMessageType }) => {
  return (
    <div className="flex gap-2">
      <Drawer>
        <DrawerTrigger>
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
        <div className="mt-1 rounded-md border bg-white p-2 text-sm text-stone-700">
          {chatMessage.message}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
