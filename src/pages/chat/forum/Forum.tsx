import {
  ChatMessageType,
  placeholderUser,
  placeholderUser2,
  placeholderUser3,
} from "@/placeholderData";
import { UserCircle } from "lucide-react";
import { useState } from "react";
import ChatMessage from "../../../components/chatMessage";
import FooterNav from "../../../components/footerNav";
import MessageInput from "../../../components/messageInput";

const initialChatMessages: ChatMessageType[] = [
  {
    user: placeholderUser,
    date: Date.now(),
    message: "Hello world!",
  },
  {
    user: placeholderUser2,
    date: Date.now(),
    message: "Yo wassup",
  },
  {
    user: placeholderUser3,
    date: Date.now(),
    message: "Testing testing testing testing testing testing",
  },
];

function Forum() {
  const [chatMessages] = useState(initialChatMessages);

  return (
    <>
      <div className="flex h-full flex-col">
        <div className="shrink-0 overflow-y-auto border-b p-4">
          <div className="grid grid-cols-3 items-center text-stone-700">
            <UserCircle className="h-8 w-8" />
            <h1 className="text-center font-semibold">Renewable Energy</h1>
            <div className="justify-self-end"></div>
          </div>
        </div>

        <div className="my-3 flex grow flex-col gap-4 overflow-auto px-3">
          {chatMessages.map((chatMessage) => (
            <ChatMessage chatMessage={chatMessage} />
          ))}
        </div>

        <MessageInput className="mx-2 mb-2 grow-0" />

        <FooterNav />
      </div>
    </>
  );
}

export default Forum;
