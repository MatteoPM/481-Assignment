import { Notification, NotificationType } from "@/placeholderData";
import { CalendarDays, MessageCircleMore, Users } from "lucide-react";

const getIcon = (type: NotificationType) => {
  switch (type) {
    case "chat":
      return <MessageCircleMore className="h-5 w-5" />;
    case "group":
      return <Users className="h-5 w-5" />;
    case "event":
      return <CalendarDays className="h-5 w-5" />;
  }
};

const NotificationCard = ({ notification }: { notification: Notification }) => {
  return (
    <div
      key={notification.id}
      className="flex items-start space-x-4 rounded-lg bg-card p-4 shadow-sm"
    >
      <div className="rounded-full bg-primary/10 p-2">
        {getIcon(notification.type)}
      </div>
      <div className="flex-grow">
        <h2 className="font-semibold">{notification.title}</h2>
        <p className="text-sm text-muted-foreground">
          {notification.description}
        </p>
        <span className="mt-1 text-xs text-muted-foreground">
          {notification.time}
        </span>
      </div>
    </div>
  );
};

export default NotificationCard;
