// Utils
import axios from "axios";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  Loader,
  NumberInput,
  Select,
  Stack,
  TextInput,
  Text,
  Textarea,
  Group,
  FileInput,
  Alert,
} from "@mantine/core";
import { IconFile, IconInfoCircle, IconPhoto } from "@tabler/icons-react";
import { useRef } from "react";

// Requests
import { useTrailCreate } from "../../../../api/trails/trails.api";

// Interfaces
import { TrailCreate } from "../../../../api/trails/trails";
import { TrailDifficulty } from "../../../../api/trails/trails.enums";

// Components
import Account from "../../../../components/Account";

function AddTrail() {
  const formRef = useRef<HTMLFormElement>(null);
  const {
    mutate,
    data: trailData,
    isPending,
    isError,
    isSuccess,
    error,
  } = useTrailCreate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TrailCreate>();
  const onSubmit: SubmitHandler<TrailCreate> = (data: TrailCreate) => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);

      if (data.images.length) {
        data.images.forEach((file) => {
          formData.append("images[]", file);
        });

        formData.delete("images");
      }

      mutate(formData);
    }
  };

  if (isPending) {
    return <Loader />;
  }

  if (isSuccess && trailData) {
    return (
      <Alert
        variant="light"
        color="blue"
        title="Trail ajouté"
        icon={<IconInfoCircle />}
      >
        Votre trail a été ajouté.{" "}
        <Link to="/trails/$postId" params={{ postId: String(trailData.id) }}>
          Voir le trail
        </Link>
      </Alert>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <TextInput
              withAsterisk
              {...field}
              label="Titre"
              error={errors.title && "Veuillez renseigner un titre"}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <Textarea
              withAsterisk
              {...field}
              label="Description"
              rows={10}
              resize="vertical"
              error={
                errors.description && "Veuillez renseigner une description"
              }
            />
          )}
        />
        <Group grow>
          <Controller
            name="time_to_complete"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <NumberInput
                withAsterisk
                {...field}
                label="Temps de complétion"
                placeholder="Temps (en minutes)"
                error={
                  errors.time_to_complete &&
                  "Veuillez renseigner un temps de complétion"
                }
              />
            )}
          />
          <Controller
            name="difficulty"
            control={control}
            rules={{ required: true }}
            defaultValue={TrailDifficulty.Easy}
            render={({ field }) => (
              <Select
                withAsterisk
                {...field}
                label="Difficulté"
                style={{ textTransform: "capitalize" }}
                data={Object.values(TrailDifficulty)}
                error={
                  errors.difficulty && "Veuillez renseigner une difficulté"
                }
              />
            )}
          />
        </Group>
        <Controller
          name="trace"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <FileInput
              withAsterisk
              rightSection={<IconFile size={18} />}
              {...field}
              label="Tracé GPX"
              accept=".gpx,application/gpx+xml"
              placeholder=".gpx"
              error={errors.trace && "Veuillez renseigner un tracé"}
            />
          )}
        />
        <Controller
          name="images"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <FileInput
              withAsterisk
              multiple
              rightSection={<IconPhoto size={18} />}
              {...field}
              label="Images"
              accept="image/jpeg,image/png"
              placeholder=""
              error={errors.images && "Veuillez renseigner au mois une image"}
            />
          )}
        />

        <Button type="submit" disabled={isPending}>
          Soumettre
        </Button>

        {isError && axios.isAxiosError(error)
          ? Object.entries(error.response?.data.errors).map(([key, value]) => (
              <Text c="red.4" key={key}>
                {value as string}
              </Text>
            ))
          : ""}
      </Stack>
    </form>
  );
}

export const Route = createFileRoute("/account/trails/add/")({
  component: () => <Account title="Ajouter un trail">{AddTrail()}</Account>,
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      return redirect({
        to: "/",
      });
    }

    return null;
  },
});
