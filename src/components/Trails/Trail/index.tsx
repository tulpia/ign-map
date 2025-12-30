// Utils
import { Group, Image, Text, Stack } from "@mantine/core";
import { IconRoute, IconTrekking, IconTrendingUp } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";

// Interfaces
import { Trail as TrailInterface } from "../../../api/trails/trails";

// Styling
import classes from "./Trail.module.css";

function Trail({ trail }: { trail: TrailInterface }) {
  return (
    <Link to="/trails/$postId" className={classes.link} params={{ postId: String(trail.id) }}>
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
    </Link>
  );
}

export default Trail;
