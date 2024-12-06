import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const BadgeDialog = ({
  label,
  title,
  description,
  className,
}: {
  label: string;
  title: string;
  description: string;
  className?: string;
}) => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <div
            className={cn(
              "mx-auto inline-block rounded-full px-2 py-1 text-xs",
              className,
            )}
          >
            {label}
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Okay</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BadgeDialog;
