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

const MyOrdersTable = () => {
    const { classes, cx } = useStyles();
    const [scrolled, setScrolled] = useState(false);

    const { data: ordersList, refetch: refetchOrdersList } = api.work.getMyOrders.useQuery();

    const rows = ordersList?.map((order) => (
        <tr key={order.id}>
            <td>{order.worker.name}</td>
            <td>{(order.price).toString() + "$"}</td>
            <td>{order.status}</td>
            <td>{order.lastBidder === "CLIENT" ? "Cliente" : "Vendedor"}</td>
            <td>
                <div className='flex justify-center'>
                    <WorkSatusPopup 
                        refreshWorks={refetchOrdersList} 
                        workInfo={
                            {
                                id: order.id,
                                lastBidder: order.lastBidder,
                                price: order.price,
                                status: order.status,
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
                        <th>Vendedor</th>
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

export default MyOrdersTable;