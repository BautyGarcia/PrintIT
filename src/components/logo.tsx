import { useMantineColorScheme } from "@mantine/core";
import Image from "next/image"
import Link from "next/link";

interface LogoProps {
    width: number;
    height: number;
    justifyContent?: string;
    display?: string;
}

export const Logo: React.FC<LogoProps> = ({ width, height }) => {
    const { colorScheme } = useMantineColorScheme();

    return (
        <Link
            href="/"
        >
            <Image
                src={colorScheme === 'light' ? "/Logo.png" : "/LogoWhite.png"}
                alt="logo"
                width={width}
                height={height}
            />
        </Link>

    )
}