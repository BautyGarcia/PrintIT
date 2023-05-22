import Image from "next/image";

export const LogoSignUpIMG: React.FC = ({ }) => {
  return (
    <Image
      className="h-screen w-full"
      src="/SignUp.png"
      alt="logoSignUp"
      width={680}
      height={880} />
  );
};
