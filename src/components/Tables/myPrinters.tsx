import { useEffect, useState } from 'react';
import { createStyles, Table, ScrollArea, Button, Loader } from '@mantine/core';
import { api } from '~/utils/api';
import { notifications } from '@mantine/notifications';
import EditPrinterPopup from '../Dashboard/editPrinterPopup';

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

const MyPrintersTable = () => {
    const { classes, cx } = useStyles();
    const [scrolled, setScrolled] = useState(false);
    const { data: printersList, refetch: refetchPrintersList, isLoading } = api.printer.getMyPrinters.useQuery();
    const { mutate: deletePrinter } = api.printer.deletePrinter.useMutation();
    const { mutate: switchPrinterState } = api.printer.switchPrinterAvailability.useMutation();
    const [isFetchingData, setIsFetchingData] = useState(true);
    let content = <></>;

    useEffect(() => {
        if (!isLoading) {
            setIsFetchingData(false);
        }
    }, [isLoading]);

    const SwitchPrinterState = (id: string) => {
        switchPrinterState({ printerId: id }, {
            onSuccess: () => {
                notifications.show({
                    title: "Estado cambiado",
                    message: "El estado de la impresora ha sido cambiado correctamente.",
                    color: "green",
                    autoClose: 5000,
                });
                void refetchPrintersList();
            },
            onError: (error) => {
                notifications.show({
                    title: "Error",
                    message: error.message,
                    color: "red",
                    autoClose: 5000,
                });
            }
        })
    }

    const DeletePrinter = (id: string) => {
        deletePrinter({ printerId: id }, {
            onSuccess: () => {
                notifications.show({
                    title: "Impresora eliminada",
                    message: "La impresora ha sido eliminada correctamente.",
                    color: "green",
                    autoClose: 5000,
                });
                void refetchPrintersList();
            },
            onError: (error) => {
                notifications.show({
                    title: "Error",
                    message: error.message,
                    color: "red",
                    autoClose: 5000,
                });
            }
        })
    }

    const rows = printersList?.map((printer) => (
        <tr key={printer.id}>
            <td>{printer.brand}</td>
            <td>{printer.model}</td>
            <td>{printer.type}</td>
            <td>{printer.bedSize}</td>
            <td>{printer.isAvailable ? "Habilitada" : "Inhabilitada"}</td>
            <td>
                <div className="flex justify-end">
                    <Button
                        onClick={() => SwitchPrinterState(printer.id)}
                        className='bg-blue-500 py-2 mr-2 text-white hover:bg-blue-700'
                    >
                        {printer.isAvailable ? "Deshabilitar" : "Rehabilitar"}
                    </Button>
                    <Button
                        onClick={() => DeletePrinter(printer.id)}
                        className='bg-blue-500 py-2 mr-2 text-white hover:bg-blue-700'
                    >
                        Eliminar
                    </Button>
                    <EditPrinterPopup printerInfo={printer} refreshPrinters={refetchPrintersList} />
                </div>
            </td>
        </tr>
    ));

    if (isFetchingData) {
        content = (
            <div className='flex h-screen w-full items-center justify-center'>
                <Loader size='xl' />
            </div>
        );
    } else {
        content = (
            <Table miw={700} verticalSpacing="sm" fontSize="md" horizontalSpacing="xl">
                <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                    <tr>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Tipo</th>
                        <th>Tamaño</th>
                        <th>Estado</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        )
    }

    return (
        <ScrollArea className='h-full' onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            {content}
        </ScrollArea>
    );
}

export default MyPrintersTable;