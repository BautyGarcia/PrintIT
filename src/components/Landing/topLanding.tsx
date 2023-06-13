import Image from "next/image";

export const TopLanding: React.FC = ({}) => {
  return (
    <Image
      className="absolute left-0 top-0"
      src="/TopLanding.png"
      alt="TopLanding"
      width={1920}
      height={680}
    />
  );
};
