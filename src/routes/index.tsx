// Utils
import { createFileRoute } from "@tanstack/react-router";
import "leaflet/dist/leaflet.css";

// Components
import Explore from "../components/Explore";

function MapComponent() {
  return <Explore />;
}

export const Route = createFileRoute("/")({
  component: MapComponent,
});
