import { createFileRoute } from "@tanstack/react-router";

function RouteComponent() {
  return <div>Hello "/trails/$postId"!</div>;
}

export const Route = createFileRoute("/trails/$postId")({
  component: RouteComponent,
});
