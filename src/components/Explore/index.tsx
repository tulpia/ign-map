// Utils
import { useEffect, useState } from "react";
import { useMap, Popup } from "react-leaflet";
import { useQuery } from "@tanstack/react-query";
import { Flex, Stack } from "@mantine/core";
import "leaflet/dist/leaflet.css";

// Components
import Map from "../Map";
import Marker from "../Map/Marker";
import Sidebar from "./Sidebar";
import Filters from "./Filters";

// Hooks
import { useQueryMapState } from "../../hooks/useQueryMapState";

// Interfaces
import { Trail } from "../../api/trails/trails";

// Queries
import { trailsQuery } from "../../api/trails/trails.api";

function MapMoveHandler({
  latMin,
  latMax,
  lngMin,
  lngMax,
  setLatMin,
  setLatMax,
  setLngMin,
  setLngMax,
}: {
  latMin: number | null;
  latMax: number | null;
  lngMin: number | null;
  lngMax: number | null;
  setLatMin: (lat: number | null) => void;
  setLatMax: (lat: number | null) => void;
  setLngMin: (lng: number | null) => void;
  setLngMax: (lng: number | null) => void;
}) {
  const map = useMap();

  useEffect(() => {
    // Initialize map view from URL bounds on mount
    if (latMin !== null && latMax !== null && lngMin !== null && lngMax !== null) {
      map.fitBounds([
        [latMin, lngMin],
        [latMax, lngMax],
      ]);
    }
  }, []); // Run once on mount

  useEffect(() => {
    const handleMoveEnd = () => {
      const bounds = map.getBounds();

      setLatMin(bounds.getSouthWest().lat);
      setLatMax(bounds.getNorthEast().lat);
      setLngMin(bounds.getSouthWest().lng);
      setLngMax(bounds.getNorthEast().lng);
    };

    map.on("moveend", handleMoveEnd);

    return () => {
      map.off("moveend", handleMoveEnd);
    };
  }, [map, setLatMin, setLatMax, setLngMin, setLngMax]);

  return null;
}

function Explore() {
  const {
    latMin,
    latMax,
    lngMin,
    lngMax,
    difficulty,
    sort,
    setLatMin,
    setLatMax,
    setLngMin,
    setLngMax,
  } = useQueryMapState();
  const [selectedTrail, setSelectedTrail] = useState<Trail | null>(null);

  const { data: trails, isLoading } = useQuery(
    trailsQuery(
      {
        lat_min: latMin,
        lng_min: lngMin,
        lat_max: latMax,
        lng_max: lngMax,
      },
      {
        difficulty,
      },
      sort
    )
  );

  return (
    <Stack h="100%" mah="100%" justify="flex-start" gap={0}>
      <Filters />

      <Flex flex={1} mih={0}>
        <Sidebar
          trails={trails}
          isLoading={isLoading}
          selectedTrail={selectedTrail}
          setSelectedTrail={setSelectedTrail}
        />
        <Flex direction="column" flex="1" h="100%">
          <Map style={{ flexGrow: 1, minHeight: 0 }}>
            <MapMoveHandler
              latMin={latMin}
              latMax={latMax}
              lngMin={lngMin}
              lngMax={lngMax}
              setLatMin={setLatMin}
              setLatMax={setLatMax}
              setLngMin={setLngMin}
              setLngMax={setLngMax}
            />
            {trails &&
              trails.map((trail) => (
                <Marker
                  key={trail.id}
                  position={[trail.stats.latitude, trail.stats.longitude]}
                  active={selectedTrail?.id === trail.id}
                  onMouseOver={() => {
                    setSelectedTrail(trail);
                  }}
                  onMouseOut={() => {
                    setSelectedTrail(null);
                  }}
                >
                  <Popup>{trail.title}</Popup>
                </Marker>
              ))}
          </Map>
        </Flex>
      </Flex>
    </Stack>
  );
}

export default Explore;
