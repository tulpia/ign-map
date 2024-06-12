// Utils
import { AppShell } from "@mantine/core";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

// Components
import Header from "../components/Header";

import type { AuthContext } from "../auth";

interface MyRouterContext {
  auth: AuthContext;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { desktop: true },
        }}
        padding="0"
      >
        <Header />
        <AppShell.Main
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            height: "100vh",
          }}
        >
          <Outlet />
        </AppShell.Main>
      </AppShell>
      <TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
    </>
  ),
});
