import { ChevronLeft, User } from "lucide-react";
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
  headerContent,
}: {
  children: ReactNode;
  title: string;
  // leftHeaderButtons?: ReactNode;
  rightHeaderButtons?: ReactNode;
  showBackButton?: boolean;
  headerContent?: ReactNode;
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col">
      <div className="sticky top-0 gap-4 border-b-2 bg-white p-3">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div className="flex items-center">
            {showBackButton && (
              <>
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center p-1 text-blue-400"
                >
                  <ChevronLeft className="-ml-2" />
                </button>
              </>
            )}
          </div>

          <h1 className="truncate text-center font-semibold text-stone-700">
            {title}
          </h1>

          <div className="flex items-center justify-self-end">
            {rightHeaderButtons && (
              <>
                {rightHeaderButtons}
                <Separator orientation="vertical" className="mx-3 h-6" />
              </>
            )}
            <div className="rounded-full border bg-white p-1 text-stone-600">
              <User className="size-7" />
            </div>
          </div>
        </div>

        {headerContent}
      </div>

      <div className="grow overflow-y-auto p-4">{children}</div>

      <FooterNav />
    </div>
  );
};

export default Page;
