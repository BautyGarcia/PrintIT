import { useDisclosure } from "@mantine/hooks";
import {
    Button,
    Modal,
    Text,
    Input
} from "@mantine/core";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { type RoleTypes, type WorkStatus } from "@prisma/client";

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
    const [isLoading, setIsLoading] = useState(false);
    const { data: SessionData } = useSession();

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
                onClose={() => console.log("closed")}
                centered
                withCloseButton={false}
                radius="md"
                trapFocus={false}
                padding="xl"
                overlayProps={{
                    opacity: 0.25,
                    blur: 4,
                }}>
                <div className="p-4">
                    <div className="mb-4 text-lg font-bold">Estado del trabajo</div>
                    <div className="mb-4">
                        <Text size="xl">{status}</Text>
                    </div>
                    <div className="mb-4 text-lg font-bold">Precio del trabajo</div>
                    <div className="mb-4">
                        <Input
                            value={price}
                            onChange={(event) => console.log(event.target.value)}
                            type="number"
                        />
                    </div>
                    <div className="mb-4 text-lg font-bold">Último postor</div>
                    <div className="mb-4">
                        <Text size="xl">{lastBidder}</Text>
                    </div>
                    <div className="mt-6 flex justify-between">
                        <Button className="bg-[#3B82F6]" onClick={close}>
                            Cerrar
                        </Button>
                        {/* You can add a button to save the edited price here */}
                    </div>
                </div>
                <div className="mt-6 flex justify-between">
                    <Button className="bg-[#3B82F6]" onClick={close}>
                        Cerrar
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default WorkSatusPopup;
