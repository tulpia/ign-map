// Utils (external libraries)
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { IconInfoCircle } from "@tabler/icons-react";
import { Alert, Loader } from "@mantine/core";

// Components
import Account from "../../../components/Account";
import TrailForm from "../../../components/Trails/TrailForm";
import { ServerErrors } from "../../../components/Errors/ServerErrors";

// Api / hooks / services
import { queryClient } from "../../../api/client";
import { ensureAuth } from "../../guards";
import { useTrailUpdate, trailQuery } from "../../../api/trails/trails.api";
import { UserData } from "../../../api/users/user";

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

      <ServerErrors error={error} isError={isError} />
    </>
  );
}

export const Route = createFileRoute("/trails/$postId/edit")({
  component: () => <Account title="Éditer le trail">{EditTrail()}</Account>,
  loader: async ({ context: { queryClient: routeQueryClient }, params: { postId } }) => {
    const id = parseInt(postId, 10);

    const user: UserData | null | undefined = routeQueryClient.getQueryData(["user"]);
    if (!user) {
      throw new Error("User not authenticated");
    }

    const trail = await routeQueryClient.ensureQueryData(trailQuery(id));

    if (trail.user_id !== user.id) {
      throw new Error("Unauthorized: You do not own this trail");
    }

    return null;
  },
  beforeLoad: () => ensureAuth(queryClient),
});
