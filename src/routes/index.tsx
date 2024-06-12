import { createFileRoute } from "@tanstack/react-router";

// Components
import Map from "../components/Map";

export const Route = createFileRoute("/")({
  component: Map,
});
