import { Burger, Group, MediaQuery } from "@mantine/core";
import { Logo } from "./logo";
import SchemeButton from "./schemeButton";
import UserBox from "./userBox";
import { type SetStateAction } from "react";

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
      <main className="flex flex-row items-center gap-4">
        <Logo width={40} height={40} />
        <h1 className="font-family-Inter">PrintIT</h1>
      </main>
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
