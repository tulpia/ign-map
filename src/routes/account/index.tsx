// Utils
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useContext, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { Alert, Button, Grid, Group, Loader, Text, TextInput } from "@mantine/core";
import { queryClient } from "../../api/client";
import { getUser } from "../../api/users/user.service";

// Components
import AccountLayout from "../../components/Account";

// Providers
import { AuthContext } from "../../providers/auth/AuthContext";

// Interfaces
import { UserDataUpdate } from "../../api/users/user";

// Hooks
import { useUserUpdate } from "../../api/users/user.api";

function Account() {
  const [hasFormChanged, setHasFormChanged] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const { mutate, isPending, isError, isSuccess, error } = useUserUpdate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserDataUpdate>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });
  const onSubmit: SubmitHandler<UserDataUpdate> = (data) => {
    mutate(data);
  };

  return (
    <Group gap="md">
      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={() => {
          if (!hasFormChanged) {
            setHasFormChanged(true);
          }
        }}
      >
        <Grid gutter="md">
          <Grid.Col span={12}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextInput
                  value={field.value ?? ""}
                  onChange={(e) => {
                    field.onChange(e.currentTarget.value);
                  }}
                  onBlur={field.onBlur}
                  label="Nom"
                  error={errors.name && "Veuillez renseigner un nom"}
                />
              )}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextInput
                  value={field.value ?? ""}
                  onChange={(e) => {
                    field.onChange(e.currentTarget.value);
                  }}
                  onBlur={field.onBlur}
                  label="Email"
                  error={errors.email && "Veuillez renseigner un email"}
                />
              )}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Button type="submit" disabled={isPending || !hasFormChanged}>
              Update
            </Button>
          </Grid.Col>
          <Grid.Col span={8}>
            {isPending ? (
              <Loader />
            ) : isSuccess ? (
              <Alert variant="light" color="green" title="Updated." />
            ) : isError && axios.isAxiosError(error) ? (
              Object.entries(error.response?.data.errors).map(([key, value]) => (
                <Text c="red.4" key={key}>
                  {value as string}
                </Text>
              ))
            ) : (
              ""
            )}
          </Grid.Col>
        </Grid>
      </form>
    </Group>
  );
}

export const Route = createFileRoute("/account/")({
  component: () => <AccountLayout title="Modifier mon profile">{Account()}</AccountLayout>,
  beforeLoad: async () => {
    const user =
      queryClient.getQueryData(["user"]) ??
      (await queryClient.fetchQuery({ queryKey: ["user"], queryFn: getUser }).catch(() => null));

    if (!user) {
      const redirectObj = redirect({ to: "/" });
      const err = Object.assign(new Error("Redirecting to /"), redirectObj);
      throw err;
    }

    return null;
  },
});
