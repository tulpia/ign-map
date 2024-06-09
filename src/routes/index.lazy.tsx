// Utils
import { createLazyFileRoute } from "@tanstack/react-router";

// Composants
import Map from "../components/Map";

function Index() {
  return <Map />;
}

export const Route = createLazyFileRoute("/")({
  component: () => <Index />,
});
