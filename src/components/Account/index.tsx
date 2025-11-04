// Utils
import { useContext, ReactNode } from "react";
import { Avatar, Group, Stack, Title } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import {
  Icon,
  IconCircleDashedPlus,
  IconLogout,
  IconProps,
  IconUser,
} from "@tabler/icons-react";

// Style
import classes from "./NavAccount.module.css";

// Providers
import { AuthContext } from "../../providers/auth/AuthContext";

// Hooks
import { useUserLogout } from "../../api/users/user.api";

interface DataMenuItem {
  link: string;
  label: string;
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
}

// @todo : possible d'automatiser ca en recuperant les routes ?
const dataMenu: Array<DataMenuItem> = [
  { link: "/account", label: "Mon compte", icon: IconUser },
  {
    link: "/account/trail",
    label: "Ajouter un trail",
    icon: IconCircleDashedPlus,
  },
];

function Account({ title, children }: { title: string; children: ReactNode }) {
  const { user } = useContext(AuthContext);
  const { mutate } = useUserLogout();

  const links = dataMenu.map((item) => (
    <Link
      activeOptions={{ exact: true }}
      to={item.link}
      className={classes.link}
      href={item.link}
      key={item.label}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  const handleLogout = (): void => {
    mutate();
  };

  return (
    <Group style={{ height: "100%" }} align="flex-start">
      <nav className={classes.navbar}>
        <div className={classes.navbarMain}>
          <Group className={classes.header} justify="space-between">
            <Avatar src={null} />
            <Title order={4}>{user?.name}</Title>
          </Group>
          {links}
        </div>

        <div className={classes.footer}>
          <button type="button" className={classes.link} onClick={handleLogout}>
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      <Stack style={{ paddingTop: 10 }}>
        <Title order={2}>{title}</Title>
        {children}
      </Stack>
    </Group>
  );
}

export default Account;
