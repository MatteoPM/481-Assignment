import { UserCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatMessage from "../../../components/chatMessage";
import FooterNav from "../../../components/footerNav";
import MessageInput from "../../../components/messageInput";

export type UserType = {
  avatarUrl: string;
  username: string;
};

export type ChatMessageType = {
  user: UserType;
  date: number;
  message: string;
};

const placeholderUser: UserType = {
  avatarUrl:
    "https://i.pinimg.com/564x/cd/aa/a1/cdaaa1c1b71ab63e8ed183e970f6e61c.jpg",
  username: "John Smeeth",
};

const placeholderUser2: UserType = {
  avatarUrl:
    "https://i.pinimg.com/736x/99/27/90/99279086833d4d0662c19f294035630b.jpg",
  username: "First Last",
};

const placeholderUser3: UserType = {
  avatarUrl:
    "https://wallpapers-clan.com/wp-content/uploads/2023/12/danny-phantom-pfp-33.jpg",
  username: "Danny Phantom",
};

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
  const navigate = useNavigate();

  const [chatMessages, setChatMessages] = useState(initialChatMessages);

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
