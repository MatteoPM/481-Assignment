import { Send } from "lucide-react";
import { twMerge } from "tailwind-merge";

const MessageInput = ({ className }: { className?: string }) => {
  return (
    <div
      className={twMerge(
        "relative flex grow items-center rounded bg-stone-200 px-2 py-1.5 text-sm",
        className,
      )}
    >
      <input
        type="text"
        placeholder="Message"
        className="w-full bg-transparent placeholder:text-stone-400 focus:outline-none"
        // value={query}
        // onChange={(e) => setQuery(e.target.value)}
      />

      <button type="submit" className="cursor-pointer">
        <Send className="mr-2 text-stone-500" />
      </button>
    </div>
  );
};

export default MessageInput;
