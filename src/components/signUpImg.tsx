import Image from "next/image";

interface LogoGoogleProps {}

export const LogoSignUpIMG: React.FC<LogoGoogleProps> = ({}) => {
  return <Image src="/SignUp.png" alt="logoSignUp" width={680} height={880} />;
};
