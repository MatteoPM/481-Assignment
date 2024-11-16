import Page from "@/components/page";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

function CreateGroup() {
  return (
    <>
      <Page title="Create Club" showBackButton>
        <div className="flex h-full flex-col">
          <div className="">
            <label className="text-sm font-medium">
              Banner Image<span className="text-red-400">*</span>
            </label>
            <div className="relative mt-2">
              <img
                className="h-[120px] rounded-lg object-cover"
                src="https://assets.ppy.sh/user-cover-presets/4/2fd772ad175c5687370e0aab50799a84adef7d0fff3f97dccfa5c94384ebb8af.jpeg"
              />
              <Button className="absolute right-2 top-2">
                <Edit />
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <label className="text-sm font-medium">
              Club Name<span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Title"
              className="mt-0.5 w-full rounded bg-stone-200 px-2 py-1.5 text-sm placeholder:text-stone-400"
            />
          </div>
          {/* <p className="mt-0.5 text-xs font-semibold text-red-400">
            Title is required.
          </p> */}

          <div className="mt-3">
            <label className="text-sm font-medium">
              Description<span className="text-red-400">*</span>
            </label>
            <textarea
              placeholder="Description"
              className="mt-0.5 w-full rounded bg-stone-200 px-2 py-1.5 text-sm text-stone-600"
            />
          </div>

          <Button className="mt-auto w-full">Create</Button>
        </div>
      </Page>
    </>
  );
}

export default CreateGroup;
