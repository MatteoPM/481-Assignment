import Page from "@/components/page";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock } from "lucide-react";
import chartsUrl from "/charts.png";

function GroupStats() {
  return (
    <>
      <Page title="Group Stats" showBackButton>
        <h2 className="text-lg font-semibold">Stats for Group Name</h2>

        <div className="mt-4 flex gap-2">
          <Select>
            <SelectTrigger className="bg-white">
              <Clock className="mr-2 size-[18px] shrink-0" />
              <SelectValue placeholder="Time window" defaultValue={"light"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Last 7 Days</SelectItem>
              <SelectItem value="dark">Last 14 Days</SelectItem>
              <SelectItem value="system">Last 30 Days</SelectItem>
              <SelectItem value="5423">Last 3 Months</SelectItem>
              <SelectItem value="54890">Last 12 Months</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"outline"}
                className="bg-green-300 hover:bg-green-300/90"
              >
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Export as...</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>CSV</DropdownMenuItem>
              <DropdownMenuItem>PDF</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className="mt-6">Wowee look at these cool charts</p>
        <img src={chartsUrl} className="" />
      </Page>
    </>
  );
}

export default GroupStats;
