import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./routes";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Page404 } from "../pages/Page404";

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <DashboardLayout />,
    errorElement: <Page404 />,
  },
]);
