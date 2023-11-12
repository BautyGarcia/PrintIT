import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Text, Avatar, Divider } from '@mantine/core';

const SellerInformationModal = ({ imageUrl, username, email }: { imageUrl: string, username: string, email: string }) => {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={close} title={<Text className="font-bold text-xl">Informacion de Vendedor</Text>} centered>
                <Divider className="mb-4" size={"sm"} variant='dashed' />
                <Avatar src={imageUrl} alt={username} size={150} className="mx-auto mb-4 rounded-full" />
                <Text className="text-center font-bold text-3xl">{username}</Text>
                <Text className="text-center text-xl">{email}</Text>
                <div className='flex justify-between mt-5'>
                    <Button onClick={close} className='bg-blue-500 py-2 mt-4 text-white hover:bg-blue-700'>Cerrar</Button>
                    <Button onClick={() => {
                        window.open(`mailto:${email}`, "_blank");
                    }}
                        className='bg-blue-500 py-2 mt-4 text-white hover:bg-blue-700'
                    >
                        Contactar
                    </Button>
                </div>
            </Modal>

            <Button onClick={open} className='bg-blue-500 py-2 ml-2 text-white hover:bg-blue-700'>Vendedor</Button>
        </>
    );
}

export default SellerInformationModal;