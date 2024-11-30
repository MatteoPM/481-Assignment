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
import { Textarea } from "@/components/ui/textarea";
import { useData } from "@/hooks/useData";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  aboutMe: z.string().min(2).max(200),
});

function Settings() {
  const { data } = useData();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      aboutMe: data.currentUser!.bio,
    },
  });

  const onSubmit = () => {};

  return (
    <>
      <Page title="Settings" showBackButton hideFooter bodyClassname="h-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full flex-col"
          >
            <FormField
              control={form.control}
              name="aboutMe"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormLabel>Profile Image</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <img
                        src={data.currentUser?.avatarUrl}
                        className="size-[100px] rounded-full"
                      />
                      <Button
                        size={"icon"}
                        className="absolute bottom-0 right-0 rounded-full"
                      >
                        <Pencil className="size-[20px]" />
                      </Button>
                    </div>
                  </FormControl>
                  {/* <FormDescription>
                    Write a message to kickstart the conversation.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="aboutMe"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel>About Me</FormLabel>
                  <FormControl>
                    <Textarea placeholder="" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    Write a message to kickstart the conversation.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="mt-auto" type="submit">
              Save Changes
            </Button>
          </form>
        </Form>
      </Page>
    </>
  );
}

export default Settings;
