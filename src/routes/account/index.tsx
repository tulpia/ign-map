// Utils
import { createFileRoute, redirect } from "@tanstack/react-router";

function Account() {
  return <div>Hello /account/!</div>;
}

export const Route = createFileRoute("/account/")({
  component: () => <Account />,
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
});
