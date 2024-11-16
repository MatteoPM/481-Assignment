import Page from "@/components/page";
import SubHeader from "@/components/subHeader";
import GroupCard from "@/pages/groups/_components/groupCard";
import { forums, groups } from "@/placeholderData";
import { Users } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ChatMessage from "../_components/chatMessage";
import MessageInput from "../_components/messageInput";

function Forum() {
  const { forumId } = useParams();

  const forum = forums.find((forum) => forum.id === Number(forumId));

  if (!forum) {
    throw new Error("forum not found");
  }

  const group = groups.find((group) => group.id === forum.groupId)!;

  const [chatMessages] = useState(forum.messages);

  return (
    <>
      <Page title={forum.title} showBackButton hideFooter>
        <div className="flex h-full flex-col">
          <SubHeader Icon={Users} text="Group" className="mt-0" />

          <div className="mb-4 mt-2 border-b pb-4">
            <GroupCard group={group} />
          </div>

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
