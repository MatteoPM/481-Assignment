import Page from "@/components/page";
import { Button } from "@/components/ui/button";
import Card from "../../../components/card";

function CreateGroup() {
  return (
    <>
      <Page title="Create Group" showBackButton>
        <img
          className="h-[120px] rounded-lg object-cover"
          src="https://assets.ppy.sh/user-cover-presets/4/2fd772ad175c5687370e0aab50799a84adef7d0fff3f97dccfa5c94384ebb8af.jpeg"
        />

        <div className="mt-2">
          <label className="text-sm font-medium">
            Group Name<span className="text-red-400">*</span>
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

        <h2 className="mt-8 text-xl font-semibold">Categories</h2>
        <div className="mt-1 flex gap-2 overflow-x-auto rounded-md py-2">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>

        <Button className="mt-6 w-full">Create</Button>
      </Page>
    </>
  );
}

export default CreateGroup;
