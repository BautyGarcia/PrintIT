import Image from "next/image";

export const ContactIMG: React.FC = () => {
  return (
    <Image
      className="h-2/3 w-1/3 mt-28 mr-20"
      src="/ContactImg.png"
      alt="ContactIMg"
      width={680}
      height={880}
    />
  );
};
