// Utils
import { useContext, useState } from "react";
import { AppShell, Button, Group, Loader } from "@mantine/core";
import { Link } from "@tanstack/react-router";

// Hooks
import { useUserLogout } from "../../api/users/user.api";

// Context
import { AuthContext } from "../../providers/auth/AuthContext";

// Components
import Login from "./Login";
import Register from "./Register";
import MenuAccount from "./Menu";

// Assets
import Logo from "./logo.png";

function Header() {
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [registerOpen, setRegisterOpen] = useState<boolean>(false);
  const { mutate, isPending } = useUserLogout();
  const { user, isUserLoading } = useContext(AuthContext);

  return (
    <AppShell.Header p="md">
      <Group justify="space-between" align="center">
        <Link style={{ height: 20 }} to="/">
          <img style={{ height: "100%" }} src={Logo} alt="" />
        </Link>

        {!isUserLoading && (
          <Group>
            {isPending ? (
              <Loader />
            ) : user ? (
              <MenuAccount mutation={mutate} />
            ) : (
              <>
                <Button
                  onClick={() => {
                    setRegisterOpen(true);
                  }}
                >
                  Register
                </Button>
                <Button
                  onClick={() => {
                    setLoginOpen(true);
                  }}
                >
                  Login
                </Button>
              </>
            )}
          </Group>
        )}
      </Group>

      <Login loginOpen={loginOpen} setLoginOpen={setLoginOpen} />
      <Register registerOpen={registerOpen} setRegisterOpen={setRegisterOpen} />
    </AppShell.Header>
  );
}

export default Header;
