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
import axios from "axios";

// Hooks
import { useUserRegister } from "@/api/users/user.api";

// Interfaces
import { UserCredentials } from "@/api/users/user";

function Register({
  registerOpen,
  setRegisterOpen,
}: {
  registerOpen: boolean;
  setRegisterOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const mutation = useUserRegister();
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
      opened={registerOpen}
      onClose={() => setRegisterOpen(false)}
      title="Inscription"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextInput
                {...field}
                label="Nom"
                error={errors.email && "Veuillez renseigner un nom"}
              />
            )}
          />
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
          <Controller
            name="password_confirmation"
            control={control}
            rules={{ required: true }}
            defaultValue=""
            render={({ field }) => (
              <PasswordInput
                {...field}
                label="Mot de passe"
                error={
                  errors.password_confirmation &&
                  "Le mot de passe ne correspond pas"
                }
              />
            )}
          />

          <Button type="submit" disabled={mutation.isPending}>
            Login
          </Button>

          {mutation.isError && axios.isAxiosError(mutation.error)
            ? Object.entries(mutation?.error?.response?.data.errors).map(
                ([key, value]) => (
                  <Text c="red.4" key={key}>
                    {value as string}
                  </Text>
                )
              )
            : ""}
        </Stack>
      </form>
    </Modal>
  );
}

export default Register;
