import { useEffect, useState } from 'react';
import { createStyles, Table, ScrollArea, rem, Button, Loader } from '@mantine/core';
import { api } from '~/utils/api';
import { notifications } from '@mantine/notifications';
import { useSession } from 'next-auth/react';
import { IconCheck } from '@tabler/icons-react';
import NoPrintersImage from './NoPrintersImage';

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
    printName: string;
    printQuality: string;
    printAmount: number;
    printPrice: number;
    printNotes: string;
    closePopup: () => void;
}

const PrintersForSTLTable = (props: PrintersForSTLTableProps) => {
    const { classes, cx } = useStyles();
    const [scrolled, setScrolled] = useState(false);
    const { data: sessionData } = useSession();
    const { data: printersList, isLoading } = api.printer.getPrinterForSTL.useQuery({
        bedSize: props.bedSize
    });
    const { mutate: createWork } = api.work.createWork.useMutation();
    const { mutate: sendCreateWorkEmail } = api.email.sendCreateWorkEmail.useMutation();
    const { mutate: updateWorkURL } = api.work.addStlUrlToWork.useMutation();
    const { mutate: getSignedUrl } = api.utils.getPresignedURL.useMutation();
    const [isFetchingData, setIsFetchingData] = useState(true);
    const [isCreatingWork, setIsCreatingWork] = useState(false);

    let content = <></>;

    useEffect(() => {
        if (!isLoading) {
            setIsFetchingData(false);
        }
    }, [isLoading]);

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
                        onClick={() => setWork(printer.id, printer.user.id, printer.user.name, printer.user.email, props.fileUrl, props.fileName)}
                        disabled={isCreatingWork}
                    >
                        Elegir
                    </Button>
                </div>
            </td>
        </tr>
    ));

    const setWork = (printerId: string, workerId: string, workerName: string, workerEmail: string, fileUrl: string, fileName: string) => {
        setIsCreatingWork(true);
        notifications.show({
            id: 'create-work',
            title: 'Creando pedido...',
            message: 'Espere por favor',
            autoClose: false,
            loading: true,
            withCloseButton: false,
        });

        createWork({
            printerId: printerId,
            workerId: workerId,
            amount: props.printAmount,
            price: props.printPrice,
            quality: props.printQuality,
            name: props.printName,
            notes: props.printNotes,
        },{
            onSuccess: async (workData) => {
                sendCreateWorkEmail({
                    email: workerEmail,
                    clientName: sessionData?.user.name || "",
                    workerName,
                });

                const urlInfo = await fetch(fileUrl);
                if (urlInfo.ok) {
                    const blob = await urlInfo.blob();
                    const file = new File([blob], fileName + ".stl", { type: "application/octet-stream", lastModified: new Date().getTime() });

                    getSignedUrl({
                        fileName: file.name,
                        contentType: "application/octet-stream",
                    }, {
                        onSuccess: async (signedUrlData) => {
                            await fetch(signedUrlData.fetchUrl, {
                                method: "PUT",
                                body: file,
                                headers: {
                                  'Content-Type': "application/octet-stream",
                                },
                            }).then(() => {
                                const fileUrl = signedUrlData.fileUrl;
                                updateWorkURL({
                                    stlUrl: fileUrl,
                                    workId: workData.id, 
                                }, {
                                    onSuccess: () => {
                                        notifications.update({
                                            id: 'create-work',
                                            title: 'Pedido creado',
                                            message: 'El pedido se ha creado correctamente',
                                            color: 'green',
                                            autoClose: 3000,
                                            icon: <IconCheck />,
                                        });
                                        setIsCreatingWork(false);
                                        props.closePopup();
                                    },
                                    onError: (error) => {
                                        notifications.update({
                                            id: 'create-work',
                                            title: 'Error',
                                            message: "Hubo un error creando el trabajo. " + error.message,
                                            color: 'red',
                                            autoClose: 3000,
                                        });
                                        setIsCreatingWork(false);
                                        props.closePopup();
                                    }
                                })
                            }).catch((err: Error) => {
                                notifications.update({
                                    id: 'create-work',
                                    title: 'Error',
                                    message: `Hubo un error creando el trabajo. ${err.message}`,
                                    color: 'red',
                                    autoClose: 3000,
                                });
                            });
                        },
                        onError: (error) => {
                            notifications.update({
                                id: 'create-work',
                                title: 'Error',
                                message: "Hubo un error creando el trabajo. " + error.message,
                                color: 'red',
                                autoClose: 3000,
                            });
                            setIsCreatingWork(false);
                            props.closePopup();
                        }
                    })
                }
            },
            onError: (error) => {
                notifications.update({
                    id: 'create-work',
                    title: 'Error',
                    message: "Hubo un error creando el trabajo. " + error.message,
                    color: 'red',
                    autoClose: 3000,
                });
                setIsCreatingWork(false);
                props.closePopup();
            }
        });
    };

    if (isFetchingData) {
        content = (
            <div className='flex h-screen w-full items-center justify-center'>
                <Loader size='xl' />
            </div>
        );
    } else if (rows?.length === 0) {
        content = <NoPrintersImage />;
    } else {
        content = (
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
        );
    }
    return (
        <ScrollArea className='h-full' onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            {content}
        </ScrollArea>
    );
}

export default PrintersForSTLTable;