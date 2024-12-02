import { useUnderDevelopment } from "@/components/contexts/UnderDevelopmentContext";
import Page from "@/components/page";
import SubHeader from "@/components/subHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import User from "@/components/user";
import { useData } from "@/hooks/useData";
import { cn, joinNames } from "@/lib/utils";
import ChatMessage from "@/pages/chat/_components/chatMessage";
import MessageInput from "@/pages/chat/_components/messageInput";
import { ChevronDown, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Dm() {
  const { data, setData } = useData();
  const { dmId } = useParams();
  const [accordion, setAccordion] = useState("");
  const { setShowUnderDevelopment } = useUnderDevelopment();

  const dm = data.privateChats.find(
    (privateChat) => privateChat.id === Number(dmId),
  );

  if (!dm) {
    throw new Error("DM not found");
  }

  const participants = dm.participantIds.map(
    (id) => data.users.find((user) => user.id === id)!,
  );

  const otherParticipants = participants.filter(
    (user) => user.id !== data.currentUser!.id,
  );

  const chatMessages = dm?.messages;

  const sendMessage = (message: string) => {
    const now = new Date();
    const nowString = now.toISOString();

    setData((draft) => {
      const privateChat = draft.privateChats.find(
        (chat) => chat.id === Number(dmId),
      )!;

      privateChat.messages.push({
        message,
        user: data.currentUser!,
        dateTime: nowString,
      });

      privateChat.seenIds = [data.currentUser!.id];
    });
  };

  useEffect(() => {
    setData((draft) => {
      const privateChat = draft.privateChats.find(
        (chat) => chat.id === Number(dmId),
      )!;

      privateChat.seenIds.push(data.currentUser!.id);
    });
  }, [setData, data.currentUser, dmId]);

  return (
    <>
      <Page
        title={otherParticipants
          .map((participant) => participant.username)
          .join(", ")}
        showBackButton
        hideFooter
        bodyClassname="pt-0"
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
                  <SubHeader
                    Icon={Users}
                    text={
                      <span>
                        Participants{" "}
                        <span className="font-normal text-muted-foreground">
                          ({participants.length})
                        </span>
                      </span>
                    }
                    className="mt-2"
                  />

                  <div className="mt-3 grid grid-cols-2 gap-2 rounded-md scrollbar">
                    {participants.map((user) => (
                      <User key={user.id} user={user} />
                    ))}
                  </div>
                  <Button
                    className="mt-4 w-full"
                    variant={"destructive"}
                    onClick={() => setShowUnderDevelopment(true)}
                  >
                    Close Conversation
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </>
        }
      >
        <div className="flex h-full flex-col">
          <div className="mb-4 flex grow flex-col gap-4 overflow-auto">
            <p className="mb-4 mt-2 text-balance text-center text-sm text-muted-foreground">
              This is the start of your message history with{" "}
              <span className="font-medium">
                {joinNames(
                  otherParticipants.map((participant) => participant.username),
                )}
              </span>
              .
            </p>
            {chatMessages.map((chatMessage) => (
              <ChatMessage
                key={chatMessage.dateTime}
                chatMessage={chatMessage}
              />
            ))}
          </div>

          <MessageInput sendMessage={sendMessage} className="grow-0" />
        </div>
      </Page>
    </>
  );
}

export default Dm;
