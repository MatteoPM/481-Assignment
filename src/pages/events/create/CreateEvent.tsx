import DatePicker from "@/components/datePicker";
import Page from "@/components/page";
import { useState } from "react";
import Card from "../../../components/card";

function CreateEvent() {
  const [date, setDate] = useState<Date>();
  return (
    <>
      <Page title="Create Event">
        <img
          className="mt-4 h-[120px] rounded-lg object-cover"
          src="https://assets.ppy.sh/user-cover-presets/4/2fd772ad175c5687370e0aab50799a84adef7d0fff3f97dccfa5c94384ebb8af.jpeg"
        />

        <div className="mt-2">
          <label className="text-sm font-medium">Title</label>
          <input
            type="text"
            placeholder="Title"
            className="mt-0.5 w-full rounded bg-stone-200 px-2 py-1.5 text-sm placeholder:text-stone-400"
          />
        </div>

        <div className="mt-2">
          <label className="text-sm font-medium">Description</label>
          <textarea
            placeholder="Description"
            className="mt-0.5 w-full rounded bg-stone-200 px-2 py-1.5 text-sm text-stone-600"
          />
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
