import { UserType } from "@/placeholderData";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Drawer, DrawerContent } from "../ui/drawer";
import UserDrawerContent from "../userDrawerContent";

type DataContextType = {
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const UserDrawerContext = createContext<DataContextType | undefined>(undefined);

export const UserDrawerProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  console.log(user);

  return (
    <UserDrawerContext.Provider value={{ user, setUser, isOpen, setIsOpen }}>
      {children}
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <UserDrawerContent user={user!} />
        </DrawerContent>
      </Drawer>
    </UserDrawerContext.Provider>
  );
};

export const useUserDrawer = () => {
  const context = useContext(UserDrawerContext);

  if (!context) {
    throw new Error("useData must be used within a DataProvider.");
  }

  return context;
};
