// Utils (external libraries)
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Loader, Group, Text, Button, Stack, Flex } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";

// Components
import Account from "../../../components/Account";
import Trail from "../../../components/Trails/Trail";

// Interfaces (types)
import { Trail as TrailInterface } from "../../../api/trails/trails";

// Api / hooks / services
import { queryClient } from "../../../api/client";
import { getUser } from "../../../api/users/user.service";
import { useTrailDelete, userTrailsQuery } from "../../../api/trails/trails.api";

function Trails() {
  const { data } = useSuspenseQuery(userTrailsQuery());
  const { mutate, isPending } = useTrailDelete();

  if (isPending) {
    return <Loader />;
  }

  if (data && !data.length) {
    return <Text>Aucun trail créé.</Text>;
  }

  return (
    <Stack>
      {data?.map((trail: TrailInterface) => (
        <Flex key={trail.id} justify="space-between" align="center">
          <Trail trail={trail} />
          <Group gap="sm">
            <Button variant="outline">
              <IconTrash
                onClick={() => {
                  mutate(trail.id);
                }}
              />
            </Button>
            <Link to="/trails/$postId/edit" params={{ postId: String(trail.id) }}>
              <Button variant="outline" style={{ textDecoration: "none" }}>
                <IconEdit />
              </Button>
            </Link>
          </Group>
        </Flex>
      ))}
    </Stack>
  );
}

export const Route = createFileRoute("/account/trails/")({
  component: () => <Account title="Mes trails">{Trails()}</Account>,
  loader: ({ context: { queryClient: client } }) => client.ensureQueryData(userTrailsQuery()),
  beforeLoad: async () => {
    const user =
      queryClient.getQueryData(["user"]) ??
      (await queryClient.fetchQuery({ queryKey: ["user"], queryFn: getUser }).catch(() => null));

    if (!user) {
      return redirect({ to: "/" });
    }

    return null;
  },
});
