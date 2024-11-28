import Page from "@/components/page";
import SubHeader from "@/components/subHeader";
import { useData } from "@/hooks/useData";
import GroupCard from "@/pages/groups/_components/groupCard";
import { Users } from "lucide-react";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ChatMessage from "../_components/chatMessage";
import MessageInput from "../_components/messageInput";

function Forum() {
  const { data, setData } = useData();
  const { forumId } = useParams();
  const ref = useRef<HTMLDivElement>(null);

  const forum = data.forums.find((forum) => forum.id === Number(forumId));

  if (!forum) {
    throw new Error("forum not found");
  }

  const group = data.groups.find((group) => group.id === forum.groupId)!;

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [forum.messages]);

  const sendMessage = (message: string) => {
    const now = new Date();
    const nowString = now.toISOString();

    setData((draft) => {
      draft.forums
        .find((forum) => forum.id === Number(forumId))!
        .messages.push({
          message,
          user: data.currentUser!,
          dateTime: nowString,
        });

      draft.users.forEach((user) => {
        if (user !== data.currentUser) {
          user.seenForumIds = user.seenForumIds.filter((id) => id !== forum.id);
        }
      });
    });
  };

  useEffect(() => {
    setData((draft) => {
      draft.currentUser!.seenForumIds.push(Number(forumId));
    });
  }, [setData, forumId]);

  return (
    <>
      <Page title={forum.title} showBackButton hideFooter>
        <div className="flex h-full flex-col">
          <SubHeader Icon={Users} text="Group" className="mt-0" />

          <div className="mb-4 mt-2 border-b pb-4">
            <GroupCard group={group} />
          </div>

          <div ref={ref} className="flex grow flex-col gap-4 overflow-auto">
            {forum.messages.map((chatMessage) => (
              <ChatMessage chatMessage={chatMessage} />
            ))}
          </div>

          <MessageInput sendMessage={sendMessage} className="mt-4 grow-0" />
        </div>
      </Page>
    </>
  );
}

export default Forum;
