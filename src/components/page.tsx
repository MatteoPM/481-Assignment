import { ChevronLeft, UserCircle } from "lucide-react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import FooterNav from "../components/footerNav";
import { Separator } from "./ui/separator";

const Page = ({
  children,
  title,
  // leftHeaderButtons,
  rightHeaderButtons,
  showBackButton,
}: {
  children: ReactNode;
  title: string;
  // leftHeaderButtons?: ReactNode;
  rightHeaderButtons?: ReactNode;
  showBackButton?: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col">
      <div className="sticky top-0 grid grid-cols-3 items-center bg-stone-100 p-4">
        {/* <div>{leftHeaderButtons}</div> */}
        <div className="flex">
          {showBackButton && (
            <>
              <button
                onClick={() => navigate(-1)}
                className="flex items-center p-1 text-blue-400"
              >
                <ChevronLeft />
                <span>Back</span>
              </button>
            </>
          )}
        </div>
        <h1 className="text-center font-semibold text-stone-700">{title}</h1>
        <div className="flex justify-self-end">
          {rightHeaderButtons && (
            <>
              {rightHeaderButtons}
              <Separator orientation="vertical" className="mx-3 h-6" />
            </>
          )}
          <UserCircle className="h-8 w-8" />
        </div>
      </div>

      <div className="grow overflow-y-auto p-4">{children}</div>

      <FooterNav />
    </div>
  );
};

export default Page;
