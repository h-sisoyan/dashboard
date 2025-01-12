import {
  Outlet,
  redirect,
  createRoute,
  createRouter,
  RouterProvider,
  createRootRoute,
} from "@tanstack/react-router";

import { DASHBOARD } from "./constants/paths";
import Dashboard from "./pages/dashboard";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const homeRoute = createRoute({
  path: "/",
  getParentRoute: () => rootRoute,
  loader: () => {
    redirect({ to: `/${DASHBOARD}`, throw: true });
  },
});

const dashboardRoute = createRoute({
  component: Dashboard,
  path: `/${DASHBOARD}`,
  getParentRoute: () => rootRoute,
});

const dashboardWithContactRoute = createRoute({
  component: Dashboard,
  path: `/${DASHBOARD}/$userName`,
  getParentRoute: () => rootRoute,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  dashboardRoute,
  dashboardWithContactRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
