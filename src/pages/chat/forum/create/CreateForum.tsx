import Page from "@/components/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, ChevronsUpDown } from "lucide-react";

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

function CreateForum() {
  const [associatedClub, setAssociatedClub] = useState<null | Group>(null);

  const clubs = groups.filter((group) => !group.isCourse);

  return (
    <>
      <Page title="Create Forum" showBackButton>
        <div className="flex h-full flex-col">
          <div>
            <label className="text-sm font-medium">
              Group<span className="text-red-400">*</span>
            </label>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "mt-2 flex w-full justify-between",
                    !associatedClub && "text-muted-foreground",
                  )}
                >
                  {associatedClub ? (
                    <>
                      <img
                        className="size-[25px] rounded-full object-cover"
                        src={associatedClub.bannerUrl}
                      />
                      <span>{associatedClub.name}</span>
                    </>
                  ) : (
                    "Select Group"
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
                      {clubs.map((club) => (
                        <CommandItem
                          value={club.name}
                          key={club.name}
                          onSelect={() => {
                            setAssociatedClub(club);
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
                              club === associatedClub
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
              Choose a course or club that best aligns with the forum topic.
            </div>
          </div>

          <div className="mt-6">
            <label className="text-sm font-medium">
              Forum Topic<span className="text-red-400">*</span>
            </label>
            <Input
              type="text"
              placeholder="Enter a topic..."
              className="mt-1"
            />
          </div>

          <div className="mt-6">
            <label className="text-sm font-medium">
              Your Message<span className="text-red-400">*</span>
            </label>

            <Textarea placeholder="Write a message..." className="mt-1" />
            {/* <p className="mt-0.5 text-xs font-semibold text-red-400">
              Message is required.
            </p> */}

            <div className="mt-2 text-xs text-muted-foreground">
              Write a message to kickstart the conversation.
            </div>
          </div>

          <Button className="mt-auto w-full">Create</Button>
        </div>
      </Page>
    </>
  );
}

export default CreateForum;
