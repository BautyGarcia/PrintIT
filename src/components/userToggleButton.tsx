import { SegmentedControl, Group, Center, Box } from '@mantine/core';
import { useState } from 'react';

const UserToggle = () => {
  const [userType, setUserType] = useState<'Cliente' | 'Vendedor'>('Cliente');
  
  return (
    <Group position="center" my="xl">
      <SegmentedControl
        value={userType}
        onChange={(value) => setUserType(value == 'Cliente' ? 'Vendedor' : 'Cliente')}
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