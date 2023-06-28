import Image from "next/image";

export const TopLandingPhone: React.FC = ({}) => {
  return (
    <Image
      className="absolute left-0 top-0"
      src="/TopLanding.png"
      alt="TopLanding"
      width={1920}
      height={880}
    />
  );
};
