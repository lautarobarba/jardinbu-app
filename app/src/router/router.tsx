import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./routes";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Page404 } from "../pages/Page404";
import { Dashboard } from "../pages/Dashboard";
import { SpeciesPage } from "../pages/SpeciesPage";
import { FamiliesPage } from "../pages/FamiliesPage";
import { AuthLayout } from "../layouts/AuthLayout";
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/LoginPage";
import { TestPage } from "../pages/TestPage";

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
    children: [
      {
        // path: '/app',
        path: ROUTES.DASHBOARD,
        element: <Dashboard />,
      },
      {
        // path: '/app/family',
        path: ROUTES.FAMILY,
        element: <FamiliesPage />,
      },
      {
        // path: '/app/especies',
        path: ROUTES.SPECIES,
        element: <SpeciesPage />,
      },
      {
        // Si no encuentro ninguna de las rutas anteriores entonces renderizo 404
        // path: '/app/*',
        path: ROUTES.ELSE,
        element: <Page404 />,
      },
    ],
  },
  {
    // path: '/app/auth',
    path: ROUTES.AUTH,
    element: <AuthLayout />,
    children: [
      {
        // path: '/app/auth/register',
        path: ROUTES.REGISTER,
        element: <RegisterPage />,
      },
      {
        // path: '/app/auth/login',
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        // Si no encuentro ninguna de las rutas anteriores entonces renderizo 404
        // path: '/app/auth/*',
        path: ROUTES.ELSE,
        element: <Page404 />,
      },
    ],
  },
  {
    // path: '/test',
    path: ROUTES.TEST,
    element: <TestPage />,
  },
  {
    // Si no encuentro ninguna de las rutas anteriores entonces renderizo 404
    // path: '/*',
    path: ROUTES.ELSE,
    element: <Page404 />,
  },
]);
