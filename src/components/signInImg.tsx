import Image from "next/image";
import { useEffect } from "react";

interface LogoGoogleProps {}

export const LogosignInIMG: React.FC<LogoGoogleProps> = ({}) => {
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
