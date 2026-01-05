// Utils (external libraries)
import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader, Alert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

import TrailForm from "../../../../components/Trails/TrailForm";

// Components
import Account from "../../../../components/Account";
import { ServerErrors } from "../../../../components/Errors/ServerErrors";

// Interfaces (types)

// Api / hooks / services
import { queryClient } from "../../../../api/client";
import { ensureAuth } from "../../../guards";
import { useTrailCreate } from "../../../../api/trails/trails.api";

function AddTrail() {
  const { mutate, data: trailData, isPending, isError, isSuccess, error } = useTrailCreate();

  const handleFormSubmit = (formData: FormData) => {
    mutate(formData);
  };

  if (isPending) {
    return <Loader />;
  }

  if (isSuccess && trailData) {
    return (
      <Alert variant="light" color="blue" title="Trail ajouté" icon={<IconInfoCircle />}>
        Votre trail a été ajouté.{" "}
        <Link to="/trails/$postId" params={{ postId: String(trailData.id) }}>
          Voir le trail
        </Link>
      </Alert>
    );
  }

  return (
    <>
      <TrailForm onSubmit={handleFormSubmit} isPending={isPending} />
      <ServerErrors error={error} isError={isError} />
    </>
  );
}

export const Route = createFileRoute("/account/trails/add/")({
  component: () => <Account title="Ajouter un trail">{AddTrail()}</Account>,
  beforeLoad: () => ensureAuth(queryClient),
});
