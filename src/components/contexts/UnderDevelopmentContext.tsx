import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Button } from "../ui/button";

type DataContextType = {
  showUnderDevelopment: boolean;
  setShowUnderDevelopment: Dispatch<SetStateAction<boolean>>;
};

const UnderDevelopmentContext = createContext<DataContextType | undefined>(
  undefined,
);

export const UnderDevelopmentProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <UnderDevelopmentContext.Provider
      value={{
        showUnderDevelopment: isOpen,
        setShowUnderDevelopment: setIsOpen,
      }}
    >
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Under Development</DialogTitle>
            {/* <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription> */}
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsOpen(false)}>Okay</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </UnderDevelopmentContext.Provider>
  );
};

export const useUnderDevelopment = () => {
  const context = useContext(UnderDevelopmentContext);

  if (!context) {
    throw new Error("useUnderDevelopment must be used within a DataProvider.");
  }

  return context;
};
