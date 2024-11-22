import { useData } from "@/hooks/useData";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const MessageInput = ({ className }: { className?: string }) => {
  const { data, setData } = useData();
  const { forumId } = useParams();
  const [message, setMessage] = useState("");

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();

    const now = new Date();
    const nowString = now.toISOString();

    setData((draft) => {
      draft.forums
        .find((forum) => forum.id === Number(forumId))!
        .messages.push({
          message,
          user: data.currentUser,
          dateTime: nowString,
        });
    });

    setMessage("");
  };

  return (
    <form
      className={twMerge(
        "relative flex grow items-center rounded bg-stone-200 px-2 py-1.5 text-sm",
        className,
      )}
      onSubmit={sendMessage}
    >
      <input
        type="text"
        placeholder="Message"
        className="w-full bg-transparent placeholder:text-stone-400 focus:outline-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button type="submit" className="cursor-pointer">
        <Send className={cn("text-stone-500", message && "text-primary")} />
      </button>
    </form>
  );
};

export default MessageInput;
