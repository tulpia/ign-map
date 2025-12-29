// Utils
import { Menu, rem } from "@mantine/core";
import { IconLogout, IconMenu2, IconUser } from "@tabler/icons-react";
import { UseMutateFunction } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

function MenuAccount({ mutation }: { mutation: UseMutateFunction }) {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <IconMenu2 style={{ cursor: "pointer" }} size="1.5rem" />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Account</Menu.Label>
        <Menu.Item
          leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />}
        >
          <Link
            to="/account"
            style={{ textDecoration: "none", color: "black" }}
          >
            Voir mon compte
          </Link>
        </Menu.Item>
        <Menu.Item
          color="red"
          leftSection={
            <IconLogout style={{ width: rem(14), height: rem(14) }} />
          }
          onClick={() => {
            mutation();
          }}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default MenuAccount;
