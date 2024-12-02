import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import FooterNav from "../components/footerNav";
import UserDrawer from "./userDrawer";

const Page = ({
  children,
  title,
  // leftHeaderButtons,
  rightHeaderButtons,
  showBackButton,
  headerContent,
  hideFooter,
  bodyClassname,
}: {
  children: ReactNode;
  title: ReactNode;
  // leftHeaderButtons?: ReactNode;
  rightHeaderButtons?: ReactNode;
  showBackButton?: boolean;
  headerContent?: ReactNode;
  hideFooter?: boolean;
  bodyClassname?: string;
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col">
      <div className="sticky top-0 gap-4 border-b-2 bg-white p-3">
        <div
          className={cn(
            "grid grid-cols-[auto_1fr_auto] items-center gap-3",
            rightHeaderButtons && "grid-cols-[auto_1fr_auto]",
          )}
        >
          <div className="flex min-w-[32px] items-center">
            {showBackButton && (
              <>
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center p-1 text-primary"
                >
                  <ArrowLeft />
                </button>
              </>
            )}
          </div>

          <h1 className="flex items-center justify-center truncate text-center font-semibold text-stone-700">
            <span className="truncate">{title}</span>
            <div className="shrink-0">{rightHeaderButtons}</div>
          </h1>

          <div className="flex items-center justify-self-end">
            {/* {rightHeaderButtons && (
              <>
                <Separator orientation="vertical" className="mx-3 h-6" />
              </>
            )} */}

            <UserDrawer />
          </div>
        </div>

        {headerContent}
      </div>

      <div className={cn("grow overflow-y-auto p-4", bodyClassname)}>
        {children}
      </div>

      {!hideFooter && <FooterNav />}
    </div>
  );
};

export default Page;
