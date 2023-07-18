import { useState } from 'react';
import { createStyles, Table, ScrollArea, rem } from '@mantine/core';
import { api } from '~/utils/api';

const useStyles = createStyles((theme) => ({
    header: {
        position: 'sticky',
        top: 0,
        backgroundColor: theme.colorScheme === 'dark' ? "#1c2333" : theme.white,
        transition: 'box-shadow 150ms ease',
    },

    scrolled: {
        boxShadow: theme.shadows.sm,
    },
}));

const MyWorksTable = () => {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const { data: worksList, refetch: refetchWorksList } = api.work.getMyWorks.useQuery();
  console.log(worksList);
  
  const rows = worksList?.map((work) => (
    <tr key={work.id}>
      <td>{work.client.name}</td>
      <td>{work.price}</td>
      <td>{work.status}</td>
      <td>{work.lastBidder}</td>
    </tr>
  ));

  return (
    <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table miw={700} verticalSpacing="sm" fontSize="md" horizontalSpacing="xl">
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Cliente</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Ultimo Postor</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}

export default MyWorksTable;