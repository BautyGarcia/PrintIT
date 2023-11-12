import { useState } from "react";
import {
  createStyles,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  rem,
} from "@mantine/core";
import { IconLogout, IconChevronDown } from "@tabler/icons-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import "remixicon/fonts/remixicon.css";

const useStyles = createStyles((theme) => ({
  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: `5px 10px 5px 5px`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },
}));

interface UserBoxProps {
  user: { name: string; image: string };
}

const UserBox = ({ user }: UserBoxProps) => {
  const { classes, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: "pop-top-right" }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton
          className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
        >
          <Group spacing={7}>
            <Avatar src={user.image} alt={user.name} radius="xl" size={30} />
            <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
              {user.name}
            </Text>
            <IconChevronDown size={rem(12)} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Link href="/settings">
          <Menu.Item icon={<i className="ri-user-settings-line"></i>}>
            Perfil
          </Menu.Item>
        </Link>
        <Link href="/" passHref onClick={() => signOut({ callbackUrl: "/" })}>
          <Menu.Item icon={<IconLogout size="0.9rem" stroke={1.5} />}>
            Cerrar Sesion
          </Menu.Item>
        </Link>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserBox;
