import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./routes";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Page404 } from "../pages/Page404";
import { Dashboard } from "../pages/Dashboard";
import { SpeciesPage } from "../pages/SpeciesPage";

export const router = createBrowserRouter([
  {
    // path: '/',
    path: ROUTES.ROOT,
    element: <Page404 />,
  },
  {
    // path: '/app',
    path: ROUTES.APP,
    element: <DashboardLayout />,
    errorElement: <Page404 />,
    children: [
      {
        // path: '/app',
        path: ROUTES.DASHBOARD,
        element: <Dashboard />,
      },
      {
        // path: '/app/especies',
        path: ROUTES.SPECIES,
        element: <SpeciesPage />,
      },
    ],
  },
]);
