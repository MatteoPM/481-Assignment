import Page from "@/components/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import EventFilterCheckbox from "@/pages/events/_components/eventFilterCheckbox";

const currentDate = new Date();
const formattedDate = currentDate.toISOString().slice(0, 16);

function CreateEvent() {
  // const [startTime, endTime] = useState(formattedDate);
  return (
    <>
      <Page title="Create Event" showBackButton>
        <div className="relative">
          <img
            className="h-[120px] rounded-lg object-cover"
            src="https://assets.ppy.sh/user-cover-presets/4/2fd772ad175c5687370e0aab50799a84adef7d0fff3f97dccfa5c94384ebb8af.jpeg"
          />
          <Button className="absolute right-2 top-2">Edit</Button>
        </div>

        <div className="mt-2">
          <label className="text-sm font-medium">
            Title<span className="text-red-400">*</span>
          </label>
          <Input
            type="text"
            placeholder="Enter a title..."
            className="mt-0.5"
          />
        </div>
        <p className="mt-0.5 text-xs font-semibold text-red-400">
          Title is required.
        </p>

        <div className="mt-2">
          <label className="text-sm font-medium">
            Description<span className="text-red-400">*</span>
          </label>

          <Textarea placeholder="Describe the event..." className="mt-0.5" />
        </div>

        <div className="mt-6">
          <label className="text-sm font-medium">
            Starts<span className="text-red-400">*</span>
          </label>

          <Input type="datetime-local" min={formattedDate} />
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium">
            Ends<span className="text-red-400">*</span>
          </label>

          <Input type="datetime-local" />
        </div>

        <label className="mt-6 block text-sm font-medium">Categories</label>
        <div className="mt-2 grid grid-cols-2 gap-y-1">
          <EventFilterCheckbox value="Technology" />
          <EventFilterCheckbox value="Art" />
          <EventFilterCheckbox value="Music" />
          <EventFilterCheckbox value="Sports" />
          <EventFilterCheckbox value="Food" />
          <EventFilterCheckbox value="Business" />
        </div>

        <div className="my-5 flex items-center space-x-2">
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode">Private Event</Label>
        </div>

        <Button className="w-full">Publish</Button>
      </Page>
    </>
  );
}

export default CreateEvent;
