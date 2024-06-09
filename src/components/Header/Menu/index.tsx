// Utils
import { Avatar, Menu, rem } from "@mantine/core";
import { IconLogout, IconUser, IconUserCircle } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";

function MenuAccount({ mutation }: { mutation: any }) {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Avatar color="blue">
          <IconUserCircle size="1.5rem" />
        </Avatar>
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
          onClick={() => mutation.mutate({})}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default MenuAccount;
