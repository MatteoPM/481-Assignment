import Page from "@/components/page";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useData } from "@/hooks/useData";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  groupId: z.number(),
  topic: z.string().min(2).max(50),
  message: z.string().min(2).max(200),
});

function CreateForum() {
  const { data, setData } = useData();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialGroupId = searchParams.get("groupId") || null;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groupId: initialGroupId ? Number(initialGroupId) : undefined,
      topic: "",
      message: "",
    },
  });

  const groupId = form.watch("groupId");
  console.log(groupId);

  const group = data.groups.find((group) => group.id === groupId);

  const clubs = data.groups;

  const createForum = (values: z.infer<typeof formSchema>) => {
    const now = new Date();
    const nowString = now.toISOString();

    const id = data.forums.length;

    setData((draft) => {
      draft.forums.push({
        groupId,
        id,
        title: values.topic,
        messages: [
          {
            user: data.currentUser!,
            dateTime: nowString,
            message: values.message,
          },
        ],
      });
    });

    navigate(`/chat/${id}`, {
      replace: true,
    });
  };

  return (
    <>
      <Page title="Create Forum" showBackButton>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(createForum)}
            className="flex h-full flex-col"
          >
            <FormField
              control={form.control}
              name="groupId"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>
                    Group<span className="text-red-400">*</span>
                  </FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "mt-2 flex w-full justify-between",
                            !group && "text-muted-foreground",
                          )}
                        >
                          {group ? (
                            <>
                              <img
                                className="size-[25px] rounded-full object-cover"
                                src={group.bannerUrl}
                              />
                              <span>{group.name}</span>
                            </>
                          ) : (
                            "Select Group"
                          )}
                          <ChevronsUpDown className="ml-auto size-[20px] opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search club..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No group found.</CommandEmpty>
                            <CommandGroup>
                              {clubs.map((club) => (
                                <CommandItem
                                  value={club.name}
                                  key={club.id}
                                  onSelect={() => {
                                    field.onChange(club.id);
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
                                      club.id === group?.id
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
                  </FormControl>
                  <FormDescription>
                    Choose a course or club that best aligns with the forum
                    topic.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel>
                    Forum Topic<span className="text-red-400">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a topic..." {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel>
                    Your Message<span className="text-red-400">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="Write a message..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Write a message to kickstart the conversation.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="mt-auto w-full" type="submit">
              Create
            </Button>
          </form>
        </Form>
      </Page>
    </>
  );
}

export default CreateForum;
