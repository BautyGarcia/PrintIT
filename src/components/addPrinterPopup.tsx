import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Button, useMantineColorScheme, TextInput, Autocomplete, Select } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';
import { isNotEmpty, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useSession } from "next-auth/react";
import { Logo } from './logo';
import { api } from '~/utils/api';

const PrinterPopup: React.FC = () => {
    const [opened, { toggle }] = useDisclosure(false);
    const { colorScheme } = useMantineColorScheme();
    const largeScreen = useMediaQuery('(min-width: 60em)');
    const [isLoading, setIsLoading] = useState(false);
    const { data: SessionData } = useSession();
    const { mutate: addPrinter } = api.printer.addPrinter.useMutation();

    const handlePopupClose = () => {
        toggle();
        addPrinterForm.reset();
    };

    const addPrinterForm = useForm({
        initialValues: { businessName: '', printerBrand: '', printerModel: '', printerType: '', printerArea: '' },
        validate: {
            businessName: isNotEmpty(),
            printerBrand: isNotEmpty(),
            printerModel: isNotEmpty(),
            printerType: isNotEmpty(),
            printerArea: (value) => (/^\d{3}x\d{3}x\d{3}$/.test(value) ? null : true),
        }
    });

    const handleError = (errors: typeof addPrinterForm.errors) => {
        if (errors.businessName || errors.printerBrand || errors.printerModel || errors.printerType) {
            notifications.show({
                title: 'Error',
                message: 'Por favor complete todos los campos.',
                color: 'red',
                autoClose: 5000,
            });
        } else if (errors.printerArea) {
            notifications.show({
                title: 'Error',
                message: 'El area de impresion debe tener este formato: 220x220x250',
                color: 'red',
                autoClose: 5000,
            });
        }
    };

    const handleFormSubmit = (values: typeof addPrinterForm.values) => {
        setIsLoading(true);

        addPrinter({
            userEmail: SessionData?.user?.email as string,
            printerOwner: values.businessName,
            printerBrand: values.printerBrand,
            printerModel: values.printerModel,
            printerType: values.printerType,
            printerArea: values.printerArea,
        }, {
            onSuccess: () => {
                notifications.show({
                    title: 'Impresora registrada',
                    message: 'La impresora se registro correctamente.',
                    color: 'green',
                    autoClose: 5000,
                });
                setIsLoading(false);
                handlePopupClose();
            },
            onError: (error) => {
                notifications.show({
                    title: 'Error',
                    message: error.message,
                    color: 'red',
                    autoClose: 5000,
                });
                setIsLoading(false);
            }
        });
    };

    return (
        <>
            <Link href="#" passHref className="flex items-center text-white no-underline text-sm bg-blue-500 px-3.5 py-2.5 mb-4 rounded-md font-semibold" onClick={toggle}>
                <IconPlus className="text-white mr-2.5" />
                <span>Registrar Impresora</span>
            </Link>

            {opened && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
                    <div className={colorScheme === 'dark' ? 'bg-[#1C2333] rounded-lg' : 'bg-white rounded-lg'}>
                        <div className={largeScreen ? 'p-8 w-[477px] min-w-[310px] overflow-y-auto' : 'p-8 max-h-[70vh] max-w-[75vw] min-w-[310px] overflow-y-auto'}>
                            <form id='addPrinterForm' onSubmit={addPrinterForm.onSubmit(handleFormSubmit, handleError)}>
                                <Link className="flex flex-row items-center gap-2" href="" passHref>
                                    <Logo width={40} height={40} />
                                </Link>
                                <div className="flex flex-col mt-4">
                                    <label className="text-left mb-1">Nombre del Propietario</label>
                                    <Autocomplete
                                        placeholder="Manuel, Rulo3D, Globant, etc"
                                        size="md"
                                        data={SessionData?.user?.name ? [SessionData.user.name] : []}
                                        {...addPrinterForm.getInputProps('businessName')}
                                    />
                                </div>
                                <div className="flex flex-col mt-4">
                                    <label className="text-left mb-1">Marca</label>
                                    <TextInput
                                        placeholder="Creality, Ultimaker, etc"
                                        size="md"
                                        {...addPrinterForm.getInputProps('printerBrand')}
                                    />
                                </div>
                                <div className="flex flex-col mt-4">
                                    <label className="text-left mb-1">Modelo</label>
                                    <TextInput
                                        placeholder="Ender 3, Ender 3 V2, etc"
                                        size="md"
                                        {...addPrinterForm.getInputProps('printerModel')}
                                    />
                                </div>
                                <div className="flex flex-col mt-4">
                                    <label className="text-left mb-1">Tipo</label>
                                    <Select
                                        placeholder="FDM, Resina"
                                        size="md"
                                        data={[{ value: "FDM", label: "FDM" }, { value: "Resina", label: "Resina" }]}
                                        {...addPrinterForm.getInputProps('printerType')}
                                    />
                                </div>
                                <div className="flex flex-col mt-4">
                                    <label className="text-left mb-1">Area de Impresion (mm)</label>
                                    <TextInput
                                        placeholder="220x220x250"
                                        size="md"
                                        {...addPrinterForm.getInputProps('printerArea')}
                                    />
                                </div>
                            </form>
                            <div className="flex justify-between mt-6">
                                <Button className="bg-[#3B82F6]" onClick={handlePopupClose}>
                                    Cerrar
                                </Button>
                                <Button className="bg-[#3B82F6]" type="submit" form='addPrinterForm' loading={isLoading}>
                                    Enviar
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PrinterPopup;

