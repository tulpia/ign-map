// Utils
import { createFileRoute, redirect } from "@tanstack/react-router";

// Components
import Account from "./Account";

export const Route = createFileRoute("/account/")({
  component: () => <Account />,
  beforeLoad: ({ context }) => {
    if (context.auth.isUserLoading) {
      return;
    }

    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
});
