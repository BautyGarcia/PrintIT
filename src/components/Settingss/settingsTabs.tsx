import { Tabs } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useMantineColorScheme } from "@mantine/core";
import { Group, MediaQuery } from "@mantine/core";
import UserSetting from "~/components/Settingss/userSettings";

interface SettingsProps {
  username: string;
  userImage: string;
}

const Datos: React.FC<SettingsProps> = ({}) => {
  const { colorScheme } = useMantineColorScheme();
  const { data: sessionData } = useSession();

  return (
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
  );
};

function SettingsTab() {
  return (
    <Tabs className="w-full" color="teal" defaultValue="first">
      <Tabs.List>
        <Tabs.Tab value="first">Profile</Tabs.Tab>
        <Tabs.Tab value="second" color="blue">
          Configuration
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="first" pt="xs">
        Datos
      </Tabs.Panel>

      <Tabs.Panel value="second" pt="xs">
        2do
      </Tabs.Panel>
    </Tabs>
  );
}

export default SettingsTab;
