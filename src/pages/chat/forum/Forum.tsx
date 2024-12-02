import Page from "@/components/page";
import SubHeader from "@/components/subHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useData } from "@/hooks/useData";
import { cn } from "@/lib/utils";
import GroupCard from "@/pages/groups/_components/groupCard";
import { CheckCircle, ChevronDown, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatMessage from "../_components/chatMessage";
import MessageInput from "../_components/messageInput";

function Forum() {
  const { data, setData } = useData();
  const { forumId } = useParams();
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const [accordion, setAccordion] = useState("");
  const { toast } = useToast();

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
      const user = draft.users.find(
        (user) => user.id === draft.currentUser!.id,
      )!;
      draft.currentUser = user;

      user.seenForumIds.push(Number(forumId));
    });
  }, [setData, forumId]);

  return (
    <>
      <Page
        title={forum.title}
        showBackButton
        hideFooter
        rightHeaderButtons={
          <Button
            size={"icon"}
            variant={"ghost"}
            className="shrink-0 rounded-full"
            onClick={() => {
              if (accordion === "participants") {
                setAccordion("");
              } else {
                setAccordion("participants");
              }
            }}
          >
            <ChevronDown
              className={cn(
                "transition-transform",
                accordion === "participants" && "rotate-180",
              )}
            />
          </Button>
        }
        headerContent={
          <>
            <Accordion
              type="single"
              collapsible
              value={accordion}
              onValueChange={(value) => setAccordion(value)}
            >
              <AccordionItem value="participants" className="border-b-0">
                <AccordionContent className="p-0">
                  <SubHeader Icon={Users} text="Group" className="mt-2" />

                  <div className="mt-2">
                    <GroupCard group={group} showBorder />
                  </div>

                  {forum.messages[0].user.id === data.currentUser!.id && (
                    <Button
                      className="mt-4 w-full"
                      variant={"destructive"}
                      onClick={() => {
                        navigate(-1);
                        setData((draft) => {
                          const forumId = forum.id;
                          draft.forums = draft.forums.filter(
                            (forum) => forum.id !== forumId,
                          );
                        });
                        toast({
                          title: (
                            <div className="flex items-center gap-2">
                              <CheckCircle className="text-green-400" />
                              <span>Forum deleted successfully.</span>
                            </div>
                          ),
                        });
                      }}
                    >
                      Delete Forum
                    </Button>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </>
        }
      >
        <div className="flex h-full flex-col">
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
