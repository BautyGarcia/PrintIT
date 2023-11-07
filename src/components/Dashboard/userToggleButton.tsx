import { SegmentedControl, Group, Center, Box } from "@mantine/core";

interface UserToggleProps {
  userTypeRole: string;
  setUserTypeRole: (value: "Cliente" | "Vendedor") => void
}

const UserToggle = ({ userTypeRole, setUserTypeRole }: UserToggleProps) => {
  return (
    <Group position="center" my="xl">
      <SegmentedControl
        classNames={{
          "root":"bg-transparent w-[80%] h-[50px]",
          "indicator":"bg-[#1D3250]",
          "label":"hover:text-white"
        }}
        value={userTypeRole}
        onChange={(value) => setUserTypeRole(value as "Cliente" | "Vendedor")}
        data={[
          {
            value: "Cliente",
            label: (
              <Center>
                <Box className={userTypeRole === "Cliente" ? "text-[#A5D8FF]" : ""}>Cliente</Box>
              </Center>
            ),
          },
          {
            value: "Vendedor",
            label: (
              <Center>
                <Box className={userTypeRole === "Vendedor" ? "text-[#A5D8FF]" : ""}>Vendedor</Box>
              </Center>
            ),
          },
        ]}
      />
    </Group>
  );
};

export default UserToggle;
