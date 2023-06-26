import { Avatar, Group, Text, Menu } from "@mantine/core";
import "remixicon/fonts/remixicon.css";

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
      <Group spacing={7} className="flex flex-col">
        <Avatar src={user.image} alt={user.name} radius="xl" size={300} />
        <br></br>
        <Text weight={500} size="xl" sx={{ lineHeight: 2 }} mr={3}>
          {user.name}
        </Text>
      </Group>
    </Menu>
  );
};

export default UserSetting;
