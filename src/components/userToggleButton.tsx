import { SegmentedControl, Group, Center, Box } from '@mantine/core';
import { useContext, useState } from 'react';
import { FilterUserContext } from './stateProvider';

const UserToggle = () => {
  const [userType, setUserType] = useState<'Cliente' | 'Vendedor'>('Cliente');
  const {filters, handlerFilters} = useContext(FilterUserContext)
  
  return (
    <Group position="center" my="xl">
      <SegmentedControl
        value={userType}
        onChange={(value) => setUserType(value === 'Cliente' ? 'Cliente' : 'Vendedor')}
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