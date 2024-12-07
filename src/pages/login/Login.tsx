import { useUnderDevelopment } from "@/components/contexts/UnderDevelopmentContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useData } from "@/hooks/useData";
import { BASE_URL } from "@/placeholderData";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().min(1, { message: "Email is Required." }).email({
    message: "Email is not valid.",
  }),
});

const Login = () => {
  const { data, setData } = useData();
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { setShowUnderDevelopment } = useUnderDevelopment();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  if (data.currentUser) {
    navigate("/");
  }

  const submitEmail = (values: z.infer<typeof formSchema>) => {
    setData((draft) => {
      const user = draft.users.find((user) => user.email === values.email);

      if (user) {
        draft.currentUser = user;
      } else {
        form.setError("email", {
          message: "Email does not exist. (use one of the emails below)",
        });
      }
    });
  };

  if (step === 1) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">uCal Engage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="mx-auto h-24 w-24">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/University_of_Calgary_coat_of_arms_without_motto_scroll.svg/1200px-University_of_Calgary_coat_of_arms_without_motto_scroll.svg.png"
                alt="University of Calgary logo"
                className="h-full w-full object-contain"
              />
            </div>
            <p className="text-center text-sm text-gray-600">
              Welcome to uCal Engage, the social hub for students of the
              University of Calgary.
            </p>
            <Button className="w-full" onClick={() => setStep(2)}>
              Sign in with UCalgary Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
          <CardFooter className="text-start text-xs text-gray-500">
            <p>
              By signing in, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </CardFooter>
        </Card>
      </div>
    );
  }
  if (step === 2) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="pb-0 text-center">
            <CardTitle className="sr-only"></CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(submitEmail)}>
                <div className="mx-auto">
                  <img
                    src="https://aadcdn.msauthimages.net/dbd5a2dd-jbenuqrdektjjix2vbx-4j3kuj-pick7-wpf7gg39fm/logintenantbranding/0/bannerlogo?ts=638392464903350491"
                    alt="University of Calgary logo"
                    className="w-[150px] object-contain"
                  />

                  <h1 className="mt-4 text-xl font-semibold">Sign in</h1>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="mt-3">
                        {/* <FormLabel>
                          Forum Topic<span className="text-red-400">*</span>
                        </FormLabel> */}
                        <FormControl>
                          <Input
                            placeholder="someone@ucalgary.ca"
                            className=""
                            {...field}
                          />
                        </FormControl>
                        {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    variant={"link"}
                    className="p-0"
                    onClick={() => setShowUnderDevelopment(true)}
                    type="button"
                  >
                    Can't access your account?
                  </Button>
                </div>
                <Button className="w-full" type="submit">
                  Next
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="text-start text-xs text-gray-500">
            <img
              src={`${BASE_URL}/sso2.png`}
              // alt=""
              className="h-full w-full object-contain"
            />
          </CardFooter>
        </Card>

        <div className="mt-4 text-muted-foreground">
          <span>Try:</span>
          <ul className="list-disc">
            {data.users.map((user) => (
              <li key={user.id} className="select-all">
                {user.email}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
};

export default Login;
