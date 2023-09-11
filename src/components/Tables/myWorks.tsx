import { useState } from 'react';
import { createStyles, Table, ScrollArea } from '@mantine/core';
import { api } from '~/utils/api';
import WorkSatusPopup from '../Dashboard/workStatusPopup';

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

    const rows = worksList?.map((work) => (
        <tr key={work.id}>
            <td>{work.client.name}</td>
            <td>{(work.price).toString() + "$"}</td>
            <td>{work.status}</td>
            <td>{work.lastBidder === "CLIENT" ? "Cliente" : "Vos"}</td>
            <td>
                <div className='flex justify-center'>
                    <WorkSatusPopup 
                        refreshWorks={refetchWorksList} 
                        workInfo={
                            {
                                id: work.id,
                                lastBidder: work.lastBidder,
                                price: work.price,
                                status: work.status,
                            }
                        }
                    />
                </div>
            </td>
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
                        <th></th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </ScrollArea>
    );
}

export default MyWorksTable;