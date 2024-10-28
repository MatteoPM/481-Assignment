import FooterNav from "@/components/footerNav";
import { UserCircle } from "lucide-react";

function GroupStats() {
  return (
    <>
      <div className="flex h-full flex-col">
        <div className="overflow-y-auto p-4">
          <div className="grid grid-cols-3 items-center text-stone-700">
            <UserCircle className="h-8 w-8" />
            <h1 className="text-center font-semibold">Group Stats</h1>
          </div>
        </div>

        <p className="mx-3 mt-12 text-balance text-center text-xl font-semibold text-stone-600">
          I'm lazy so pretend there are fancy charts here
        </p>

        <FooterNav />
      </div>
    </>
  );
}

export default GroupStats;
