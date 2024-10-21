import { UserCircle } from "lucide-react";
import Card from "../components/card";
import FooterNav from "../components/footerNav";

function App() {
  return (
    <>
      <div className="h-full flex flex-col">
        <div className="p-4 overflow-y-auto">
          <div className="grid grid-cols-3 items-center">
            <UserCircle className="w-8 h-8" />
            <h1 className="text-center text-stone-700 font-semibold">
              Dashboard
            </h1>
          </div>

          <h2 className="font-semibold text-xl mt-8">Recent Posts</h2>
          <div className="py-2 rounded-md mt-1 flex gap-2 overflow-x-auto scrollbar">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>

          <h2 className="font-semibold text-xl mt-8">Upcoming Events</h2>
          <div className="py-2 rounded-md mt-1 flex gap-2 overflow-x-auto ">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>

          <h2 className="font-semibold text-xl mt-8">Suggested Groups</h2>
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

export default App;
