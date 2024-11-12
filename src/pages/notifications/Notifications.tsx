import NotificationCard from "@/components/notification";
import Page from "@/components/page";
import { notifications } from "@/placeholderData";

function Notifications() {
  return (
    <>
      <Page title="Notifications" showBackButton hideFooter>
        <div className="mt-3 flex flex-col divide-y overflow-hidden rounded-md border bg-white shadow-sm">
          {notifications.map((notification) => (
            <NotificationCard notification={notification} />
          ))}
        </div>
      </Page>
    </>
  );
}

export default Notifications;
