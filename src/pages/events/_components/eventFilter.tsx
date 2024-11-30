import { Checkbox } from "@/components/ui/checkbox";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Filter } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Button } from "../../../components/ui/button";
import { eventCategories } from "../create/CreateEvent";

const EventFilter = ({
  date,
  setDate,
  categories,
  setCategories,
}: {
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
  categories: string[];
  setCategories: Dispatch<SetStateAction<string[]>>;
}) => {
  const isFiltersChanged =
    date !== "any" || categories.length !== eventCategories.length;

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "mt-2 w-full",
            isFiltersChanged && "text-primary hover:text-primary",
          )}
        >
          <Filter className="w-[15px]" />
          <span>Filters</span>
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <div className="p-4">
          <h2 className="text-lg font-medium">Event Filters</h2>

          <h2 className="mt-4 font-medium">Date</h2>
          <Select value={date} onValueChange={(value) => setDate(value)}>
            <SelectTrigger className="mt-2 w-full">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="tomorrow">Tomorrow</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="next-month">Next Month</SelectItem>
            </SelectContent>
          </Select>

          <h2 className="mt-4 font-medium">Categories</h2>
          <div className="mt-2 grid grid-cols-2 gap-y-1">
            {eventCategories.map((category) => (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={categories.includes(category)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setCategories([...categories, category]);
                    } else {
                      setCategories((prev) =>
                        prev.filter((item) => item !== category),
                      );
                    }
                  }}
                />
                <label htmlFor={category} className="text-sm">
                  {category}
                </label>
              </div>
            ))}
          </div>

          <Button
            variant={"destructive"}
            className="mt-6 w-full"
            onClick={() => {
              setDate("any");
              setCategories(eventCategories);
            }}
            disabled={
              date === "any" && categories.length === eventCategories.length
            }
          >
            <span>Reset Filters</span>
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default EventFilter;
