import { SegmentedControl, Group, Center, Box } from "@mantine/core";

interface UserToggleProps {
  userTypeRole: string;
  setUserTypeRole: (value: string) => void;
}

const UserToggle = ({ userTypeRole, setUserTypeRole }:UserToggleProps) => {
  
  
  return (
    <Group position="center" my="xl">
      <SegmentedControl
        className="bg-transparent w-[80%] h-[50px]"
        value={userTypeRole}
        onChange={(value) => setUserTypeRole(value)}
        data={[
          {
            value: "Cliente",
            label: (
              <Center>
                <Box>Cliente</Box>
              </Center>
            ),
          },
          {
            value: "Vendedor",
            label: (
              <Center>
                <Box>Vendedor</Box>
              </Center>
            ),
          },
        ]}
      />
    </Group>
  );
};

export default UserToggle;
