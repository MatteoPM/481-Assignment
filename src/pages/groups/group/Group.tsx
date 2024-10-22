import { UserCircle } from "lucide-react";
import Card from "../../../components/card";
import FooterNav from "../../../components/footerNav";

function Group() {
  return (
    <>
      <div className="h-full flex flex-col">
        <div className="p-4 overflow-y-auto">
          <div className="grid grid-cols-3 items-center text-stone-700">
            <UserCircle className="w-8 h-8" />
            <h1 className="text-center font-semibold">Group Details</h1>
          </div>

          <img
            className="object-cover h-[120px] rounded-lg mt-4"
            src="https://assets.ppy.sh/user-cover-presets/4/2fd772ad175c5687370e0aab50799a84adef7d0fff3f97dccfa5c94384ebb8af.jpeg"
          />
          <div className="flex gap-3 mt-3">
            <h1 className="font-semibold text-lg">Group Name</h1>
            <button className="ml-auto py-1 px-2 bg-blue-500 text-white rounded-md">
              Join
            </button>
          </div>

          <p className="text-stone-600 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio,
            enim ipsum est architecto nisi nesciunt aperiam quisquam officia
            obcaecati adipisci et? Voluptatem nulla, recusandae natus corporis
            quas hic animi ut.
          </p>

          <h2 className="font-semibold text-xl mt-6">Members</h2>
          <div className="py-2 rounded-md mt-1 flex gap-2 overflow-x-auto scrollbar">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>

          <h2 className="font-semibold text-xl mt-8">Forums</h2>
          <div className="py-2 rounded-md mt-1 flex gap-2 overflow-x-auto ">
            <Card />
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
