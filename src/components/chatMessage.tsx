import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ChatMessageType } from "@/placeholderData";
import { Ban } from "lucide-react";

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
          <div className="flex flex-col items-center p-8">
            <img
              src={chatMessage.user.avatarUrl}
              className="size-[75px] rounded-full object-cover"
            />

            <div className="text-lg font-medium">
              {chatMessage.user.username}
            </div>

            <div className="mt-10 flex w-full flex-col rounded-lg bg-stone-100">
              <button className="flex items-center justify-between p-4 text-destructive">
                <span className="font-medium">Block User</span>
                <Ban />
              </button>
            </div>
          </div>
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
