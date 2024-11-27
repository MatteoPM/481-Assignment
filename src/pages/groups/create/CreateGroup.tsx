import Page from "@/components/page";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useData } from "@/hooks/useData";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  bannerUrl: z.string(),

  name: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
});

function CreateGroup() {
  const navigate = useNavigate();
  const { data, setData } = useData();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      bannerUrl:
        "https://assets.ppy.sh/user-cover-presets/4/2fd772ad175c5687370e0aab50799a84adef7d0fff3f97dccfa5c94384ebb8af.jpeg",
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
      });

      draft.currentUser!.leaderGroupIds.push(id);
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
                      <img
                        className="h-[120px] w-full rounded-lg object-cover"
                        src={field.value}
                      />
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
