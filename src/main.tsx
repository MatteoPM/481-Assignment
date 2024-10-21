import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./routes/App.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
