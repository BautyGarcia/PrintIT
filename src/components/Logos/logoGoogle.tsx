import Image from "next/image"

interface LogoGoogleProps {
    width: number;
    height: number;
}

export const LogoGoogle: React.FC<LogoGoogleProps> = ({ width, height }) => {
    return <Image src= "/General/LogoGoogle.png" alt= "logoGoogle" width={width} height={height}/>
}