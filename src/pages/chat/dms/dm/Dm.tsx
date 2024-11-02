import ChatMessage from "@/components/chatMessage";
import MessageInput from "@/components/messageInput";
import Page from "@/components/page";
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
  },
];

function Dm() {
  const [chatMessages] = useState(initialChatMessages);

  return (
    <>
      <Page title="John Smeeth" showBackButton>
        <div className="flex h-full flex-col">
          <div className="my-3 flex grow flex-col gap-4 overflow-auto px-3">
            {chatMessages.map((chatMessage) => (
              <ChatMessage chatMessage={chatMessage} />
            ))}
          </div>

          <MessageInput className="mx-2 mb-2 grow-0" />
        </div>
      </Page>
    </>
  );
}

export default Dm;
