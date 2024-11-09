import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Filter } from "lucide-react";
import EventFilterCheckbox from "./eventFilterCheckbox";
import { Button } from "./ui/button";

const EventFilter = () => {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant={"outline"} className="mt-2 w-full">
          <Filter className="w-[15px]" />
          <span>Filters</span>
        </Button>
      </DrawerTrigger>

      <DrawerContent className="left-0 right-auto top-0 flex w-[300px] flex-col rounded-r-none p-4">
        <h2 className="font-medium">Themes</h2>
        <div className="mt-2 grid grid-cols-2 gap-y-1">
          <EventFilterCheckbox value="Technology" />
          <EventFilterCheckbox value="Art" />
          <EventFilterCheckbox value="Music" />
          <EventFilterCheckbox value="Sports" />
          <EventFilterCheckbox value="Food" />
          <EventFilterCheckbox value="Business" />
        </div>

        <h2 className="mt-4 font-medium">Categories</h2>
        <div className="mt-2 grid grid-cols-2 gap-y-1">
          <EventFilterCheckbox value="Meetup" />
          <EventFilterCheckbox value="Conference" />
          <EventFilterCheckbox value="Workshop" />
          <EventFilterCheckbox value="Networking" />
        </div>

        <h2 className="mt-4 font-medium">Perks</h2>
        <div className="mt-2 grid grid-cols-2 gap-y-1">
          <EventFilterCheckbox value="Free Food" />
          <EventFilterCheckbox value="Free Drinks" />
          <EventFilterCheckbox value="Swag" />
          <EventFilterCheckbox value="Networking Opportunities" />
        </div>

        <Button variant={"destructive"} className="mt-auto">
          <span>Reset Filters</span>
        </Button>
      </DrawerContent>
    </Drawer>
  );
};

export default EventFilter;