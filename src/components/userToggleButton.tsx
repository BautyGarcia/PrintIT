import { useMantineColorScheme, SegmentedControl, Group, Center, Box } from '@mantine/core';
import { IconHammer, Icon3dCubeSphere } from '@tabler/icons-react';


const UserToggle = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group position="center" my="xl">
      <SegmentedControl
        value={colorScheme}
        onChange={(value: 'light' | 'dark') => toggleColorScheme(value)}
        data={[
          {
            value: 'light',
            label: (
              <Center>
                <Box>Cliente</Box>
              </Center>
            ),
          },
          {
            value: 'dark',
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