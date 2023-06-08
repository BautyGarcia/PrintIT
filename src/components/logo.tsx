import { useMantineColorScheme } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface LogoProps {
  width: number;
  height: number;
  href: string;
}

export const Logo: React.FC<LogoProps> = ({ width, height, href }) => {
  const { colorScheme } = useMantineColorScheme();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    console.log(href);
  }, []);

  if (!isClient) {
    return null; // Render nothing during server-side rendering
  }

  return (
    <Link href={href} passHref>
      <Image
        src={colorScheme === "light" ? "/Logo.png" : "/LogoWhite.png"}
        alt="logo"
        width={width}
        height={height}
      />
    </Link>
  );
};
