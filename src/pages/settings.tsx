import { type NextPage } from "next";
import Head from "next/head";
import { SettingsHeader } from "~/components/settingsHeader";
import { useMantineColorScheme } from "@mantine/core";
import UserSetting from "~/components/userSettings";
import { type SetStateAction } from "react";
import { Burger, Group, MediaQuery } from "@mantine/core";
import { useSession } from "next-auth/react";

interface SettingsProps {
  opened: boolean;
  setOpened: (value: SetStateAction<boolean>) => void;
  username: string;
  userImage: string;
}

const settings: React.FC<SettingsProps> = ({
  userImage,
  username,
  opened,
  setOpened,
}) => {
  const { colorScheme } = useMantineColorScheme();
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>PrintIT</title>
        <link rel="icon" href="/Logo.ico" />
        <meta name="description" content="PrintIT" />
      </Head>
      <SettingsHeader />
      <main
        className={
          colorScheme === "dark"
            ? "flex min-h-screen flex-col items-center justify-center bg-[#0E1525] from-[#2e026d] to-[#15162c]"
            : "flex min-h-screen flex-col items-center justify-center bg-[#F0F1F8] from-[#2e026d] to-[#15162c]"
        }
      >
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Group className=" flex flex-col">
            <UserSetting
              user={{
                name: sessionData?.user.name as string,
                image: sessionData?.user.image as string,
              }}
            />
          </Group>
        </MediaQuery>
      </main>
    </>
  );
};

export default settings;
