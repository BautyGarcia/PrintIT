import Image from "next/image";
import { useMediaQuery } from "@mantine/hooks";

export const TopLanding: React.FC = ({}) => {
  const largeScreen = useMediaQuery("(min-width: 1300px)");
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
