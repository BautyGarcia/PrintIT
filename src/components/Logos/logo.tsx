import { useMantineColorScheme } from "@mantine/core";
import Image from "next/image";
import { useEffect, useState } from "react";

interface LogoProps {
  width: number;
  height: number;
}

export const Logo: React.FC<LogoProps> = ({ width, height }) => {
  const { colorScheme } = useMantineColorScheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render nothing during server-side rendering
  }

  return (
    <div className="flex items-center">
      <Image
        src={colorScheme === "light" ? "/General/Logo.png" : "/LogoWhite.png"}
        alt="logo"
        width={width}
        height={height}
      />
      <h2 className="font-family-Inter p-2">PrintIT</h2>
    </div>
  );
};
