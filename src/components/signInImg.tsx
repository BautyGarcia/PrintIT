import Image from "next/image"

interface LogoGoogleProps {
    width: number;
    height: number;
}

export const LogosignInIMG: React.FC<LogoGoogleProps> = ({ width, height }) => {
    return <Image src= "/SignIn.png" alt= "logoSignIn" width={width} height={height}/>
}