// Utils
import { useContext, useState } from "react";
import { IconUserCircle } from "@tabler/icons-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Loader,
  Space,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import axios from "axios";

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
      name: user?.name,
      email: user?.email,
    },
  });
  const onSubmit: SubmitHandler<UserDataUpdate> = (data) => {
    mutate(data);
  };

  return (
    <Container
      style={{
        paddingTop: 20,
      }}
      fluid
      strategy="grid"
    >
      <Title>Votre profil</Title>
      <Space h="md" />
      <Flex gap="md">
        <Avatar color="blue" size={100}>
          <IconUserCircle size="4rem" />
        </Avatar>

        <Box style={{ overflow: "hidden", width: 600 }}>
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
                      {...field}
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
                      {...field}
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
                  Object.entries(error.response?.data.errors).map(
                    ([key, value]) => (
                      <Text c="red.4" key={key}>
                        {value as string}
                      </Text>
                    )
                  )
                ) : (
                  ""
                )}
              </Grid.Col>
            </Grid>
          </form>
        </Box>
      </Flex>
    </Container>
  );
}

export default Account;
