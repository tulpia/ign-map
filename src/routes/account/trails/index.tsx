// Utils
import { Loader, Image, Group, Text, Button, Stack, Flex } from "@mantine/core";
import { createFileRoute, redirect } from "@tanstack/react-router";
import {
  IconExternalLink,
  IconRoute,
  IconTrash,
  IconTrekking,
  IconTrendingUp,
} from "@tabler/icons-react";

// Requests
import {
  useTrailDelete,
  useUserGetTrails,
} from "../../../api/trails/trails.api";

// Interfaces
import { Trail as TrailInterface } from "../../../api/trails/trails";

// Components
import Account from "../../../components/Account";

// Styling
import classes from "./Trails.module.css";

function Trail() {
  const { data, isLoading } = useUserGetTrails();
  const { mutate, isPending } = useTrailDelete();

  if (isLoading || isPending) {
    return <Loader />;
  }

  if (data && !data.length) {
    return <Text>Aucun trail créé.</Text>;
  }

  return (
    <Stack>
      {data?.map((trail: TrailInterface) => (
        <Flex key={trail.id} justify="space-between" align="center">
          <Group gap="sm">
            <Image src={trail.images[0]} h={100} w={100} radius={5} />
            <Stack justify="center" gap="xs">
              <Text fw={700}>{trail.title}</Text>
              <Group gap="sm">
                <Text className={classes.trailIcon}>
                  <IconRoute />
                  <span>{trail.stats.distance}km</span>
                </Text>
                <Text className={classes.trailIcon}>
                  <IconTrendingUp />
                  <span>{trail.stats.denivele}m</span>
                </Text>
                <Text className={classes.trailIcon}>
                  <IconTrekking />
                  <span>{trail.stats.difficulty}</span>
                </Text>
              </Group>
            </Stack>
          </Group>
          <Group gap="sm">
            <Button variant="outline">
              <IconTrash
                onClick={() => {
                  mutate(trail.id);
                }}
              />
            </Button>
            <Button variant="outline">
              <IconExternalLink />
            </Button>
          </Group>
        </Flex>
      ))}
    </Stack>
  );
}

export const Route = createFileRoute("/account/trails/")({
  component: () => <Account title="Mes trails">{Trail()}</Account>,
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
});
