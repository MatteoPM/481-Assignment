import Page from "@/components/page";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useToast } from "@/hooks/use-toast";
import { useData } from "@/hooks/useData";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Check, CheckCircle, ChevronsUpDown, Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";

export const eventCategories = [
  "Arts",
  "Discussion",
  "Education",
  "Film",
  "Food & Drink",
  "Literature",
  "Social",
  "Study Support",
  "Technology",
  "Workshop",
];

const today = new Date();
today.setHours(0, 0, 0, 0); // Ensure the time part is cleared for "current day" comparison.

const formSchema = z
  .object({
    bannerUrl: z.string().min(1, { message: "Banner Image is required." }),
    hostingClub: z.number({ required_error: "Hosting Club is required." }),
    title: z
      .string()
      .min(5, { message: "Event Title must be at least 5 characters." })
      .max(30, {
        message: "Event Title must not be longer than 30 characters.",
      }),
    description: z
      .string()
      .min(20, { message: "Description must be at least 20 characters." })
      .max(50, {
        message: "Description must not be longer than 50 characters.",
      }),
    location: z
      .string()
      .min(5, { message: "Location must be at least 5 characters." })
      .max(30, { message: "Location must not be longer than 30 characters." }),
    startTime: z.string().refine(
      (value) => {
        const date = new Date(value);
        return date > today;
      },
      { message: "Start time must be later than today." },
    ),
    endTime: z.string().refine(
      (value) => {
        const date = new Date(value);
        return date > today;
      },
      { message: "End time must be later than today." },
    ),
    categories: z
      .array(z.string())
      .nonempty({ message: "At least one category must be selected." }), // Require at least one category
  })
  .refine(
    (data) => {
      const start = new Date(data.startTime);
      const end = new Date(data.endTime);
      return end > start;
    },
    { message: "End time must be after start time.", path: ["endTime"] },
  );

function CreateEvent() {
  const { data, setData } = useData();
  const [searchParams] = useSearchParams();
  const initialGroupId = searchParams.get("groupId");
  const navigate = useNavigate();
  const { toast } = useToast();

  const now = new Date();
  now.setDate(now.getDate() + 1);
  const tomorrow = now
    .toISOString()
    .slice(0, now.toISOString().lastIndexOf(":"));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      startTime: "",
      endTime: "",
      hostingClub: initialGroupId ? Number(initialGroupId) : undefined,
      location: "",
      categories: [],
      bannerUrl: "",
    },
  });

  const groupId = form.watch("hostingClub");
  const group = data.groups.find((group) => group.id === groupId);
  const clubs = data.groups.filter((group) => !group.isCourse);

  const createEvent = (values: z.infer<typeof formSchema>) => {
    const {
      bannerUrl,
      categories,
      description,
      endTime,
      hostingClub,
      location,
      startTime,
      title,
    } = values;

    const id = data.events.length;

    setData((draft) => {
      draft.events.push({
        groupId: hostingClub,
        id,
        title,
        description,
        bannerUrl,
        categories,
        location,
        startDateTime: startTime,
        endDateTime: endTime,
      });
    });

    navigate(`/events/${id}`, {
      replace: true,
    });

    toast({
      title: (
        <div className="flex items-center gap-2">
          <CheckCircle className="text-green-400" />
          <span>Event created successfully.</span>
        </div>
      ),
    });
  };

  return (
    <>
      <Page title="Create Event" showBackButton>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(createEvent)}>
            <FormField
              control={form.control}
              name="hostingClub"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>
                    Hosting Club<span className="text-red-400">*</span>
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
                            "Select Hosting Club"
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
                            <CommandEmpty>No club found.</CommandEmpty>
                            <CommandGroup>
                              {clubs
                                .filter(
                                  (club) =>
                                    club.leaderId === data.currentUser!.id,
                                )
                                .map((club) => (
                                  <CommandItem
                                    value={club.name}
                                    key={club.name}
                                    onSelect={() => {
                                      field.onChange(club.id);
                                      // setHostingClub(club.id);
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
                    You can only create events for clubs that you are leading.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bannerUrl"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>
                    Banner Image<span className="text-red-400">*</span>
                  </FormLabel>
                  <FormControl className="">
                    <div className="relative mt-2">
                      {field.value ? (
                        <img
                          className="h-[120px] w-full rounded-lg object-cover"
                          src={field.value}
                        />
                      ) : (
                        <div className="flex h-[120px] w-full items-center justify-center rounded-lg bg-stone-200 object-cover">
                          <Camera className="size-[70px] text-stone-300" />
                        </div>
                      )}
                      <Button
                        className="absolute right-2 top-2 shadow"
                        size={"icon"}
                        type="button"
                        onClick={() => {
                          field.onChange(
                            "https://d7hftxdivxxvm.cloudfront.net/?quality=80&resize_to=width&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2F2RNK1P0BYVrSCZEy_Sd1Ew%252F3417757448_4a6bdf36ce_o.jpg&width=910",
                          );
                        }}
                      >
                        <Edit className="size-[20px]" />
                      </Button>
                    </div>
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
              name="title"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel>
                    Event Title<span className="text-red-400">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a title..." {...field} />
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
              name="description"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel>
                    Description<span className="text-red-400">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter a description..." {...field} />
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
              name="location"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel>
                    Location<span className="text-red-400">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the location..." {...field} />
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
              name="startTime"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel>
                    Starts<span className="text-red-400">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="datetime-local" min={tomorrow} {...field} />
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
              name="endTime"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel>
                    Ends<span className="text-red-400">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
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
              name="categories"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel>
                    Categories<span className="text-red-400">*</span>
                  </FormLabel>

                  <div className="mt-2 grid grid-cols-2 gap-y-1">
                    {eventCategories.map((category) => (
                      <FormControl key={category}>
                        <label className="flex items-center space-x-2">
                          <Checkbox
                            value={category}
                            checked={field.value.includes(category)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([...field.value, category]);
                              } else {
                                field.onChange(
                                  field.value.filter((cat) => cat !== category),
                                );
                              }
                            }}
                            id={category}
                          />

                          <span className="text-sm">{category}</span>
                        </label>
                      </FormControl>
                    ))}
                  </div>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="mt-6 w-full" type="submit">
              Create
            </Button>
          </form>
        </Form>
      </Page>
    </>
  );
}

export default CreateEvent;
