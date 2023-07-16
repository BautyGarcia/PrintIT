import { useState } from 'react';
import { createStyles, Table, ScrollArea, Button } from '@mantine/core';
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

interface MyPrintersTableProps {
    data: { id: string, brand: string; model: string; bedSize: string, type: string, isAvailable: boolean }[];
}

const MyPrintersTable = () => {
    const { classes, cx } = useStyles();
    const [scrolled, setScrolled] = useState(false);

    const printersList = api.printer.getMyPrinters.useQuery() as MyPrintersTableProps;

    const SwitchPrinterState = (id: string) => {
        console.log(id);
    }

    const rows = printersList.data?.map((printer) => (
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
                        onClick={() => SwitchPrinterState(printer.id)}
                        className='bg-blue-500 py-2 mr-2 text-white hover:bg-blue-700'
                    >
                        Eliminar
                    </Button>
                    <Button
                        onClick={() => SwitchPrinterState(printer.id)}
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