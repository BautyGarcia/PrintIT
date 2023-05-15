import Image from "next/image"

interface LogoProps {
    width: number;
    height: number;
}

export const Logo: React.FC<LogoProps> = ({ width, height }) => {
    return <Image src= "/Logo.png" alt= "logo" width={width} height={height}/>
}