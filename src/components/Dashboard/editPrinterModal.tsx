import { useDisclosure } from "@mantine/hooks";
import {
    Button,
    TextInput,
    Autocomplete,
    Select,
    Modal,
} from "@mantine/core";
import Link from "next/link";
import { useState } from "react";
import { isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useSession } from "next-auth/react";
import { Logo } from "../Logos/logo";
import { api } from "~/utils/api";

interface PrinterInfo {
    id: string;
    name: string;
    brand: string;
    model: string;
    type: string;
    bedSize: string;
}

interface EditPrinterModalProps {
    printerInfo: PrinterInfo;
    refreshPrinters: () => void;
}

const EditPrinterModal = ({ printerInfo, refreshPrinters }: EditPrinterModalProps) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [isLoading, setIsLoading] = useState(false);
    const { data: SessionData } = useSession();
    const { mutate: editPrinter } = api.printer.updatePrinter.useMutation();

    const handlePopupClose = () => {
        close();
        editPrinterForm.reset();
    };

    const editPrinterForm = useForm({
        initialValues: {
            businessName: printerInfo.name,
            printerBrand: printerInfo.brand,
            printerModel: printerInfo.model,
            printerType: printerInfo.type,
            printerArea: printerInfo.bedSize,
        },
        validate: {
            businessName: isNotEmpty(),
            printerBrand: isNotEmpty(),
            printerModel: isNotEmpty(),
            printerType: isNotEmpty(),
            printerArea: (value) => (/^\d{3}x\d{3}x\d{3}$/.test(value) ? null : true),
        },
    });

    const handleError = (errors: typeof editPrinterForm.errors) => {
        if (
            errors.businessName ||
            errors.printerBrand ||
            errors.printerModel ||
            errors.printerType
        ) {
            notifications.show({
                title: "Error",
                message: "Por favor complete todos los campos.",
                color: "red",
                autoClose: 5000,
            });
        } else if (errors.printerArea) {
            notifications.show({
                title: "Error",
                message: "El area de impresion debe tener este formato: 220x220x250",
                color: "red",
                autoClose: 5000,
            });
        }
    };

    const handleFormSubmit = (values: typeof editPrinterForm.values) => {
        setIsLoading(true);
        notifications.show({
            title: "Actualizando impresora",
            id: "updatePrinter",
            message: "Espere por favor",
            autoClose: false,
            loading: true,
            withCloseButton: false,
        });
        editPrinter(
          {
            printerId: printerInfo.id,
            printerOwner: values.businessName,
            printerBrand: values.printerBrand,
            printerModel: values.printerModel,
            printerType: values.printerType,
            printerArea: values.printerArea,
          },
          {
            onSuccess: () => {
              notifications.update({
                id: "updatePrinter",
                title: "Impresora actualizada",
                message: "La impresora ha sido actualizada correctamente.",
                color: "green",
                autoClose: 5000,
              });
              setIsLoading(false);
              refreshPrinters();
              handlePopupClose();
            },
            onError: (error) => {
              notifications.update({
                id: "updatePrinter",
                title: "Error",
                message: error.message,
                color: "red",
                autoClose: 5000,
              });
              setIsLoading(false);
            },
          }
        );
    };

    return (
        <>
            <Button
                onClick={open}
                className='bg-blue-500 py-2 text-white hover:bg-blue-700'
            >
                Editar
            </Button>
            <Modal
                opened={opened}
                onClose={handlePopupClose}
                centered
                withCloseButton={false}
                radius="md"
                trapFocus={false}
                padding="xl"
                overlayProps={{
                    opacity: 0.25,
                    blur: 4,
                }}>
                <form
                    id="editPrinterForm"
                    onSubmit={editPrinterForm.onSubmit(
                        handleFormSubmit,
                        handleError
                    )}
                >
                    <Link className="flex flex-row items-center gap-2" href="" passHref>
                        <Logo width={40} height={40} />
                    </Link>
                    <div className="mt-4 flex flex-col">
                        <label className="mb-1 text-left">
                            Nombre del Propietario
                        </label>
                        <Autocomplete
                            placeholder="Manuel, Rulo3D, Globant, etc"
                            size="md"
                            data={
                                SessionData?.user?.name ? [SessionData.user.name] : []
                            }
                            {...editPrinterForm.getInputProps("businessName")}
                        />
                    </div>
                    <div className="mt-4 flex flex-col">
                        <label className="mb-1 text-left">Marca</label>
                        <TextInput
                            placeholder="Creality, Ultimaker, etc"
                            size="md"
                            {...editPrinterForm.getInputProps("printerBrand")}
                        />
                    </div>
                    <div className="mt-4 flex flex-col">
                        <label className="mb-1 text-left">Modelo</label>
                        <TextInput
                            placeholder="Ender 3, Ender 3 V2, etc"
                            size="md"
                            {...editPrinterForm.getInputProps("printerModel")}
                        />
                    </div>
                    <div className="mt-4 flex flex-col">
                        <label className="mb-1 text-left">Tipo</label>
                        <Select
                            placeholder="FDM, Resina"
                            size="md"
                            data={[
                                { value: "FDM", label: "FDM" },
                                { value: "Resina", label: "Resina" },
                            ]}
                            {...editPrinterForm.getInputProps("printerType")}
                        />
                    </div>
                    <div className="mt-4 flex flex-col">
                        <label className="mb-1 text-left">
                            Area de Impresion (mm)
                        </label>
                        <TextInput
                            placeholder="220x220x250"
                            size="md"
                            {...editPrinterForm.getInputProps("printerArea")}
                        />
                    </div>
                </form>
                <div className="mt-6 flex justify-between">
                    <Button className="bg-[#3B82F6]" onClick={handlePopupClose}>
                        Cerrar
                    </Button>
                    <Button
                        className="bg-[#3B82F6]"
                        type="submit"
                        form="editPrinterForm"
                        loading={isLoading}
                    >
                        Enviar
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default EditPrinterModal;
