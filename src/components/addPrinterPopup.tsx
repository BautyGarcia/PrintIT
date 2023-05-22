import { useDisclosure } from '@mantine/hooks';
import { Group, Button, useMantineColorScheme, Stepper } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';

const PrinterPopup: React.FC = () => {
    const [opened, { toggle }] = useDisclosure(false);
    const { colorScheme } = useMantineColorScheme();
    const [active, setActive] = useState(1);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    return (
        <>
            <Link href="#" passHref className="flex items-center text-white no-underline text-sm bg-blue-500 px-3.5 py-2.5 mb-4 rounded-md font-semibold" onClick={toggle}>
                <IconPlus className="text-white mr-2.5" />
                <span>Registrar Impresora</span>
            </Link>

            {opened && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
                    <div className={colorScheme === "dark" ? "bg-[#1C2333] rounded-lg" : "bg-white rounded-lg"}>
                        <div className="p-6 max-h-[70vh] overflow-y-auto">
                            <Stepper active={active} onStepClick={setActive} breakpoint="sm">
                                <Stepper.Step label="Información Personal" description="Nombre, Contacto, etc">
                                    Formulario 1
                                </Stepper.Step>
                                <Stepper.Step label="Impresora" description="Marca, Modelo, etc">
                                    Formulario 2
                                </Stepper.Step>
                                <Stepper.Step label="Confirmación" description="¡Atento!">
                                    Revision de los datos formulario
                                </Stepper.Step>
                                <Stepper.Completed>
                                    Felicitaciones, se agregara tu impresora
                                </Stepper.Completed>
                            </Stepper>

                            <Group position="center" mt="xl">
                                { active === 0 ? <Button className="bg-[#3B82F6]" onClick={toggle}>Close</Button> : <Button className="bg-[#3B82F6]" onClick={prevStep}>Atras</Button> }
                                { active === 3 ? <Button className="bg-[#3B82F6]" onClick={toggle}>Close</Button> : <Button className="bg-[#3B82F6]" onClick={nextStep}>Siguiente</Button>}
                            </Group>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PrinterPopup;