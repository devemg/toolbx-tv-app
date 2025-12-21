import { ContentPage } from "@/pages/Content";
import { UserPage } from "@/pages/User";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ContentPage />,
  },
  {
    path: "/user",
    element: <UserPage />,
  },
]);

export const RouterAppProvider = () => <RouterProvider router={router} />;
