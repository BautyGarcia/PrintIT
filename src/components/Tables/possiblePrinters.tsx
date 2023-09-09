import { useState } from 'react';
import { createStyles, Table, ScrollArea, rem, Button } from '@mantine/core';
import { api } from '~/utils/api';
import { notifications } from '@mantine/notifications';

const useStyles = createStyles((theme) => ({
    header: {
        position: 'sticky',
        top: 0,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        transition: 'box-shadow 150ms ease',

        '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
                }`,
        },
    },

    scrolled: {
        boxShadow: theme.shadows.sm,
    },
}));

interface PrintersForSTLTableProps {
    bedSize: string;
    fileUrl: string;
    fileName: string;
}

const PrintersForSTLTable = (props: PrintersForSTLTableProps) => {
    const { classes, cx } = useStyles();
    const [scrolled, setScrolled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { data: printersList } = api.printer.getPrinterForSTL.useQuery({
        bedSize: props.bedSize
    });

    const { mutate: createWork } = api.work.createWork.useMutation();

    const rows = printersList?.map((printer) => (
        <tr key={printer.id}>
            <td>{printer.user.name}</td>
            <td>{printer.brand}</td>
            <td>{printer.model}</td>
            <td>{printer.type}</td>
            <td>{printer.bedSize}</td>
            <td>
                <div className='flex justify-center'>
                    <Button
                        className='bg-blue-500 py-2 mr-2 w-[60%] text-white hover:bg-blue-700'
                        onClick={() => setWork(printer.id, printer.user.id)}
                    >
                        Elegir
                    </Button>
                </div>
            </td>
        </tr>
    ));

    const setWork = (printerId: string, workerId: string) => {
        setIsLoading(true);
        notifications.show({
            title: 'Creando pedido...',
            message: 'Espere por favor',
            autoClose: false,
            loading: isLoading
        });

        createWork({
            printerId: printerId,
            workerId: workerId,
        },{
            onSuccess: () => {
                setIsLoading(false);
                notifications.show({
                    title: 'Pedido creado',
                    message: 'El pedido se ha creado correctamente, ve a la parte de Mis Pedidos',
                    color: 'green',
                    autoClose: 5000,
                });
            },
            onError: (error) => {
                notifications.show({
                    title: 'Error',
                    message: error.message,
                    color: 'red',
                });
            }
        });
    };

    return (
        <ScrollArea onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            <Table miw={700}>
                <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                    <tr>
                        <th>Vendedor</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Tipo</th>
                        <th>Tamaño de Cama</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </ScrollArea>
    );
}

export default PrintersForSTLTable;