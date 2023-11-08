import { SegmentedControl, Group, Center, Box, useMantineColorScheme } from "@mantine/core";

interface UserToggleProps {
  userTypeRole: string;
  setUserTypeRole: (value: "Cliente" | "Vendedor") => void
}

const UserToggle = ({ userTypeRole, setUserTypeRole }: UserToggleProps) => {
  const { colorScheme } = useMantineColorScheme();
  return (
    <Group position="center" my="xl">
      <SegmentedControl
        classNames={{
          "root":"bg-transparent w-[80%] h-[50px]",
          "indicator":`${colorScheme === "dark" ? "bg-[#1D3250]" : "bg-[#E7F5FF]"}`,
          "label":`${colorScheme === "dark" ? "hover:text-white" : "hover:text-black"}`,
        }}
        value={userTypeRole}
        onChange={(value) => setUserTypeRole(value as "Cliente" | "Vendedor")}
        data={[
          {
            value: "Cliente",
            label: (
              <Center>
                <Box className={`${userTypeRole === "Cliente" ? colorScheme === "dark" ? "text-[#A5D8FF]" : " text-[#228BE6]" : ""}`}>Cliente</Box>
              </Center>
            ),
          },
          {
            value: "Vendedor",
            label: (
              <Center>
                <Box className={`${userTypeRole === "Vendedor" ? colorScheme === "dark" ? "text-[#A5D8FF]" : " text-[#228BE6]" : ""}`}>Vendedor</Box>
              </Center>
            ),
          },
        ]}
      />
    </Group>
  );
};

export default UserToggle;
