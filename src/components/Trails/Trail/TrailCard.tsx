// Utils
import { Badge, Card, Group, Image, Text } from "@mantine/core";

// Interfaces
import { Trail } from "../../../api/trails/trails";

function TrailCard({
  trail,
  selectedTrail,
  setSelectedTrail,
}: {
  trail: Trail;
  selectedTrail: Trail | null;
  setSelectedTrail: (trail: Trail | null) => void;
}) {
  const description: string =
    trail.description.length > 100 ? `${trail.description.slice(0, 100)}...` : trail.description;

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      mb="sm"
      onMouseEnter={() => {
        setSelectedTrail(trail);
      }}
      onMouseLeave={() => {
        setSelectedTrail(null);
      }}
      style={{
        cursor: "pointer",
        backgroundColor: selectedTrail?.id === trail.id ? "lightgray" : "white",
      }}
    >
      <Card.Section>
        <Image src={trail.images[0]} height={160} alt="" />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{trail.title}</Text>
        <Badge color="pink">On Sale</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        {description}
      </Text>
    </Card>
  );
}

export default TrailCard;
