import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Filter } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Button } from "../../../components/ui/button";

export const courseFilters = [
  "All Courses",
  "My Courses",
  "No Courses",
] as const;
export type CourseFilter = (typeof courseFilters)[number];

export const clubFilters = ["All Clubs", "My Clubs", "No Clubs"] as const;
export type ClubFilter = (typeof clubFilters)[number];

const ChatFilter = ({
  courseFilter,
  setCourseFilter,
  clubFilter,
  setClubFilter,
}: {
  courseFilter: CourseFilter;
  setCourseFilter: Dispatch<SetStateAction<CourseFilter>>;
  clubFilter: ClubFilter;
  setClubFilter: Dispatch<SetStateAction<ClubFilter>>;
}) => {
  const filtersChanged =
    courseFilter !== "All Courses" || clubFilter !== "All Clubs";

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
            <h2 className="font-medium">Courses</h2>
            <RadioGroup
              value={courseFilter}
              onValueChange={(value: CourseFilter) => setCourseFilter(value)}
              className="mt-2"
            >
              {courseFilters.map((courseType) => (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={courseType} id={courseType} />
                  <Label htmlFor={courseType}>{courseType}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <h2 className="font-medium">Clubs</h2>
            <RadioGroup
              value={clubFilter}
              onValueChange={(value: ClubFilter) => setClubFilter(value)}
              className="mt-2"
            >
              {clubFilters.map((clubType) => (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={clubType} id={clubType} />
                  <Label htmlFor={clubType}>{clubType}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        <Button
          variant={"destructive"}
          className="mt-12 w-full"
          onClick={() => {
            setCourseFilter("All Courses");
            setClubFilter("All Clubs");
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
