import DatePicker from "@/components/datePicker";
import Page from "@/components/page";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import Card from "../../../components/card";

function CreateEvent() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <>
      <Page title="Create Event" showBackButton>
        <img
          className="h-[120px] rounded-lg object-cover"
          src="https://assets.ppy.sh/user-cover-presets/4/2fd772ad175c5687370e0aab50799a84adef7d0fff3f97dccfa5c94384ebb8af.jpeg"
        />

        <div className="mt-2">
          <label className="text-sm font-medium">
            Title<span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="Title"
            className="mt-0.5 w-full rounded bg-stone-200 px-2 py-1.5 text-sm placeholder:text-stone-400"
          />
        </div>
        <p className="mt-0.5 text-xs font-semibold text-red-400">
          Title is required.
        </p>

        <div className="mt-2">
          <label className="text-sm font-medium">
            Description<span className="text-red-400">*</span>
          </label>
          <textarea
            placeholder="Description"
            className="mt-0.5 w-full rounded bg-stone-200 px-2 py-1.5 text-sm text-stone-600"
          />
        </div>

        <div className="my-5 flex items-center space-x-2">
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode">Private Event</Label>
        </div>

        <div className="my-5 flex gap-6">
          <DatePicker date={date} setDate={setDate} className="grow" />
          <button className="ml-auto rounded-md bg-blue-500 px-2 py-1 text-white">
            Publish
          </button>
        </div>

        <h2 className="mt-8 text-xl font-semibold">Categories</h2>
        <div className="mt-1 flex gap-2 overflow-x-auto rounded-md py-2">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </Page>
    </>
  );
}

export default CreateEvent;
