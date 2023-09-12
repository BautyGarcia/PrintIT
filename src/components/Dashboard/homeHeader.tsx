import { Burger, Group, MediaQuery } from "@mantine/core";
import { Logo } from "../Logos/logo";
import SchemeButton from "../Landing/schemeButton";
import UserBox from "./userBox";
import { type SetStateAction } from "react";
import Link from "next/link";

interface HomeHeaderProps {
  opened: boolean;
  setOpened: (value: SetStateAction<boolean>) => void;
  username: string;
  userImage: string;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
  userImage,
  username,
  opened,
  setOpened,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <Group className="flex flex-row items-center gap-2">
        <Link className="flex flex-row items-center gap-2" href="#" passHref>
          <Logo width={40} height={40} />
        </Link>
      </Group>
      <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        <Burger
          opened={opened}
          onClick={() => setOpened((o) => !o)}
          size="sm"
          color="#AEAEAE"
          mr="xxs"
        />
      </MediaQuery>
      <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        <Group>
          <SchemeButton />
          <UserBox user={{ name: username, image: userImage }} />
        </Group>
      </MediaQuery>
    </div>
  );
};

export default HomeHeader;
