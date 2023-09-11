import { useDisclosure } from "@mantine/hooks";
import {
    Button,
    Modal,
    Text,
    Switch,
    useMantineTheme,
    Divider,
    NumberInput,
} from "@mantine/core";
import {
    Badge,
    HoverCard,
} from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { type RoleTypes, type WorkStatus } from "@prisma/client";
import { api } from "~/utils/api";
import { notifications } from "@mantine/notifications";

interface WorkInfo {
    id: string;
    status: WorkStatus;
    price: number;
    lastBidder: RoleTypes;
}

interface WorkSatusPopupProps {
    workInfo: WorkInfo;
    refreshWorks: () => void;
}

const WorkSatusPopup = ({ workInfo, refreshWorks }: WorkSatusPopupProps) => {
    const { id, status, price, lastBidder } = workInfo;
    const [opened, { open, close }] = useDisclosure(false);
    const [isBidding, setIsBidding] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [newPrice, setNewPrice] = useState(0);
    const { mutate: setNewWorkPrice } = api.work.updateWorkBid.useMutation();
    const { mutate: acceptWork } = api.work.setWorkToPrinting.useMutation();
    const { mutate: sendNegotiationEmail } = api.email.sendNegotiationFinishedEmail.useMutation();
    const { mutate: sendUpdateBidEmail } = api.email.sendUpdateBidEmail.useMutation();
    const { data: userRoleType } = api.work.getUserRoleType.useQuery({
        workId: id,
    });

    const theme = useMantineTheme();

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
                withCloseButton={false}
                radius="md"
                trapFocus={false}
                padding="xl"
                overlayProps={{
                    opacity: 0.25,
                    blur: 4,
                }}>
                <div className="flex flex-col">
                    <div className="flex flex-row justify-between">
                        <HoverCard>
                            <HoverCard.Target>
                                <Badge size="xl" radius="sm" variant="filled" className="bg-[#3b82f6]">{status}</Badge>
                            </HoverCard.Target>
                            <HoverCard.Dropdown>
                                <Text>Estado del trabajo</Text>
                            </HoverCard.Dropdown>
                        </HoverCard>
                        <HoverCard>
                            <HoverCard.Target>
                                <Badge size="xl" radius="sm" variant="filled" className="bg-[#3b82f6]">{price}$</Badge>
                            </HoverCard.Target>
                            <HoverCard.Dropdown>
                                <Text>Ultima propuesta de Precio</Text>
                            </HoverCard.Dropdown>
                        </HoverCard>
                        <HoverCard>
                            <HoverCard.Target>
                                <Badge size="xl" radius="sm" variant="filled" className="bg-[#3b82f6]">{lastBidder === "CLIENT" ? "Cliente" : "Vendedor"}</Badge>
                            </HoverCard.Target>
                            <HoverCard.Dropdown>
                                <Text>Último postor</Text>
                            </HoverCard.Dropdown>
                        </HoverCard>
                    </div>
                    <Divider className="mt-6" size="sm" />
                    {
                        lastBidder !== userRoleType && status === "Negociacion" ?
                            <>
                                <div className="flex flex-row items-end justify-around mt-10">
                                    <h1 className="text-lg font-bold text-center">¿Desea presentar una contraoferta?</h1>
                                    <Switch
                                        size="md"
                                        checked={isBidding}
                                        onChange={() => setIsBidding(!isBidding)}
                                        color="teal"
                                        className="self-center"
                                        thumbIcon={
                                            isBidding ? (
                                                <IconCheck size="0.8rem" color={theme.colors.teal[theme.fn.primaryShade()]} stroke={3} />
                                            ) : (
                                                <IconX size="0.8rem" color={theme.colors.red[theme.fn.primaryShade()]} stroke={3} />
                                            )
                                        }
                                    />
                                </div>
                                {
                                    status === "Negociacion" &&
                                    isBidding &&
                                    <div>
                                        <NumberInput
                                            value={newPrice}
                                            className="mt-6"
                                            defaultValue={1000}
                                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                            onChange={(value) => setNewPrice(value || 0)}
                                            min={0}
                                            hideControls
                                            formatter={(value) =>
                                                !Number.isNaN(parseFloat(value))
                                                    ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, '.')
                                                    : '$ '
                                            }
                                        />
                                    </div>
                                }
                            </>
                            :
                            <Text fw={500} className="mt-6 text-xl text-center">Su contraoferta ha sido enviada, por favor espere a una respuesta antes de continuar.</Text>
                    }
                </div>
                <div className="mt-6 flex justify-between">
                    <Button className="bg-[#3B82F6]" onClick={close}>
                        Cerrar
                    </Button>
                    {
                        status === "Negociacion" &&
                        lastBidder !== userRoleType &&
                        <Button className="bg-[#3B82F6]" disabled={isLoading} onClick={isBidding ? () => handleNewPrice() : () => handleAcceptWork()}>
                            {isBidding ? "Enviar" : "Aceptar"}
                        </Button>
                    }
                </div>
            </Modal>
        </>
    );
};

export default WorkSatusPopup;
