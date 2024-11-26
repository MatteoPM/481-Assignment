import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import { Button } from "../../../components/ui/button";
import EventFilterCheckbox from "./eventFilterCheckbox";

const EventFilter = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant={"outline"} className="mt-2 w-full">
          <Filter className="w-[15px]" />
          <span>Filters</span>
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <div className="p-4">
          <h2 className="font-medium">Date</h2>
          <Select>
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
            <EventFilterCheckbox value="Arts" />
            <EventFilterCheckbox value="Discussion" />
            <EventFilterCheckbox value="Film" />
            <EventFilterCheckbox value="Food & Drink" />
            <EventFilterCheckbox value="Literature" />
            <EventFilterCheckbox value="Social" />
            <EventFilterCheckbox value="Study Support" />
          </div>

          <Button variant={"destructive"} className="mt-12 w-full">
            <span>Reset Filters</span>
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default EventFilter;
