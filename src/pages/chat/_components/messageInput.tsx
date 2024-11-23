import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const MessageInput = ({
  className,
  sendMessage,
}: {
  className?: string;
  sendMessage: (message: string) => void;
}) => {
  const [message, setMessage] = useState("");

  return (
    <form
      className={twMerge(
        "relative flex grow items-center rounded bg-stone-200 px-2 py-1.5 text-sm",
        className,
      )}
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage("");
      }}
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
