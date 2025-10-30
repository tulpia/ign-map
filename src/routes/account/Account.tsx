// Utils
import { useContext } from "react";
import { IconUserCircle } from "@tabler/icons-react";
import { Controller, useForm } from "react-hook-form";
import {
  Avatar,
  Container,
  Flex,
  Grid,
  Space,
  TextInput,
  Title,
} from "@mantine/core";

// Providers
import { AuthContext } from "../../providers/auth/AuthContext";

// Apis
import { UserData } from "../../api/users/user";

function Account() {
  const { user } = useContext(AuthContext);
  const {
    control,
    formState: { errors },
  } = useForm<UserData>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  });

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

        <Grid>
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
                  disabled
                  error={errors.email && "Veuillez renseigner un email"}
                />
              )}
            />
          </Grid.Col>
        </Grid>
      </Flex>
    </Container>
  );
}

export default Account;
