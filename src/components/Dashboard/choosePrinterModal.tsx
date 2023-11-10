import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group } from '@mantine/core';
import PrintersForSTLTable from "../Tables/possiblePrinters";

interface ChoosePrinterModalProps {
    fileSize: string;
    fileName: string;
    fileUrl: string;
    loading: boolean;
    printName: string;
    printQuality: string;
    printAmount: number;
    printPrice: number;
    printNotes: string;
    disabled: boolean;
}

const ChoosePrinterModal = (props: ChoosePrinterModalProps) => {
    const [opened, { open, close }] = useDisclosure(false);
    
    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                title="Elegir Impresora"
                fullScreen
                transitionProps={{ transition: 'fade', duration: 200 }}
            >
                <PrintersForSTLTable bedSize={props.fileSize} fileName={props.fileName} fileUrl={props.fileUrl} closePopup={close} printAmount={props.printAmount} printName={props.printName} printPrice={props.printPrice} printQuality={props.printQuality} printNotes={props.printNotes}/>
            </Modal>

            <Group position="center">
                <Button
                    onClick={open}
                    className="mb-4 w-full rounded-lg bg-blue-500 hover:bg-blue-700"
                    loading={props.loading}
                    disabled={props.disabled}
                >
                    {props.loading ? "Verificando Archivo..." : props.disabled ? "Archivo muy pesado" : "Elegir Impresora"}
                </Button>
            </Group>
        </>
    );
}

export default ChoosePrinterModal;
