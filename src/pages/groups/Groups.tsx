import Page from "@/components/page";
import SearchBar from "@/components/searchBar";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../../components/card";

function Groups() {
  return (
    <>
      <Page title="Groups">
        <div className="flex items-center gap-4">
          <SearchBar searchUrl="/groups/search" />

          <button className="rounded-full bg-white p-1 shadow">
            <Plus className="text-green-400" />
          </button>
        </div>

        <h2 className="mt-6 text-xl font-semibold">Your Groups</h2>
        <div className="mt-1 flex gap-2 overflow-x-auto rounded-md py-2 scrollbar">
          <Link to="/groups/1" className="text-blue-400">
            <Card />
          </Link>
          <Card />
          <Card />
          <Card />
        </div>

        <h2 className="mt-8 text-xl font-semibold">Suggested Groups</h2>
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

export default Groups;
