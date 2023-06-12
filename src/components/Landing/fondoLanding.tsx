import Image from "next/image";

export const FondoLanding: React.FC = ({}) => {
  return (
    <Image
      className="h-screen w-full"
      src="/FondoLanding.png"
      alt="FondoLanding"
      width={680}
      height={880}
    />
  );
};
