// Utils
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Components
import Map from "../components/Map";

function MapMoveHandler() {
  const map = useMap();

  useEffect(() => {
    const handleMoveEnd = () => {
      console.log("Map moved to:", map.getBounds());
    };

    map.on("moveend", handleMoveEnd);

    return () => {
      map.off("moveend", handleMoveEnd);
    };
  }, [map]);

  return null;
}

function MapComponent() {
  return (
    <Map>
      <MapMoveHandler />
    </Map>
  );
}

export const Route = createFileRoute("/")({
  component: MapComponent,
});
