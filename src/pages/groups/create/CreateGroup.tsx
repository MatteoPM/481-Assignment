import Page from "@/components/page";
import { Button } from "@/components/ui/button";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useData } from "@/hooks/useData";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  bannerUrl: z.string().min(1, { message: "Banner Image is required." }),
  name: z
    .string()
    .min(5, { message: "Event Title must be at least 5 characters." })
    .max(30, { message: "Event Title must not be longer than 30 characters." }),
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters." })
    .max(50, { message: "Description must not be longer than 50 characters." }),
  isPrivate: z.boolean(),
});

function CreateGroup() {
  const navigate = useNavigate();
  const { data, setData } = useData();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      bannerUrl: "",
      isPrivate: false,
    },
  });

  const createGroup = (values: z.infer<typeof formSchema>) => {
    const id = data.groups.length;

    setData((draft) => {
      draft.groups.push({
        id,
        name: values.name,
        description: values.description,
        bannerUrl: values.bannerUrl,
        leaderId: data.currentUser!.id,
        isPrivate: values.isPrivate,
        applicationIds: [],
      });

      const user = draft.users.find(
        (user) => user.id === draft.currentUser!.id,
      )!;
      draft.currentUser = user;

      user!.leaderGroupIds.push(id);
    });

    navigate(`/groups/${id}`, {
      replace: true,
    });
  };

  return (
    <>
      <Page title="Create Club" showBackButton>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(createGroup)}
            className="flex h-full flex-col"
          >
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
              name="name"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel>
                    Club Name<span className="text-red-400">*</span>
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
              name="isPrivate"
              render={({ field }) => (
                <FormItem className="mb-6 mt-6">
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="mt-0">Private Club</FormLabel>
                  </div>
                  <FormDescription>
                    Private clubs require an application to join. Members,
                    forums, and events in a private club are only visible to its
                    members.
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

export default CreateGroup;
