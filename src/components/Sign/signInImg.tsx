import Image from "next/image";

export const LogosignInIMG: React.FC = ({}) => {
  return (
    <Image
      className="h-screen w-full"
      src="/SignIn.png"
      alt="logoSignIn"
      width={680}
      height={880}
    />
  );
};
