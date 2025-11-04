// Utils
import { createFileRoute, redirect } from "@tanstack/react-router";

// Components
import Account from "../../../components/Account";

function Trail() {
  return <p>Test</p>;
}

export const Route = createFileRoute("/account/trail/")({
  component: () => <Account title="Ajouter un trail">{Trail()}</Account>,
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
});
