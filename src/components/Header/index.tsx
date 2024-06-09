// Utils
import { useState } from "react";
import { AppShell, Button, Group, Text } from "@mantine/core";

// Components
import Login from "./Login";
import Register from "./Register";

function Header() {
  /**
   * @TODO : Implémenter le compte user pour checker si il faut deconnecter ou connecter
   */
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [registerOpen, setRegisterOpen] = useState<boolean>(false);

  return (
    <AppShell.Header p="md">
      <Group justify="space-between">
        <Text>IGN MAP</Text>

        <Group>
          <Button onClick={() => setRegisterOpen(true)}>Register</Button>
          <Button onClick={() => setLoginOpen(true)}>Login</Button>
        </Group>
      </Group>

      <Login loginOpen={loginOpen} setLoginOpen={setLoginOpen} />
      <Register registerOpen={registerOpen} setRegisterOpen={setRegisterOpen} />
    </AppShell.Header>
  );
}

export default Header;
