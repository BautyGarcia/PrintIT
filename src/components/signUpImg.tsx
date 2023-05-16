import Image from "next/image"

interface LogoGoogleProps {
    width: number;
    height: number;
}

export const LogoSignUpIMG: React.FC<LogoGoogleProps> = ({ width, height }) => {
    return <Image src= "/SignUp.png" alt= "logoSignUp" width={width} height={height}/>
}