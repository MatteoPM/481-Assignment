import Page from "@/components/page";
import ChatMessage from "@/pages/chat/_components/chatMessage";
import MessageInput from "@/pages/chat/_components/messageInput";
import { ChatMessageType, placeholderUser, testUser } from "@/placeholderData";
import { useState } from "react";

const initialChatMessages: ChatMessageType[] = [
  {
    user: placeholderUser,
    date: Date.now(),
    message: "What is love",
  },
  {
    user: placeholderUser,
    date: Date.now(),
    message: "Baby don't hurt me",
  },
  {
    user: placeholderUser,
    date: Date.now(),
    message: "Don't hurt me",
  },
  {
    user: testUser,
    date: Date.now(),
    message: "No more",
    read: Date.now(),
  },
];

function Dm() {
  const [chatMessages] = useState(initialChatMessages);

  return (
    <>
      <Page title="John Smeeth" showBackButton hideFooter>
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

export default Dm;
