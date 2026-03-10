// Utils (external libraries)
import { Card, Group, Skeleton, Stack } from "@mantine/core";

function TrailCardSkeleton() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder mb="sm">
      <Card.Section>
        <Skeleton height={160} />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Skeleton height={20} width="60%" radius="xl" />
        <Skeleton height={20} width="20%" radius="xl" />
      </Group>

      <Stack gap="xs">
        <Skeleton height={15} width="100%" radius="xl" />
        <Skeleton height={15} width="90%" radius="xl" />
        <Skeleton height={15} width="70%" radius="xl" />
      </Stack>
    </Card>
  );
}

TrailCardSkeleton.defaultProps = {};

export default TrailCardSkeleton;
