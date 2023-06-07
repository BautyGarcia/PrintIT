import { SegmentedControl, Group, Center, Box } from '@mantine/core';
import { useUserRoleType } from '~/contexts/UserTypeRoleContext';
const UserToggle = () => {
  const { userTypeRole, toggleUserTypeRole } = useUserRoleType();

  return (
    <Group position="center" my="xl">
      <SegmentedControl
        value={userTypeRole}
        onChange={toggleUserTypeRole}
        data={[
          {
            value: 'Cliente',
            label: (
              <Center>
                <Box>Cliente</Box>
              </Center>
            ),
          },
          {
            value: 'Vendedor',
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
}

export default UserToggle;