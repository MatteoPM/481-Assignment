import Page from "@/components/page";
import { useData } from "@/hooks/useData";
import ChatMessage from "@/pages/chat/_components/chatMessage";
import MessageInput from "@/pages/chat/_components/messageInput";
import { useParams } from "react-router-dom";

function Dm() {
  const { data, setData } = useData();
  const { dmId } = useParams();
  console.log(dmId);

  const dm = data.privateChats.find(
    (privateChat) => privateChat.id === Number(dmId),
  );

  if (!dm) {
    throw new Error("DM not found");
  }

  const chatMessages = dm?.messages;

  const sendMessage = (message: string) => {
    const now = new Date();
    const nowString = now.toISOString();

    setData((draft) => {
      draft.privateChats
        .find((chat) => chat.id === Number(dmId))!
        .messages.push({
          message,
          user: data.currentUser,
          dateTime: nowString,
        });
    });
  };

  return (
    <>
      <Page title="Debbie Hopkins" showBackButton hideFooter>
        <div className="flex h-full flex-col">
          <div className="flex grow flex-col gap-4 overflow-auto">
            {chatMessages.map((chatMessage) => (
              <ChatMessage chatMessage={chatMessage} />
            ))}
          </div>

          <MessageInput sendMessage={sendMessage} className="grow-0" />
        </div>
      </Page>
    </>
  );
}

export default Dm;
