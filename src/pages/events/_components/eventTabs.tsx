import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useData } from "@/hooks/useData";
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
  const { data } = useData();

  const rsvpdEvents = data.currentUser!.rsvpIds.length;

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
          {rsvpdEvents > 0 && (
            <div className="ml-2 flex size-[18px] items-center justify-center rounded-full bg-foreground/10 text-xs text-foreground">
              {rsvpdEvents}
            </div>
          )}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default EventTabs;
