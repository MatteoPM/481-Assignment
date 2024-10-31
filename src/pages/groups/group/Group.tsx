import Page from "@/components/page";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Card from "../../../components/card";

function Group() {
  return (
    <>
      <Page title="Group Details" showBackButton>
        <img
          className="mt-4 h-[120px] rounded-lg object-cover"
          src="https://assets.ppy.sh/user-cover-presets/4/2fd772ad175c5687370e0aab50799a84adef7d0fff3f97dccfa5c94384ebb8af.jpeg"
        />
        <div className="mt-3 flex items-center gap-3">
          <h1 className="text-lg font-semibold">Group Name</h1>

          <Button className="ml-auto">Join</Button>

          <Button variant={"outline"} asChild>
            <Link to={"/groups/1/stats"}>Stats</Link>
          </Button>
        </div>

        <p className="mt-2 text-stone-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, enim
          ipsum est architecto nisi nesciunt aperiam quisquam officia obcaecati
          adipisci et? Voluptatem nulla, recusandae natus corporis quas hic
          animi ut.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Members</h2>
        <div className="mt-1 flex gap-2 overflow-x-auto rounded-md py-2 scrollbar">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>

        <h2 className="mt-8 text-xl font-semibold">Forums</h2>
        <div className="mt-1 flex gap-2 overflow-x-auto rounded-md py-2">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>

        <h2 className="mt-8 text-xl font-semibold">Events</h2>
        <div className="mt-1 flex gap-2 overflow-x-auto rounded-md py-2">
          <Link to="/events/1" className="text-blue-400">
            <Card />
          </Link>
          <Card />
          <Card />
          <Card />
        </div>
      </Page>
    </>
  );
}

export default Group;
