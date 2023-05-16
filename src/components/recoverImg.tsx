import Image from "next/image"

interface LogoGoogleProps {
    width: number;
    height: number;
}

export const RecoverIMG: React.FC<LogoGoogleProps> = ({ width, height }) => {
    return <Image src= "/Recover.png" alt= "logoRecover" width={width} height={height}/>
}