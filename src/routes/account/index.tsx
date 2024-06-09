// Utils
import { createFileRoute } from "@tanstack/react-router";

// Hooks
import { useUserGet } from "@/api/users/user.api";

function Account() {
  const { data } = useUserGet();

  return <div>Hello /account/!</div>;
}

export const Route = createFileRoute("/account/")({
  component: () => <Account />,
});
