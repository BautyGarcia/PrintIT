import { useState } from 'react';
import { createStyles, Table, ScrollArea, Button } from '@mantine/core';
import { api } from '~/utils/api';
import { notifications } from '@mantine/notifications';

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

interface MyPrintersTableProps {
    data: { id: string, brand: string; model: string; bedSize: string, type: string, isAvailable: boolean }[];
}

const MyPrintersTable = () => {
    const { classes, cx } = useStyles();
    const [scrolled, setScrolled] = useState(false);

    const { data: printersList, refetch: refetchPrintersList } = api.printer.getMyPrinters.useQuery();
    const { mutate: deletePrinter } = api.printer.deletePrinter.useMutation();

    const SwitchPrinterState = (id: string) => {
        console.log(id);
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
                refetchPrintersList();
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

    const EditPrinter = (id: string) => {
        console.log(id);
        //Esto deberia abrir un popup para el formulario de edicion de impresora
    }

    const rows = printersList?.map((printer) => (
        <tr key={printer.id}>
            <td>{printer.brand}</td>
            <td>{printer.model}</td>
            <td>{printer.type}</td>
            <td>{printer.bedSize}</td>
            <td>{printer.isAvailable ? "Disponible" : "Ocupada"}</td>
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
                    <Button
                        onClick={() => EditPrinter(printer.id)}
                        className='bg-blue-500 py-2 text-white hover:bg-blue-700'
                    >
                        Editar
                    </Button>
                </div>
            </td>
        </tr>
    ));

    return (
        <ScrollArea h={"89vh"} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            <Table miw={700}>
                <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                    <tr>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Tipo</th>
                        <th>Tamaño</th>
                        <th>Estado</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </ScrollArea>
    );
}

export default MyPrintersTable;