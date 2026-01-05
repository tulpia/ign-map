// Utils (external libraries)
import { AppShell } from "@mantine/core";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

// Components
import Header from "../components/Header";

// Providers
import { AuthProvider } from "../providers/auth/AuthProvider";

// Interfaces (types)

// Api / services
import { queryClient } from "../api/client";
import { getUser } from "../api/users/user.service";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  loader: async () => {
    // Pre-fetch the current user into the react-query cache so AuthProvider doesn't trigger
    // an extra network request on mount. If the request fails, explicitly set user to null.
    try {
      await queryClient.fetchQuery({ queryKey: ["user"], queryFn: getUser });
    } catch {
      // Explicitly set user to null so subsequent auth checks don't retry
      queryClient.setQueryData(["user"], null);
    }

    return null;
  },
  component: () => (
    <AuthProvider>
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
    </AuthProvider>
  ),
});
