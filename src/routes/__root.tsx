import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { NavigationBar } from "../components/NavigationBar";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <NavigationBar />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
