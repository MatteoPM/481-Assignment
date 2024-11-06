import GroupCard from "@/components/groupCard";
import Page from "@/components/page";
import SearchBar from "@/components/searchBar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

function Groups() {
  return (
    <>
      <Page title="Groups">
        <div className="flex items-center gap-4">
          <SearchBar
            searchUrl="/groups/search"
            placeholder="Search clubs, groups..."
          />

          <button className="rounded-full bg-white p-1 shadow">
            <Plus className="text-green-400" />
          </button>
        </div>

        <Button variant={"outline"} className="mt-2 w-full">
          Filters
        </Button>

        <h2 className="mt-6 text-xl font-semibold">Courses</h2>
        <div className="mt-3 flex flex-col divide-y overflow-hidden rounded-md border bg-white shadow-sm">
          <GroupCard compact />
          <GroupCard compact />
          <GroupCard compact />
        </div>

        <h2 className="mt-6 text-xl font-semibold">Your Groups</h2>
        <div className="mt-3 flex flex-col divide-y overflow-hidden rounded-md border bg-white shadow-sm">
          <GroupCard compact />
          <GroupCard compact />
        </div>

        <h2 className="mt-8 text-xl font-semibold">Suggested Groups</h2>
        <div className="mt-1 grid snap-x snap-mandatory auto-cols-[300px] grid-flow-col grid-rows-2 gap-2 overflow-x-auto rounded-md py-2">
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
        </div>
      </Page>
    </>
  );
}

export default Groups;
