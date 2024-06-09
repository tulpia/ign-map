// Utils
import {
  Button,
  Modal,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

// Hooks
import { useUserLogin } from "../../../../api/users/user.api";

// Interfaces
import { UserCredentials } from "../../../../api/users/user";

function Login({
  loginOpen,
  setLoginOpen,
}: {
  loginOpen: boolean;
  setLoginOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const mutation = useUserLogin();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserCredentials>();
  const onSubmit: SubmitHandler<UserCredentials> = (data) => {
    mutation.mutate(data);
  };

  return (
    <Modal
      opened={loginOpen}
      onClose={() => setLoginOpen(false)}
      title="Authentification"
    >
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
                error={errors.password && "Veuillez renseigner un mot de passe"}
              />
            )}
          />

          <Button type="submit" disabled={mutation.isPending}>
            Login
          </Button>

          {mutation.isError && <Text c="red.4">{mutation.error.message}</Text>}
        </Stack>
      </form>
    </Modal>
  );
}

export default Login;
