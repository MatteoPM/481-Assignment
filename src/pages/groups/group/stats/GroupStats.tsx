import { useUnderDevelopment } from "@/components/contexts/UnderDevelopmentContext";
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
import { Clock, Download } from "lucide-react";
import chartsUrl from "/charts.png";

function GroupStats() {
  const { setShowUnderDevelopment } = useUnderDevelopment();

  return (
    <>
      <Page title="Stats" showBackButton>
        <h2 className="text-lg font-semibold">Stats for Caffeine Crusaders</h2>

        <div className="mt-4 flex gap-2">
          <Select>
            <SelectTrigger className="justify-start bg-white">
              <Clock className="mr-2 size-[18px] shrink-0" />
              <SelectValue
                placeholder="Last 7 Days"
                defaultValue={"light"}
                className="ml-auto"
              />
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
              <Button className="">
                <Download />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Export as...</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShowUnderDevelopment(true)}>
                CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowUnderDevelopment(true)}>
                PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <img src={chartsUrl} className="mt-6" />
      </Page>
    </>
  );
}

export default GroupStats;
