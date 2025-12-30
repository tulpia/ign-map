// Utils
import {
  Box,
  Button,
  LoadingOverlay,
  Modal,
  Notification,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

// Hooks
import { useUserRegister } from "../../../api/users/user.api";

// Interfaces
import { UserCredentials } from "../../../api/users/user";

function Register({
  registerOpen,
  setRegisterOpen,
}: {
  registerOpen: boolean;
  setRegisterOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { mutate, isPending, isError, isSuccess, error } = useUserRegister();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserCredentials>();
  const onSubmit: SubmitHandler<UserCredentials> = (data) => {
    mutate(data);
  };

  return (
    <>
      {isSuccess && <Notification color="green" title="We notify you that" />}
      <Modal
        opened={registerOpen}
        onClose={() => {
          setRegisterOpen(false);
        }}
        title="Inscription"
      >
        <Box pos="relative">
          <LoadingOverlay visible={isPending} loaderProps={{ children: "Loading..." }} />

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
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
                    value={field.value || ""}
                    onChange={(e) => {
                      field.onChange(e.currentTarget.value);
                    }}
                    onBlur={field.onBlur}
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
                    value={field.value || ""}
                    onChange={(e) => {
                      field.onChange(e.currentTarget.value);
                    }}
                    onBlur={field.onBlur}
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
                    value={field.value || ""}
                    onChange={(e) => {
                      field.onChange(e.currentTarget.value);
                    }}
                    onBlur={field.onBlur}
                    label="Mot de passe"
                    error={errors.password_confirmation && "Le mot de passe ne correspond pas"}
                  />
                )}
              />

              <Button type="submit" disabled={isPending}>
                Register
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
        </Box>
      </Modal>
    </>
  );
}

export default Register;
