import Page from "@/components/page";
import SubHeader from "@/components/subHeader";
import { Button } from "@/components/ui/button";
import GroupCard from "@/pages/groups/_components/groupCard";
import {
  BookOpenText,
  Calendar,
  MapPin,
  Tags,
  UserIcon,
  Users,
  X,
} from "lucide-react";
import { useParams } from "react-router-dom";

import { useUnderDevelopment } from "@/components/contexts/UnderDevelopmentContext";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import User from "@/components/user";
import { useData } from "@/hooks/useData";
import { useState } from "react";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});

function Event() {
  const { data, setData } = useData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRSVPConfirmed, setIsRSVPConfirmed] = useState(false);
  const { eventId } = useParams();
  const event = data.events.find((event) => event.id === Number(eventId))!;
  const [showMap, setShowMap] = useState(false);
  const { setShowUnderDevelopment } = useUnderDevelopment();

  const startDate = new Date(event.startDateTime);
  const endDate = new Date(event.endDateTime);

  const group = data.groups.find(
    (group) => group.id === Number(event.groupId),
  )!;

  const rsvpd = data.currentUser!.rsvpIds.includes(event.id);

  const attendees = data.users.filter((user) =>
    user.rsvpIds.includes(event.id),
  );

  const handleRSVP = () => {
    setIsDialogOpen(true);
  };

  const confirmRSVP = () => {
    setData((draft) => {
      const user = draft.users.find(
        (user) => user.id === draft.currentUser!.id,
      )!;
      draft.currentUser = user;

      user.rsvpIds.push(event.id);
    });
    setIsRSVPConfirmed(true);
    setIsDialogOpen(false);
  };

  if (showMap) {
    return (
      <Page
        title={event.title}
        showBackButton
        bodyClassname="p-0 flex flex-col relative"
      >
        <div className="h-full bg-red-400">
          <img
            src="/481-Assignment/map.png"
            className="size-full object-cover"
          />
          <Button
            onClick={() => {
              setShowMap(false);
            }}
            className="absolute right-3 top-3 rounded-full shadow-sm"
            size={"icon"}
          >
            <X />
          </Button>
        </div>
      </Page>
    );
  }

  return (
    <>
      <Page
        title={event.title}
        showBackButton
        bodyClassname="p-0 flex flex-col relative"
      >
        <img
          className="h-[150px] shrink-0 rounded-b-xl object-cover shadow-lg"
          src={event.bannerUrl}
        />

        <div className="p-4">
          <h2 className="mb-4 border-b pb-4 text-2xl font-bold">
            {event.title}
          </h2>

          <SubHeader Icon={Calendar} text="Date and Time (MST)" />
          <div className="mt-1 text-sm text-gray-500">
            <div className="flex items-baseline">
              <span className="w-14 text-xs font-bold">STARTS</span>
              <span>{dateFormatter.format(startDate)}</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-14 text-xs font-bold">ENDS</span>
              <span>{dateFormatter.format(endDate)}</span>
            </div>
          </div>

          <SubHeader Icon={MapPin} text="Location" />

          <div className="mt-1 text-sm text-gray-500">{event.location}</div>
          <button
            className="mt-1.5 flex items-center gap-1 text-sm font-semibold text-primary"
            onClick={() => setShowMap(true)}
          >
            View on map
          </button>

          <SubHeader Icon={BookOpenText} text="Description" />

          <p className="mt-1 text-sm text-gray-500">{event.description}</p>

          <SubHeader Icon={Tags} text="Categories" />

          <div className="mt-2 flex flex-wrap gap-2">
            {event.categories
              .slice()
              .sort()
              .map((perk) => (
                <span
                  key={perk}
                  className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary"
                >
                  {perk}
                </span>
              ))}
          </div>

          <SubHeader Icon={Users} text="Hosting Group" />
          <div className="mt-2">
            <GroupCard group={group} showBorder />
          </div>

          {group.leaderId === data.currentUser!.id && (
            <>
              <div className="mb-4">
                <SubHeader
                  Icon={UserIcon}
                  text={
                    <span>
                      Attendees{" "}
                      <span className="font-normal">({attendees.length})</span>
                    </span>
                  }
                />

                {attendees.length === 0 && (
                  <div className="mb-6 mt-3 text-center font-semibold text-muted-foreground">
                    No one RSVP'd for this event yet.
                  </div>
                )}
                {attendees.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 gap-2 rounded-md scrollbar">
                    {data.users
                      .filter((user) => user.rsvpIds.includes(event.id))
                      .map((user) => (
                        <User key={user.id} user={user} />
                      ))}
                  </div>
                )}
              </div>
            </>
          )}

          {group.leaderId !== data.currentUser!.id && (
            <div className="sticky bottom-4 mt-auto">
              {rsvpd && (
                <Button
                  className="mt-4 w-full"
                  onClick={() => setShowUnderDevelopment(true)}
                  variant={"destructive"}
                >
                  Cancel RSVP
                </Button>
              )}
              {!rsvpd && (
                <Button className="mt-4 w-full" onClick={handleRSVP}>
                  RSVP
                </Button>
              )}
            </div>
          )}

          {group.leaderId === data.currentUser!.id && (
            <div className="sticky bottom-4 mt-auto">
              <Button
                className="mt-4 w-full bg-orange-400 hover:bg-orange-400/90"
                onClick={() => setShowUnderDevelopment(true)}
                variant={"destructive"}
              >
                Edit Event
              </Button>
            </div>
          )}

          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogContent className="max-w-[350px] rounded-lg">
              <AlertDialogHeader>
                <AlertDialogTitle>RSVP for this event?</AlertDialogTitle>
                <AlertDialogDescription></AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => setIsDialogOpen(false)}
                  variant={"outline"}
                >
                  Cancel
                </Button>
                <Button onClick={confirmRSVP}>Confirm</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog open={isRSVPConfirmed} onOpenChange={setIsRSVPConfirmed}>
            <AlertDialogContent className="max-w-[350px] rounded-lg">
              <AlertDialogHeader>
                <AlertDialogTitle>RSVP Confirmed.</AlertDialogTitle>
              </AlertDialogHeader>

              <div>
                <SubHeader Icon={MapPin} text="Location" className="mt-0" />

                <div className="mt-1 text-sm text-gray-500">
                  {event.location}
                </div>

                <SubHeader
                  Icon={Calendar}
                  text="Date and Time (MST)"
                  // className="mt-2"
                />
                <div className="mt-1 text-sm text-gray-500">
                  <div className="flex items-baseline">
                    <span className="w-14 text-xs font-bold">STARTS</span>
                    <span>{dateFormatter.format(startDate)}</span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="w-14 text-xs font-bold">ENDS</span>
                    <span>{dateFormatter.format(endDate)}</span>
                  </div>
                </div>
              </div>

              <AlertDialogFooter>
                <Button onClick={() => setIsRSVPConfirmed(false)}>Done</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </Page>
    </>
  );
}

export default Event;
