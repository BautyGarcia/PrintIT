import Image from "next/image";
import { Text } from "@mantine/core";

const NoPrintersImage = () => {
    return (
        <div className="flex flex-col w-full h-full items-center justify-center gap-5">
            <Text className="font-bold text-[50px] text-center">Parece que no hay nada por aca...</Text>
            <Image src={"/Tables/PrinterImage.png"} alt="printer" height={500} width={500} />
            <Text className="font-bold text-[50px] text-center">Esperemos que alguien proponga su impresora</Text>
        </div>
    );
}

export default NoPrintersImage;