import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./pages/App.tsx";
import Chat from "./pages/chat/Chat.tsx";
import CreateDm from "./pages/chat/dms/dm/createDm.tsx";
import Dm from "./pages/chat/dms/dm/Dm.tsx";
import Dms from "./pages/chat/dms/Dms.tsx";
import Forum from "./pages/chat/forum/Forum.tsx";
import ChatSearch from "./pages/chat/search/Search.tsx";
import CreateEvent from "./pages/events/create/CreateEvent.tsx";
import Event from "./pages/events/event/Event.tsx";
import Events from "./pages/events/Events.tsx";
import Rsvps from "./pages/events/rsvps/Rsvps.tsx";
import SearchEvents from "./pages/events/search/searchEvents.tsx";
import Clubs from "./pages/groups/clubs/Clubs.tsx";
import Courses from "./pages/groups/courses/Courses.tsx";
import CreateGroup from "./pages/groups/create/CreateGroup.tsx";
import Group from "./pages/groups/group/Group.tsx";
import GroupStats from "./pages/groups/group/stats/GroupStats.tsx";
import SearchGroups from "./pages/groups/search.tsx/Search.tsx";
import Login from "./pages/login/Login.tsx";
import Notifications from "./pages/notifications/Notifications.tsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/chat",
    element: <Chat />,
    children: [],
  },
  {
    path: "/chat/:forumId",
    element: <Forum />,
  },
  {
    path: "/chat/search",
    element: <ChatSearch />,
  },
  {
    path: "/chat/dms",
    element: <Dms />,
  },
  {
    path: "/chat/dms/create",
    element: <CreateDm />,
  },
  {
    path: "/chat/dms/:dmId",
    element: <Dm />,
  },
  {
    path: "/groups",
    element: <Courses />,
  },
  {
    path: "/groups/clubs",
    element: <Clubs />,
  },
  {
    path: "/groups/create",
    element: <CreateGroup />,
  },
  {
    path: "/groups/clubs/search",
    element: <SearchGroups />,
  },
  {
    path: "/groups/:groupId",
    element: <Group />,
  },
  {
    path: "/groups/:groupId/stats",
    element: <GroupStats />,
  },
  {
    path: "/events",
    element: <Events />,
  },
  {
    path: "/events/search",
    element: <SearchEvents />,
  },
  {
    path: "/events/:eventId",
    element: <Event />,
  },
  {
    path: "/events/create",
    element: <CreateEvent />,
  },
  {
    path: "/events/rsvps",
    element: <Rsvps />,
  },

  {
    path: "/notifications",
    element: <Notifications />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="grid h-full bg-gray-950 sm:place-content-center">
      <div className="overflow-hidden bg-stone-100 sm:h-[667px] sm:w-[375px] sm:rounded-lg sm:border sm:shadow">
        <RouterProvider router={router} />
      </div>
    </div>
  </StrictMode>,
);
