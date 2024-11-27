import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dispatch, SetStateAction } from "react";
import { useSearchParams } from "react-router-dom";

const EventTabs = ({
  value,
  setValue,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Tabs
      value={value}
      className="mt-3"
      onValueChange={(newValue) => setValue(newValue)}
    >
      <TabsList className="grid grid-cols-2">
        <TabsTrigger
          value="all"
          onClick={() => {
            searchParams.set("type", "all");
            setSearchParams(searchParams);
          }}
        >
          All Events
        </TabsTrigger>
        <TabsTrigger
          value="rsvps"
          onClick={() => {
            searchParams.set("type", "rsvps");
            setSearchParams(searchParams);
          }}
        >
          Your RSVPs
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default EventTabs;
