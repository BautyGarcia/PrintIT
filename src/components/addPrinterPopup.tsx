import { useDisclosure } from '@mantine/hooks';
import { Group, Button, useMantineColorScheme, Stepper, Checkbox, TextInput, Text } from '@mantine/core';
import { IconPlus, IconUser, IconPrinter } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';

const PrinterPopup: React.FC = () => {
    const [opened, { toggle }] = useDisclosure(false);
    const { colorScheme } = useMantineColorScheme();
    const [active, setActive] = useState(0);
    const [isBusiness, setIsBusiness] = useState(false);
    const [businessName, setBusinessName] = useState("");
    const [businessEmail, setBusinessEmail] = useState("");
    const [businessPhone, setBusinessPhone] = useState("");
    const nextStep = () => setActive((current) => (current < 2 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    console.log
    return (
        <>
            <Link href="#" passHref className="flex items-center text-white no-underline text-sm bg-blue-500 px-3.5 py-2.5 mb-4 rounded-md font-semibold" onClick={toggle}>
                <IconPlus className="text-white mr-2.5" />
                <span>Registrar Impresora</span>
            </Link>

            {opened && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
                    <div className={colorScheme === "dark" ? "bg-[#1C2333] rounded-lg" : "bg-white rounded-lg"}>
                        <div className="p-8 max-h-[70vh] max-w-[75vw] min-w-[310px] overflow-y-auto">
                            <Stepper active={active} onStepClick={setActive} breakpoint="sm" allowNextStepsSelect={false}>
                                <Stepper.Step label="Información Personal" description="Nombre, Contacto, etc" icon={<IconUser size="1.1rem" />}>
                                    <Checkbox size="md" checked={isBusiness} className='mt-4' onChange={(e) => setIsBusiness(e.currentTarget.checked)} label="¿Sos una empresa o negocio?" />
                                    {isBusiness &&
                                        <>
                                            <div className="flex flex-col mt-4">
                                                <label className="text-left mb-1">Nombre del Negocio</label>
                                                <TextInput
                                                    placeholder="Globant, GroupIT, etc"
                                                    size="md"
                                                    onChange={(e) => setBusinessName(e.currentTarget.value)}
                                                />
                                            </div>
                                            <div className="flex flex-col mt-4">
                                                <label className="text-left mb-1">Email del Negocio</label>
                                                <TextInput
                                                    placeholder="ejemplo@globant.com.ar"
                                                    size="md"
                                                    onChange={(e) => setBusinessEmail(e.currentTarget.value)}
                                                />
                                            </div>
                                            <div className="flex flex-col mt-4">
                                                <label className="text-left mb-1">Teléfono del Negocio</label>
                                                <TextInput
                                                    placeholder="11 1234 5678"
                                                    size="md"
                                                    onChange={(e) => setBusinessPhone(e.currentTarget.value)}
                                                />
                                            </div>
                                        </>
                                    }
                                </Stepper.Step>
                                <Stepper.Step label="Impresora" description="Marca, Modelo, etc" icon={<IconPrinter size="1.1rem" />}>
                                    <div className="flex flex-col mt-4">
                                        <label className="text-left mb-1">Marca</label>
                                        <TextInput
                                            placeholder="Creality, Ultimaker, etc"
                                            size="md"
                                            onChange={(e) => setBusinessName(e.currentTarget.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col mt-4">
                                        <label className="text-left mb-1">Modelo</label>
                                        <TextInput
                                            placeholder="Ender 3, Ender 3 V2, etc"
                                            size="md"
                                            onChange={(e) => setBusinessName(e.currentTarget.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col mt-4">
                                        <label className="text-left mb-1">Tipo</label>
                                        <TextInput
                                            placeholder="FDM, Resina"
                                            size="md"
                                            onChange={(e) => setBusinessName(e.currentTarget.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col mt-4">
                                        <label className="text-left mb-1">Area de Impresion</label>
                                        <TextInput
                                            placeholder="220x220x250mm"
                                            size="md"
                                            onChange={(e) => setBusinessName(e.currentTarget.value)}
                                        />
                                    </div>
                                </Stepper.Step>
                                <Stepper.Completed>
                                    Felicitaciones, ya se registro tu impresora! Podes verla en la sección de <Link href="/dashboard/misImpresoras" passHref className='text-[#3b82f6]'><b>Mis Impresoras.</b></Link>
                                </Stepper.Completed>
                            </Stepper>

                            <div className="flex justify-between mt-6">
                                {active === 0 ? (
                                    <Button className="bg-[#3B82F6]" onClick={toggle}>
                                        Close
                                    </Button>
                                ) : (
                                    <Button className="bg-[#3B82F6]" onClick={prevStep}>
                                        Atrás
                                    </Button>
                                )}
                                {active === 2 ? (
                                    <Button className="bg-[#3B82F6]" onClick={toggle}>
                                        Close
                                    </Button>
                                ) : (
                                    <Button className="bg-[#3B82F6]" onClick={nextStep}>
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