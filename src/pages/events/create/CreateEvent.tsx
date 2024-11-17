import Page from "@/components/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import EventFilterCheckbox from "@/pages/events/_components/eventFilterCheckbox";
import { Check, ChevronsUpDown, Edit } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Group, groups } from "@/placeholderData";
import { useState } from "react";

const currentDate = new Date();
const formattedDate = currentDate.toISOString().slice(0, 16);

function CreateEvent() {
  const [hostingClub, setHostingClub] = useState<null | Group>(null);

  const clubs = groups.filter((group) => !group.isCourse);

  return (
    <>
      <Page title="Create Event" showBackButton>
        <div>
          <label className="text-sm font-medium">
            Hosting Club<span className="text-red-400">*</span>
          </label>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "mt-2 flex w-full justify-between",
                  !hostingClub && "text-muted-foreground",
                )}
              >
                {hostingClub ? (
                  <>
                    <img
                      className="size-[25px] rounded-full object-cover"
                      src={hostingClub.bannerUrl}
                    />
                    <span>{hostingClub.name}</span>
                  </>
                ) : (
                  "Select Hosting Club"
                )}
                <ChevronsUpDown className="ml-auto size-[20px] opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Search club..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No club found.</CommandEmpty>
                  <CommandGroup>
                    {clubs
                      .filter((club) => club.leaderId === 0)
                      .map((club) => (
                        <CommandItem
                          value={club.name}
                          key={club.name}
                          onSelect={() => {
                            setHostingClub(club);
                          }}
                        >
                          <img
                            className="size-[25px] rounded-full object-cover"
                            src={club.bannerUrl}
                          />
                          {club.name}
                          <Check
                            className={cn(
                              "ml-auto",
                              club === hostingClub
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <div className="mt-2 text-xs text-muted-foreground">
            You can only create events for clubs you are leading.
          </div>
        </div>

        <div className="mt-6">
          <label className="text-sm font-medium">
            Banner Image<span className="text-red-400">*</span>
          </label>
          <div className="relative mt-2">
            <img
              className="h-[120px] rounded-lg object-cover"
              src="https://assets.ppy.sh/user-cover-presets/4/2fd772ad175c5687370e0aab50799a84adef7d0fff3f97dccfa5c94384ebb8af.jpeg"
            />
            <Button className="absolute right-2 top-2" size={"icon"}>
              <Edit className="size-[20px]" />
            </Button>
          </div>
        </div>

        <div className="mt-6">
          <label className="text-sm font-medium">
            Event Title<span className="text-red-400">*</span>
          </label>
          <Input type="text" placeholder="Enter a title..." className="mt-1" />
        </div>
        {/* <p className="mt-0.5 text-xs font-semibold text-red-400">
          Title is required.
        </p> */}

        <div className="mt-6">
          <label className="text-sm font-medium">
            Description<span className="text-red-400">*</span>
          </label>

          <Textarea placeholder="Describe the event..." className="mt-1" />
        </div>

        <div className="mt-6">
          <label className="text-sm font-medium">
            Starts<span className="text-red-400">*</span>
          </label>

          <Input type="datetime-local" min={formattedDate} className="mt-1" />
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium">
            Ends<span className="text-red-400">*</span>
          </label>

          <Input type="datetime-local" className="mt-1" />
        </div>

        <label className="mt-6 block text-sm font-medium">Categories</label>
        <div className="mt-2 grid grid-cols-2 gap-y-1">
          <EventFilterCheckbox value="Technology" />
          <EventFilterCheckbox value="Art" />
          <EventFilterCheckbox value="Music" />
          <EventFilterCheckbox value="Sports" />
          <EventFilterCheckbox value="Food" />
          <EventFilterCheckbox value="Business" />
        </div>

        <div className="mt-6 flex items-center space-x-2">
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode">Private Event</Label>
        </div>

        <Button className="mt-6 w-full">Create</Button>
      </Page>
    </>
  );
}

export default CreateEvent;
