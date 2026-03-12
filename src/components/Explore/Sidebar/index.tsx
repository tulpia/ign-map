// Utils
import { Flex, Paper, Stack, Alert, Text } from "@mantine/core";

// Interfaces
import { Trail } from "../../../api/trails/trails";

// Components
import TrailCard from "../../Trails/Trail/TrailCard";
import TrailCardSkeleton from "../../Trails/Trail/TrailCardSkeleton";

function Sidebar({
  trails,
  isLoading,
  selectedTrail,
  setSelectedTrail,
}: {
  trails: Trail[] | undefined;
  isLoading: boolean;
  selectedTrail: Trail | null;
  setSelectedTrail: (trail: Trail | null) => void;
}) {
  return (
    <Flex direction="column" flex="0 0 20%" maw="350px" h="100%">
      <Paper
        style={{
          flexGrow: 1,
          minHeight: 0,
          overflowY: "auto",
        }}
      >
        <Text size="sm" fw={400} mt="md" ml="md" ta="right" pr="md">
          {trails?.length || 0} trails
        </Text>

        <Stack pt="2xl" pb="2xl" pl="md" pr="md">
          {isLoading && (
            <>
              <TrailCardSkeleton />
              <TrailCardSkeleton />
              <TrailCardSkeleton />
            </>
          )}

          {!isLoading && trails && trails.length === 0 && (
            <Alert color="yellow">No trails found in this area.</Alert>
          )}

          {!isLoading &&
            trails &&
            trails.map((trail) => (
              <TrailCard
                key={trail.id}
                trail={trail}
                selectedTrail={selectedTrail}
                oneMouseEnter={() => {
                  setSelectedTrail(trail);
                }}
                onMouseOut={() => {
                  setSelectedTrail(null);
                }}
              />
            ))}
        </Stack>
      </Paper>
    </Flex>
  );
}

export default Sidebar;
