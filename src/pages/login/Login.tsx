import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [step, setStep] = useState(1);
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
                src="/sso1.png"
                alt="University of Calgary logo"
                className="h-full w-full object-contain"
              />
            </div>
            <Button className="w-full" asChild>
              <Link to={"/"}>Next</Link>
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
};

export default Login;
