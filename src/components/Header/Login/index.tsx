// Utils
import {
  Button,
  Loader,
  Modal,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

// Hooks
import { useUserGet, useUserLogin } from "../../../api/users/user.api";

// Interfaces
import { UserCredentials } from "../../../api/users/user";

function Login({
  loginOpen,
  setLoginOpen,
}: {
  loginOpen: boolean;
  setLoginOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { mutate, error, isError, isPending, isSuccess } = useUserLogin();
  const { data } = useUserGet();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserCredentials>();
  const onSubmit: SubmitHandler<UserCredentials> = (dataMutation) => {
    mutate(dataMutation);
  };

  if (isSuccess && loginOpen) {
    setLoginOpen(false);
  }

  return (
    <Modal
      opened={loginOpen}
      onClose={() => {
        setLoginOpen(false);
      }}
      title="Authentification"
    >
      {data ? (
        <Text c="green.6">Bienvenue, {data.name}</Text>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label="Email"
                  error={errors.email && "Veuillez renseigner un email"}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              defaultValue=""
              render={({ field }) => (
                <PasswordInput
                  {...field}
                  label="Mot de passe"
                  error={
                    errors.password && "Veuillez renseigner un mot de passe"
                  }
                />
              )}
            />

            {isPending ? (
              <Loader />
            ) : (
              <Button type="submit" disabled={isPending}>
                Login
              </Button>
            )}

            {isError && axios.isAxiosError(error) && error.response
              ? Object.entries(error.response.data.errors).map(
                  ([key, value]) => (
                    <Text c="red.5" key={key}>
                      {value as string}
                    </Text>
                  )
                )
              : ""}
          </Stack>
        </form>
      )}
    </Modal>
  );
}

export default Login;
