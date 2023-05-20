import { useMantineColorScheme } from "@mantine/core";
import Image from "next/image"

interface LogoProps {
    width: number;
    height: number;
    justifyContent?: string;
    display?: string;
}

export const Logo: React.FC<LogoProps> = ({ width, height }) => {
    const { colorScheme } = useMantineColorScheme();
    
    return (
        <Image 
            src= {colorScheme === 'light' ? "/Logo.png" : "/LogoWhite.png"} 
            alt= "logo" 
            width={width} 
            height={height}
        />
    )
}