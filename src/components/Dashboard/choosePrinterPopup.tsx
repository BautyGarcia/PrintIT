import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group } from '@mantine/core';
import PrintersForSTLTable from "../Tables/possiblePrinters";

interface ChoosePrinterPopupProps {
    fileSize: string;
    fileName: string;
    fileUrl: string;
}

const ChoosePrinterPopup = (props: ChoosePrinterPopupProps) => {
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
                <PrintersForSTLTable bedSize={props.fileSize} fileName={props.fileName} fileUrl={props.fileUrl} closePopup={close}/>
            </Modal>

            <Group position="center">
                <Button
                    onClick={open}
                    className="mb-4 w-60 rounded-lg bg-blue-500 hover:bg-blue-700"
                >
                    Confirmar
                </Button>
            </Group>
        </>
    );
}

export default ChoosePrinterPopup;
