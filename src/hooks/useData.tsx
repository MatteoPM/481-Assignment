import { defaultData, Event, Forum, Group, UserType } from "@/placeholderData";
import { createContext, ReactNode, useContext, useEffect } from "react";
import { Updater, useImmer } from "use-immer";

export type Data = {
  currentUser: UserType;
  users: UserType[];
  groups: Group[];
  forums: Forum[];
  events: Event[];
};

type DataContextType = {
  data: Data;
  setData: Updater<Data>;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useImmer<Data>(null!);

  useEffect(() => {
    const storedData = sessionStorage.getItem("appData");
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      setData(defaultData);
    }
  }, [setData]);

  useEffect(() => {
    if (data) {
      sessionStorage.setItem("appData", JSON.stringify(data));
    }
  }, [data]);

  if (!data) {
    return;
  }

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("useData must be used within a DataProvider.");
  }

  return context;
};