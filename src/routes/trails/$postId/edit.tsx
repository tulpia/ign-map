// Utils (external libraries)
import { createFileRoute, redirect, Link, useParams } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";
import { IconInfoCircle } from "@tabler/icons-react";
import { Alert, Loader, Text } from "@mantine/core";

// Components
import Account from "../../../components/Account";
import TrailForm from "../../../components/Trails/TrailForm";

// Api / hooks / services
import { queryClient } from "../../../api/client";
import { getUser } from "../../../api/users/user.service";
import { useTrailUpdate, trailQuery } from "../../../api/trails/trails.api";

function EditTrail() {
  const params = useParams({ from: "/trails/$postId/edit" });
  const { postId } = params;
  const id = parseInt(String(postId), 10);

  const { data: trailData } = useSuspenseQuery(trailQuery(id));
  const { mutate, isPending, isError, isSuccess, error } = useTrailUpdate();

  const handleFormSubmit = (formData: FormData) => {
    mutate({ id, data: formData });
  };

  if (isPending) return <Loader />;

  if (isSuccess) {
    return (
      <Alert variant="light" color="blue" title="Trail mis à jour" icon={<IconInfoCircle />}>
        Votre trail a été mis à jour.{" "}
        <Link to="/trails/$postId" params={{ postId: String(postId) }}>
          Voir le trail
        </Link>
      </Alert>
    );
  }

  return (
    <>
      <TrailForm
        defaultValues={trailData}
        onSubmit={handleFormSubmit}
        isPending={isPending}
        submitLabel="Mettre à jour"
      />

      {isError && axios.isAxiosError(error) && error.response
        ? Object.entries(error.response.data.errors).map(([key, value]) => (
            <Text c="red.4" key={key}>
              {value as string}
            </Text>
          ))
        : ""}
    </>
  );
}

export const Route = createFileRoute("/trails/$postId/edit")({
  component: () => <Account title="Éditer le trail">{EditTrail()}</Account>,
  loader: ({ context: { queryClient: routeQueryClient }, params: { postId } }) =>
    routeQueryClient.ensureQueryData(trailQuery(parseInt(postId, 10))),
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
