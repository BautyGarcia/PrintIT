import { useDisclosure } from "@mantine/hooks";
import {
    Button,
    Modal,
    Text,
    NumberInput,
    Timeline,
    Checkbox,
    Tooltip,
    Divider
} from "@mantine/core";
import { useState } from "react";
import { type RoleTypes, type WorkStatus } from "@prisma/client";
import { api } from "~/utils/api";
import { notifications } from "@mantine/notifications";
import { IconInfoCircleFilled } from "@tabler/icons-react";

interface PriceProps {
    id: string;
    amount: number;
    offeredAt: Date;
}

interface WorkInfo {
    id: string;
    status: WorkStatus;
    prices: PriceProps[];
    lastBidder: RoleTypes;
}

interface WorkSatusPopupProps {
    workInfo: WorkInfo;
    refreshWorks: () => void;
}

const PriceNegotiationModal = ({ workInfo, refreshWorks }: WorkSatusPopupProps) => {
    const { id, status, prices, lastBidder } = workInfo;
    const [opened, { open, close }] = useDisclosure(false);
    const [isBidding, setIsBidding] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [newPrice, setNewPrice] = useState(0);
    const { mutate: setNewWorkPrice } = api.work.updateWorkBid.useMutation();
    const { mutate: acceptWork } = api.work.setWorkToPaying.useMutation();
    const { mutate: sendNegotiationEmail } = api.email.sendNegotiationFinishedEmail.useMutation();
    const { mutate: sendUpdateBidEmail } = api.email.sendUpdateBidEmail.useMutation();
    const { data: userRoleType } = api.work.getUserRoleType.useQuery({
        workId: id,
    });

    const formatDate = (DateToFormat: Date) => {
        const inputDate = new Date(DateToFormat);
        const now = new Date();
        const timeDifference = now.getTime() - inputDate.getTime();
        const minutesAgo = Math.floor(timeDifference / 60000);
        const hoursAgo = Math.floor(minutesAgo / 60);
        const day = String(inputDate.getDate()).padStart(2, '0');
        const month = String(inputDate.getMonth() + 1).padStart(2, '0');
        const year = inputDate.getFullYear().toString().slice(2);

        if (hoursAgo < 24) {
            if (hoursAgo < 1) {
                return "Hace menos de una hora";
            } else if (hoursAgo === 1) {
                return "Hace 1 hora";
            } else {
                return `Hace ${hoursAgo} horas`;
            }
        } else {
            return `${day}/${month}/${year}`;
        }
    }

    const handleNewPrice = () => {
        setIsLoading(true);
        notifications.show({
            title: "Enviando contraoferta",
            id: "enviando-contraoferta",
            message: "Espere por favor",
            autoClose: false,
            loading: true,
            withCloseButton: false,
        });

        setNewWorkPrice({
            workId: id,
            bid: newPrice,
        }, {
            onSuccess: () => {
                sendUpdateBidEmail({
                    workId: id,
                }, {
                    onSuccess: () => {
                        notifications.update({
                            id: "enviando-contraoferta",
                            title: "Contraoferta enviada",
                            message: "Se ha enviado la contraoferta",
                            color: "green",
                            autoClose: 3000,
                            loading: false,
                            withCloseButton: true,
                        });
                        setIsLoading(false);
                        refreshWorks();
                        close();
                    },
                    onError: (error) => {
                        notifications.update({
                            id: "enviando-contraoferta",
                            title: "Error",
                            color: "red",
                            message: "Ha ocurrido un error al enviar la contraoferta" + error.message,
                            autoClose: 3000,
                            loading: false,
                            withCloseButton: true,
                        });
                        setIsLoading(false);
                        refreshWorks();
                        close();
                    }
                });
            },
            onError: (error) => {
                notifications.update({
                    id: "enviando-contraoferta",
                    title: "Error",
                    color: "red",
                    message: "Ha ocurrido un error al enviar la contraoferta" + error.message,
                    autoClose: 3000,
                    loading: false,
                    withCloseButton: true,
                });
                setIsLoading(false);
                refreshWorks();
                close();
            }
        });
    };

    const handleAcceptWork = () => {
        setIsLoading(true);
        notifications.show({
            title: "Finalizando negociación",
            id: "finalizando-negociacion",
            message: "Espere por favor",
            autoClose: false,
            loading: true,
            withCloseButton: false,
        });

        acceptWork({
            workId: id,
        }, {
            onSuccess: () => {
                sendNegotiationEmail({
                    workId: id,
                }, {
                    onSuccess: () => {
                        notifications.update({
                            id: "finalizando-negociacion",
                            title: "Negociación finalizada",
                            message: "Se ha finalizado el estado de negociación",
                            color: "green",
                            autoClose: 3000,
                            loading: false,
                            withCloseButton: true,
                        });
                        setIsLoading(false);
                        refreshWorks();
                        close();
                    },
                    onError: (error) => {
                        notifications.update({
                            id: "finalizando-negociacion",
                            title: "Error",
                            message: "Ha ocurrido un error al finalizar la negociación" + error.message,
                            color: "red",
                            autoClose: 3000,
                            loading: false,
                            withCloseButton: true,
                        });
                        setIsLoading(false);
                        refreshWorks();
                        close();
                    }
                });
            },
            onError: (error) => {
                notifications.update({
                    id: "finalizando-negociacion",
                    title: "Error",
                    message: "Ha ocurrido un error al finalizar la negociación" + error.message,
                    color: "red",
                    autoClose: 3000,
                    loading: false,
                    withCloseButton: true,
                });
                setIsLoading(false);
                refreshWorks();
                close();
            },
        });
    };

    return (
        <>
            <Button
                onClick={open}
                className='bg-blue-500 py-2 text-white hover:bg-blue-700'
            >
                Negociar Precio
            </Button>
            <Modal
                opened={opened}
                onClose={close}
                centered
                radius="md"
                title={
                    <div className="flex items-center gap-2">
                        <Text className="font-bold text-xl">Negociación de Precio</Text>
                        <Tooltip position="right" multiline w={220} withArrow label="Esta es la ventana de negociacion, donde podes ver todos los precios ofrecidos y poder llegar a un precio en comun con la otra persona. Si fuiste la ultima persona en ofertar, debes esperar a una respuesta.">
                            <IconInfoCircleFilled className="" size={20} />
                        </Tooltip>
                    </div>
                }
                trapFocus={false}
                padding="xl"
                overlayProps={{
                    opacity: 0.25,
                    blur: 4,
                }}>
                <div className="flex flex-col">
                    <Timeline bulletSize={24} active={prices.length - 1} lineWidth={6}>
                        {
                            prices.map((price, index) => (
                                <Timeline.Item pb={10} key={price.id}>
                                    <Text className="font-bold text-xl">${price.amount}</Text>
                                    <Text className="font-semibold">{index % 2 === 0 ? 'Cliente' : "Vendedor"}</Text>
                                    <Text>{formatDate(price.offeredAt)}</Text>
                                </Timeline.Item>
                            ))
                        }
                        {
                            (userRoleType !== lastBidder && status === "Negociacion") && (
                                <Timeline.Item key={"NewPrice"}>
                                    <div className="flex flex-col gap-5">
                                        <Checkbox
                                            label={"Quiero hacer una contraoferta"}
                                            checked={isBidding}
                                            size={"md"}

                                            onChange={() => setIsBidding(!isBidding)}
                                        />
                                        {
                                            isBidding ? (
                                                <div className="flex flex-col w-2/3 gap-5">
                                                    <NumberInput
                                                        placeholder="Precio"
                                                        value={newPrice}
                                                        onChange={(value) => setNewPrice(value as number)}
                                                        size="md"
                                                        min={0}
                                                        max={100000}
                                                        step={1}
                                                    />
                                                    <Button
                                                        className='bg-blue-500 py-2 text-white hover:bg-blue-700'
                                                        onClick={handleNewPrice}
                                                        loading={isLoading}
                                                    >
                                                        Enviar contraoferta
                                                    </Button>
                                                </div>
                                            ) : (
                                                <Button
                                                    className='bg-blue-500 py-2 text-white hover:bg-blue-700 w-2/3'
                                                    onClick={handleAcceptWork}
                                                    loading={isLoading}
                                                >
                                                    Aceptar precio
                                                </Button>
                                            )
                                        }
                                    </div>
                                </Timeline.Item>
                            )
                        }
                    </Timeline>
                    {
                        userRoleType === lastBidder && status === "Negociacion" && (
                            <>
                                <Divider variant="dashed" size={"md"} mt={20}/>
                                <Text className="font-bold text-xl mt-4 text-center">Espera a una respuesta para poder proponer otro precio.</Text>
                            </>
                        )
                    }
                </div>
            </Modal>
        </>
    );
};

export default PriceNegotiationModal;
