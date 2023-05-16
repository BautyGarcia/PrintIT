import Image from "next/image"

interface LogoProps {
    width: number;
    height: number;
    justifyContent: string;
    display: string;
}

export const Logo: React.FC<LogoProps> = ({ width, height }) => {
    return <Image src= "/Logo.png" alt= "logo" width={width} height={height}/>
}