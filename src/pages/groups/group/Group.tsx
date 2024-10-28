import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../../../components/card";
import FooterNav from "../../../components/footerNav";

function Group() {
  return (
    <>
      <div className="flex h-full flex-col">
        <div className="overflow-y-auto p-4">
          <div className="grid grid-cols-3 items-center text-stone-700">
            <UserCircle className="h-8 w-8" />
            <h1 className="text-center font-semibold">Group Details</h1>
          </div>

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
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio,
            enim ipsum est architecto nisi nesciunt aperiam quisquam officia
            obcaecati adipisci et? Voluptatem nulla, recusandae natus corporis
            quas hic animi ut.
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
        </div>

        <FooterNav />
      </div>
    </>
  );
}

export default Group;
