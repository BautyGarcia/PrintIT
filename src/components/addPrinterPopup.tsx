import { useDisclosure } from '@mantine/hooks';
import { Group, Button, TextInput, Text, useMantineColorScheme, CloseButton } from '@mantine/core';

const PrinterPopup: React.FC = () => {
    const [opened, { toggle, close }] = useDisclosure(false);
    const { colorScheme } = useMantineColorScheme();

    return (
        <>
            <Group className="flex justify-center">
                <Button
                    className={`${colorScheme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'
                        }`}
                    onClick={toggle}
                >
                    Open Popup
                </Button>
            </Group>

            {opened && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
                    <div className={colorScheme === "dark" ? "bg-[#1C2333] rounded-lg" : "bg-white rounded-lg"}>
                        <div className="p-6 max-h-[70vh] overflow-y-auto">
                            <div className='flex justify-between'>
                                <Text size="sm" mb="xs" weight={500}>
                                    Subscribe to the email newsletter
                                </Text>
                                <CloseButton onClick={toggle} />
                            </div>
                            <Group align="flex-end">
                                <TextInput placeholder="hello@gluesticker.com" sx={{ flex: 1 }} />
                                <Button onClick={toggle}
                                    className={
                                        colorScheme === "dark" ? "bg-[#7A82D9] text-white" : "bg-[#7A82D9] text-white"
                                    }
                                >Subscribe</Button>
                            </Group>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PrinterPopup;