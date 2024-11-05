import Page from "@/components/page";
import {
  ChatMessageType,
  placeholderUser,
  placeholderUser2,
  placeholderUser3,
} from "@/placeholderData";
import { useState } from "react";
import ChatMessage from "../../../components/chatMessage";
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
      <Page title="Renewable Energy" showBackButton hideFooter>
        <div className="flex h-full flex-col">
          <div className="flex grow flex-col gap-4 overflow-auto">
            {chatMessages.map((chatMessage) => (
              <ChatMessage chatMessage={chatMessage} />
            ))}
          </div>

          <MessageInput className="grow-0" />
        </div>
      </Page>
    </>
  );
}

export default Forum;
