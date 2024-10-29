import { UserCircle } from "lucide-react";
import { ReactNode } from "react";
import FooterNav from "../components/footerNav";
import { Separator } from "./ui/separator";

const Page = ({
  children,
  title,
  leftHeaderButtons,
  rightHeaderButtons,
}: {
  children: ReactNode;
  title: string;
  leftHeaderButtons?: ReactNode;
  rightHeaderButtons?: ReactNode;
}) => {
  return (
    <div className="flex h-full flex-col">
      <div className="sticky top-0 grid grid-cols-3 items-center bg-stone-100 p-4">
        <div>{leftHeaderButtons}</div>
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
