// Utils (external libraries)
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import axios from "axios";
import { Loader, Text, Alert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

import TrailForm from "../../../../components/Trails/TrailForm";

// Components
import Account from "../../../../components/Account";

// Interfaces (types)

// Api / hooks / services
import { queryClient } from "../../../../api/client";
import { getUser } from "../../../../api/users/user.service";
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

      {isError && axios.isAxiosError(error)
        ? Object.entries(error.response?.data.errors).map(([key, value]) => (
            <Text c="red.4" key={key}>
              {value as string}
            </Text>
          ))
        : ""}
    </>
  );
}

export const Route = createFileRoute("/account/trails/add/")({
  component: () => <Account title="Ajouter un trail">{AddTrail()}</Account>,
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
