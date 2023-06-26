import { useState } from "react";
import { createStyles, Avatar, Group, Text, Menu } from "@mantine/core";
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

const UserSetting = ({ user }: UserBoxProps) => {
  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: "pop-top-right" }}
      withinPortal
    >
      <Group spacing={7}>
        <Avatar src={user.image} alt={user.name} radius="xl" size={100} />
        <Text weight={500} size="xl" sx={{ lineHeight: 2 }} mr={3}>
          {user.name}
        </Text>
      </Group>
    </Menu>
  );
};

export default UserSetting;
