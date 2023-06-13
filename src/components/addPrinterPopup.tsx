import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Button, useMantineColorScheme, Stepper, Checkbox, TextInput } from '@mantine/core';
import { IconPlus, IconUser, IconPrinter } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useSession } from "next-auth/react";

const PrinterPopup: React.FC = () => {
    const [opened, { toggle }] = useDisclosure(false);
    const { colorScheme } = useMantineColorScheme();
    const largeScreen = useMediaQuery('(min-width: 60em)');
    const [active, setActive] = useState(0);
    const [isBusiness, setIsBusiness] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { data: SessionData } = useSession();

    const handlePopupClose = () => {
        toggle();
        setActive(0);
        setIsBusiness(false);
        businessForm.setErrors({});
    };

    const businessForm = useForm({
        initialValues: { businessName: '', businessEmail: '' },
        validate: isBusiness
            ? {
                businessName: isNotEmpty(),
                businessEmail: isEmail(),
            }
            : {},
    });

    const printerForm = useForm({
        initialValues: { firstName: '', lastName: '' },
        validate: {
            firstName: (value) => (value.length < 2 ? 'First name is too short' : null),
            lastName: (value) => (value.length < 2 ? 'Last name is too short' : null),
        },
    });

    const handleError = (errors: typeof businessForm.errors | typeof printerForm.errors) => {
        if (isBusiness) {
            if (errors.businessName) {
                notifications.show({
                    title: 'Error',
                    message: 'Por favor complete el nombre del negocio.',
                    color: 'red',
                    autoClose: 5000,
                });
            } else if (errors.businessEmail) {
                notifications.show({ title: 'Error', message: 'Este email no es válido.', color: 'red', autoClose: 5000 });
            } else if (errors.businessPhone) {
                notifications.show({
                    title: 'Error',
                    message: 'Este número de teléfono es inválido.',
                    color: 'red',
                    autoClose: 5000,
                });
            }
        }
    };

    const handleBusinessSubmit = (values: typeof businessForm.values) => {
        setIsLoading(true);
        if(isBusiness){
            //Aca agarro los datos de businessForm.values.x y hago el create en la base de datos
        }
        // Si no es un business tengo que agarrar los datos de SessionData
        setTimeout(() => {
            setIsLoading(false);
            nextStep();
        }, 2000);
    };

    const nextStep = () => setActive((current) => (current < 2 ? current + 1 : current));

    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    const validatePersonalInfo = () => {
        setIsLoading(true);
        // Simulating validation with setTimeout
        setTimeout(() => {
            setIsLoading(false);
            nextStep();
        }, 2000);
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
                            <Stepper active={active} onStepClick={setActive} breakpoint="sm" size="sm" allowNextStepsSelect={false}>
                                <Stepper.Step label="Información Personal" description="Nombre, Contacto, etc" icon={<IconUser size="1.1rem" />}>
                                    <Checkbox size="md" checked={isBusiness} className="mt-4" onChange={(e) => setIsBusiness(e.currentTarget.checked)} label="¿Sos una empresa o negocio?" />

                                    <form id='businessForm' onSubmit={businessForm.onSubmit(handleBusinessSubmit, handleError)}>
                                        <div className="flex flex-col mt-4">
                                            <label className="text-left mb-1">{isBusiness ? "Nombre del Negocio" : "Nombre"}</label>
                                            <TextInput
                                                placeholder="Globant, GroupIT, etc"
                                                size="md"
                                                disabled={!isBusiness}
                                                {...businessForm.getInputProps('businessName')}
                                                value={!isBusiness ? SessionData?.user.name as string : businessForm.values.businessName}
                                            />
                                        </div>
                                        <div className="flex flex-col mt-4">
                                            <label className="text-left mb-1">{isBusiness ? "Email del Negocio" : "Email"}</label>
                                            <TextInput
                                                placeholder="ejemplo@globant.com.ar"
                                                size="md"
                                                disabled={!isBusiness}
                                                {...businessForm.getInputProps('businessEmail')}
                                                value={!isBusiness ? SessionData?.user.email as string : businessForm.values.businessEmail}
                                            />
                                        </div>
                                    </form>

                                </Stepper.Step>
                                <Stepper.Step label="Impresora" description="Marca, Modelo, etc" icon={<IconPrinter size="1.1rem" />}>
                                    <div className="flex flex-col mt-4">
                                        <label className="text-left mb-1">Marca</label>
                                        <TextInput
                                            placeholder="Creality, Ultimaker, etc"
                                            size="md"
                                        />
                                    </div>
                                    <div className="flex flex-col mt-4">
                                        <label className="text-left mb-1">Modelo</label>
                                        <TextInput
                                            placeholder="Ender 3, Ender 3 V2, etc"
                                            size="md"
                                        />
                                    </div>
                                    <div className="flex flex-col mt-4">
                                        <label className="text-left mb-1">Tipo</label>
                                        <TextInput
                                            placeholder="FDM, Resina"
                                            size="md"
                                        />
                                    </div>
                                    <div className="flex flex-col mt-4">
                                        <label className="text-left mb-1">Area de Impresion</label>
                                        <TextInput
                                            placeholder="220x220x250mm"
                                            size="md"
                                        />
                                    </div>
                                </Stepper.Step>
                                <Stepper.Completed>
                                    Felicitaciones, ya se registro tu impresora! Podes verla en la sección de{' '}
                                    <Link href="/dashboard/misImpresoras" passHref className="text-[#3b82f6]">
                                        <b>Mis Impresoras.</b>
                                    </Link>
                                </Stepper.Completed>
                            </Stepper>

                            <div className="flex justify-between mt-6">
                                {active === 0 ? (
                                    <Button className="bg-[#3B82F6]" onClick={handlePopupClose}>
                                        Cerrar
                                    </Button>
                                ) : active === 2 ? (
                                    <div />
                                ) : (
                                    <Button className="bg-[#3B82F6]" onClick={prevStep}>
                                        Atrás
                                    </Button>
                                )}
                                {active === 2 ? (
                                    <Button className="bg-[#3B82F6]" onClick={handlePopupClose}>
                                        Cerrar
                                    </Button>
                                ) : active === 1 ? (
                                    <Button className="bg-[#3B82F6]" type="submit" loading={isLoading}>
                                        Enviar
                                    </Button>
                                ) : (
                                    <Button className="bg-[#3B82F6]" type="submit" form='businessForm' loading={isLoading}>
                                        Siguiente
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PrinterPopup;

