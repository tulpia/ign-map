// Utils
import { useState } from "react";
import { AppShell, Button, Group, Loader, Text } from "@mantine/core";

// Hooks
import { useUserGet, useUserLogout } from "@/api/users/user.api";

// Components
import Login from "./Login";
import Register from "./Register";
import MenuAccount from "./Menu";

function Header() {
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [registerOpen, setRegisterOpen] = useState<boolean>(false);
  const { isPending, data } = useUserGet();
  const mutation = useUserLogout();

  console.log(data);

  return (
    <AppShell.Header p="md">
      <Group justify="space-between">
        <Text>IGN MAP</Text>

        <Group>
          {isPending || mutation.isPending ? (
            <Loader />
          ) : data ? (
            <MenuAccount mutation={mutation} />
          ) : (
            <>
              <Button onClick={() => setRegisterOpen(true)}>Register</Button>
              <Button onClick={() => setLoginOpen(true)}>Login</Button>
            </>
          )}
        </Group>
      </Group>

      <Login loginOpen={loginOpen} setLoginOpen={setLoginOpen} />
      <Register registerOpen={registerOpen} setRegisterOpen={setRegisterOpen} />
    </AppShell.Header>
  );
}

export default Header;
