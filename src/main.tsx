import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./pages/App.tsx";
import Chat from "./pages/chat/Chat.tsx";
import Events from "./pages/events/Events.tsx";
import Group from "./pages/groups/group/Group.tsx";
import Groups from "./pages/groups/Groups.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/groups",
    element: <Groups />,
  },
  {
    path: "/groups/:groupId",
    element: <Group />,
  },
  {
    path: "/events",
    element: <Events />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="grid sm:place-content-center h-full">
      <div className="sm:w-[375px] sm:h-[667px] bg-stone-100 sm:border overflow-hidden sm:rounded-lg sm:shadow">
        <RouterProvider router={router} />
      </div>
    </div>
  </StrictMode>
);
