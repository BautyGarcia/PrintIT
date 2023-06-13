import { SegmentedControl, Group, Center, Box } from "@mantine/core";
import { useRouter } from "next/router";
import { useUserRoleType } from "~/contexts/UserTypeRoleContext";

const UserToggle = () => {
  const { userTypeRole, toggleUserTypeRole } = useUserRoleType();
  const router = useRouter();

  const handleChange = () => {
    toggleUserTypeRole();
    void router.push(
      userTypeRole === "Cliente"
        ? "/dashboard/misTrabajos"
        : "/dashboard/subirArchivo"
    );
  };

  return (
    <Group position="center" my="xl">
      <SegmentedControl
        className="bg-transparent"
        value={userTypeRole}
        onChange={handleChange}
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
