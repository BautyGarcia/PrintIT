import { useDisclosure } from "@mantine/hooks";
import {
    Button,
    Modal,
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
//{ workInfo, refreshWorks }: WorkSatusPopupProps
const WorkSatusPopup = () => {
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
                {/*Content Here*/}
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
