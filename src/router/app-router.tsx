import { NotFoundPage, ContentPage, UserPage } from "@/pages";
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
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export const RouterAppProvider = () => <RouterProvider router={router} />;
