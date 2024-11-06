import DmCard from "@/components/dmCard";
import Page from "@/components/page";
import SearchBar from "@/components/searchBar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  placeholderUser,
  placeholderUser2,
  placeholderUser3,
} from "@/placeholderData";
import { Send } from "lucide-react";
import { Link } from "react-router-dom";

function CreateDm() {
  return (
    <>
      <Page title="New Message" showBackButton>
        <div className="relative h-full">
          <div className="flex items-center gap-4">
            <SearchBar searchUrl="/chat/search" />
          </div>

          <div className="my-2 divide-y divide-solid">
            <div className="flex items-center gap-2">
              <Link to={"/chat/dms/1"} className="text-blue-400">
                <DmCard user={placeholderUser} />
              </Link>

              <Checkbox className="ml-auto mr-3" />
            </div>
            <div className="flex items-center gap-2">
              <DmCard user={placeholderUser2} />

              <Checkbox className="ml-auto mr-3" />
            </div>
            <div className="flex items-center gap-2">
              <DmCard user={placeholderUser3} />

              <Checkbox className="ml-auto mr-3" />
            </div>
          </div>

          <Button
            className="absolute bottom-0 right-0 flex size-[50px] items-center justify-center rounded-full p-0"
            disabled
          >
            <Send className="relative right-[2px] top-[2px] size-[30px] text-stone-100" />
          </Button>
        </div>
      </Page>
    </>
  );
}

export default CreateDm;
