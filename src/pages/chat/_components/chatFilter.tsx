import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Filter } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Button } from "../../../components/ui/button";

export const courseFilters = [
  // "All Courses",
  "My Courses",
  "No Courses",
] as const;
export type CourseFilter = (typeof courseFilters)[number];

export const clubFilters = ["All Clubs", "My Clubs", "No Clubs"] as const;
export type ClubFilter = (typeof clubFilters)[number];

export const involvementFilters = [
  "All Forums",
  "Forums I Participated In",
  "Forums I Started",
] as const;
export type InvolvementFilter = (typeof involvementFilters)[number];

const ChatFilter = ({
  courseFilter,
  setCourseFilter,
  clubFilter,
  setClubFilter,
  involvementFilter,
  setInvolvementFilter,
  resetFilters,
}: {
  courseFilter: CourseFilter;
  setCourseFilter: Dispatch<SetStateAction<CourseFilter>>;
  clubFilter: ClubFilter;
  setClubFilter: Dispatch<SetStateAction<ClubFilter>>;
  involvementFilter: InvolvementFilter;
  setInvolvementFilter: Dispatch<SetStateAction<InvolvementFilter>>;
  resetFilters: () => void;
}) => {
  const filtersChanged =
    courseFilter !== "My Courses" ||
    clubFilter !== "All Clubs" ||
    involvementFilter !== "All Forums";

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "mt-2 w-full",
            filtersChanged && "text-primary hover:text-primary",
          )}
        >
          <Filter className="w-[15px]" />
          <span>Filters</span>
        </Button>
      </DrawerTrigger>

      <DrawerContent className="p-4">
        <h2 className="text-lg font-medium">Forum Filters</h2>
        <div className="mt-4 grid grid-cols-2">
          <div>
            <h2 className="font-medium">Course Forums</h2>
            <RadioGroup
              value={courseFilter}
              onValueChange={(value: CourseFilter) => setCourseFilter(value)}
              className="mt-2"
            >
              {courseFilters.map((courseType) => (
                <div key={courseType} className="flex items-center space-x-2">
                  <RadioGroupItem value={courseType} id={courseType} />
                  <Label htmlFor={courseType}>{courseType}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <h2 className="font-medium">Club Forums</h2>
            <RadioGroup
              value={clubFilter}
              onValueChange={(value: ClubFilter) => setClubFilter(value)}
              className="mt-2"
            >
              {clubFilters.map((clubType) => (
                <div key={clubType} className="flex items-center space-x-2">
                  <RadioGroupItem value={clubType} id={clubType} />
                  <Label htmlFor={clubType}>{clubType}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        <div className="mt-4">
          <h2 className="font-medium">Involvement</h2>
          <RadioGroup
            value={involvementFilter}
            onValueChange={(value: InvolvementFilter) =>
              setInvolvementFilter(value)
            }
            className="mt-2"
          >
            {involvementFilters.map((involvementType) => (
              <div
                key={involvementType}
                className="flex items-center space-x-2"
              >
                <RadioGroupItem value={involvementType} id={involvementType} />
                <Label htmlFor={involvementType}>{involvementType}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Button
          variant={"destructive"}
          className="mt-6 w-full"
          onClick={() => {
            resetFilters();
          }}
          disabled={!filtersChanged}
        >
          <span>Reset Filters</span>
        </Button>
      </DrawerContent>
    </Drawer>
  );
};

export default ChatFilter;
