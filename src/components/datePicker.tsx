import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const DatePicker = ({
  date,
  setDate,
  className,
}: {
  date?: Date;
  setDate?: Dispatch<SetStateAction<Date | undefined>>;
  className?: string;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "pl-3 text-left font-normal",
            !date && "text-muted-foreground",
            className,
          )}
        >
          {date ? format(date, "PPP") : <span>Enter Date</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01") || true
          }
          initialFocus
          className="w-fit p-0"
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
