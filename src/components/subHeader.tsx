import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

const SubHeader = ({
  Icon,
  text,
  className,
}: {
  Icon: LucideIcon;
  text: ReactNode;
  className?: string;
}) => {
  return (
    <h3 className={cn("mt-4 flex items-center font-medium", className)}>
      <Icon className="mr-2 h-4 w-4" />
      <span className="">{text}</span>
    </h3>
  );
};

export default SubHeader;
