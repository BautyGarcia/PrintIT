import { useState } from 'react';
import { createStyles, Table, ScrollArea, rem } from '@mantine/core';
import { api } from '~/utils/api';

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

interface STLInfo {
    bedSize: string;
}

interface PrintersForSTLTableProps {
    STLInfo: STLInfo;
}

const PrintersForSTLTable = ({ STLInfo }: PrintersForSTLTableProps) => {
    const { classes, cx } = useStyles();
    const [scrolled, setScrolled] = useState(false);
    const { data: printersList } = api.printer.getPrinterForSTL.useQuery({
        bedSize: STLInfo.bedSize,
    });
    
    const rows = printersList?.map((printer) => (
      <tr key={printer.id}>
        <td>{printer.user.name}</td>
        <td>{printer.brand}</td>
        <td>{printer.model}</td>
        <td>{printer.type}</td>
        <td>{printer.bedSize}</td>
        <td>{"Zona"}</td>
        <td>{".$"}</td>
      </tr>
    ));
  
    return (
        <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            <Table miw={700}>
                <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                    <tr>
                        <th>Vendedor</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Tipo</th>
                        <th>Tamaño de Cama</th>
                        <th>Zona</th>
                        <th>Precio Estimado</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </ScrollArea>
    );
}

export default PrintersForSTLTable;