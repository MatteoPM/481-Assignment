import Page from "@/components/page";
import { useData } from "@/hooks/useData";
import ChatMessage from "@/pages/chat/_components/chatMessage";
import MessageInput from "@/pages/chat/_components/messageInput";
import { ChatMessageType } from "@/placeholderData";
import { useState } from "react";

function Dm() {
  const { data } = useData();

  const initialChatMessages: ChatMessageType[] = [
    {
      user: data.users[1],
      dateTime: Date.now(),
      message: "What is love",
    },
    {
      user: data.users[1],
      dateTime: Date.now(),
      message: "Baby don't hurt me",
    },
    {
      user: data.users[1],
      dateTime: Date.now(),
      message: "Don't hurt me",
    },
    {
      user: data.currentUser,
      dateTime: Date.now(),
      message: "No more",
      read: Date.now(),
    },
  ];

  const [chatMessages] = useState(initialChatMessages);

  return (
    <>
      <Page title="Debbie Hopkins" showBackButton hideFooter>
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
