import { Checkbox } from "@/components/ui/checkbox";

const EventFilterCheckbox = ({ value }: { value: string }) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={value} />
      <label htmlFor={value} className="text-sm">
        {value}
      </label>
    </div>
  );
};

export default EventFilterCheckbox;
