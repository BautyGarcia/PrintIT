import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Text, Textarea } from '@mantine/core';
import { api } from '~/utils/api';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';

const CancelWorkModal = ({ workId, refetch }: { workId: string, refetch: () => void }) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [reason, setReason] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { mutate: cancelWork } = api.work.cancelWork.useMutation();
    const { mutate: sendCancelEmail } = api.email.sendCancelationEmail.useMutation();

    return (
        <>
            <Modal opened={opened} onClose={close} title={<Text className="font-bold text-xl">Cancelación</Text>} centered>
                <div className='flex flex-col gap-5 mt-5 items-center'>
                    <Text className="text-2xl font-bold text-center w-[80%]">¿Está seguro que desea cancelar el trabajo?</Text>
                    <Textarea
                        placeholder="Ya no necesito esta pieza... No llegamos a un acuerdo..."
                        label="Motivo"
                        autosize
                        minRows={2}
                        onChange={(event) => setReason(event.currentTarget.value)}
                        className='w-full'
                    />
                    <Button
                        onClick={() => {
                            setIsLoading(true);
                            notifications.show({
                                id: 'cancel-work',
                                title: 'Cancelando trabajo...',
                                message: 'Estamos cancelando el trabajo...',
                                autoClose: false,
                                loading: true,
                                withCloseButton: false,
                            });

                            cancelWork({ workId }, {
                                onSuccess: () => {
                                    refetch();
                                    setIsLoading(false);
                                    notifications.update({
                                        id: 'cancel-work',
                                        title: 'Trabajo cancelado',
                                        message: 'El trabajo ha sido cancelado correctamente.',
                                        color: "green",
                                        autoClose: 3000,
                                        loading: false,
                                        withCloseButton: true,
                                    });
                                    sendCancelEmail({ workId, reason: reason || "El usuario no ingreso ninguna razón." });
                                    close();
                                },
                                onError: (error) => {
                                    setIsLoading(false);
                                    notifications.update({
                                        id: 'cancel-work',
                                        title: 'Error',
                                        message: "Hubo un error cancelando el trabajo. " + error.message,
                                        color: 'red',
                                        autoClose: 3000,
                                        loading: false,
                                        withCloseButton: true,
                                    });
                                }
                            });
                        }}
                        className='bg-red-500 py-2 w-full text-white hover:bg-red-700'
                    >
                        Cancelar trabajo
                    </Button>
                </div>
            </Modal>

            <Button
                onClick={open}
                className='bg-red-500 py-2 text-white hover:bg-red-700'
                loading={isLoading}
            >Cancelar</Button>
        </>
    );
}

export default CancelWorkModal;