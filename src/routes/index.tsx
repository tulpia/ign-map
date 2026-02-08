// Utils
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useQuery } from "@tanstack/react-query";
import { LatLngBounds } from "leaflet";
import { Alert, Container, Flex, Loader, Paper, Text } from "@mantine/core";

// Components
import Map from "../components/Map";

// Interfaces
import { Trail } from "../api/trails/trails";

// Queries
import { trailsQuery } from "../api/trails/trails.api";
import TrailCard from "../components/Trails/Trail/TrailCard";

function MapMoveHandler({ setBbox }: { setBbox: (bbox: LatLngBounds) => void }) {
  const map = useMap();

  useEffect(() => {
    const handleMoveEnd = () => {
      setBbox(map.getBounds());
    };

    map.on("moveend", handleMoveEnd);

    // Initial load
    handleMoveEnd();

    return () => {
      map.off("moveend", handleMoveEnd);
    };
  }, [map, setBbox]);

  return null;
}

function MapComponent() {
  const [bbox, setBbox] = useState<LatLngBounds | undefined>();
  const [selectedTrail, setSelectedTrail] = useState<Trail | null>(null);

  const { data: trails, isLoading } = useQuery(
    trailsQuery(
      bbox
        ? {
            lat_min: bbox.getSouthWest().lat,
            lng_min: bbox.getSouthWest().lng,
            lat_max: bbox.getNorthEast().lat,
            lng_max: bbox.getNorthEast().lng,
          }
        : undefined
    )
  );

  return (
    <Flex h="100%">
      <Flex direction="column" flex="0 0 25%" h="100%">
        <Paper
          style={{
            flexGrow: 1,
            minHeight: 0,
            overflowY: "auto",
          }}
        >
          <Container>
            {isLoading ? (
              <Loader mt="md" />
            ) : (
              <>
                <Text size="sm" fw={400} mt="md" mb="md">
                  {trails?.length || 0} trails
                </Text>
                {trails && trails.length === 0 && (
                  <Alert color="yellow">No trails found in this area.</Alert>
                )}
                {trails &&
                  trails.map((trail) => (
                    <TrailCard
                      key={trail.id}
                      trail={trail}
                      selectedTrail={selectedTrail}
                      setSelectedTrail={setSelectedTrail}
                    />
                  ))}
              </>
            )}
          </Container>
        </Paper>
      </Flex>
      <Flex direction="column" flex="0 0 75%" h="100%">
        <Map style={{ flexGrow: 1, minHeight: 0 }}>
          <MapMoveHandler setBbox={setBbox} />
          {trails &&
            trails.map((trail) => (
              <Marker
                key={trail.id}
                position={[trail.stats.latitude, trail.stats.longitude]}
                eventHandlers={{
                  mouseover: () => {
                    setSelectedTrail(trail);
                  },
                  mouseout: () => {
                    setSelectedTrail(null);
                  },
                }}
              >
                <Popup>{trail.title}</Popup>
              </Marker>
            ))}
        </Map>
      </Flex>
    </Flex>
  );
}

export const Route = createFileRoute("/")({
  component: MapComponent,
});
