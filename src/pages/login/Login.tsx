import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useData } from "@/hooks/useData";
import { BASE_URL } from "@/placeholderData";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { data, setData } = useData();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  if (data.currentUser) {
    navigate("/");
  }

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
          <CardHeader className="text-center">
            <CardTitle className="">
              {/* Pretend you're going through the UofC SSO... */}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="mx-auto">
              <img
                src="https://aadcdn.msauthimages.net/dbd5a2dd-jbenuqrdektjjix2vbx-4j3kuj-pick7-wpf7gg39fm/logintenantbranding/0/bannerlogo?ts=638392464903350491"
                alt="University of Calgary logo"
                className="w-[150px] object-contain"
              />

              <h1 className="mt-4 text-xl font-semibold">Sign in</h1>

              <Input
                type="text"
                placeholder="someone@ucalgary.ca"
                className="mt-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button variant={"link"} className="p-0">
                Can't access your account?
              </Button>
            </div>
            <Button
              className="w-full"
              onClick={() => {
                setData((draft) => {
                  const user = draft.users.find((user) => user.email === email);

                  if (user) {
                    draft.currentUser = user;
                  }
                });
              }}
            >
              Next
            </Button>
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
              <li className="select-all">{user.email}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
};

export default Login;
