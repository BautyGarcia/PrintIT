import Image from "next/image";

export const ContactIMG: React.FC = () => {
  return (
    <Image
      className="h-screen w-full"
      src="/ContactImg.png"
      alt="ContactIMg"
      width={680}
      height={880}
    />
  );
};
