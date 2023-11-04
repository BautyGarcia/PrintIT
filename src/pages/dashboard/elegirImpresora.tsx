import { useState } from "react";
import { AppShell, Header, useMantineTheme } from "@mantine/core";
import { type NextPage } from "next";
import HomeHeader from "~/components/Dashboard/homeHeader";
import { useSession } from "next-auth/react";
import Head from "next/head";
import SessionChecker from "~/components/Sign/sessionChecker";

interface DashboardProps {
    children: React.ReactNode;
  }
  
  const ElegirImpresoras: NextPage<DashboardProps> = ({ children }) => {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const { data: sessionData } = useSession();
  
    return (
      <>
        <SessionChecker />
        <Head>
          <title>PrintIT</title>
          <link rel="icon" href="/Logo.ico" />
          <meta name="description" content="PrintIT" />
        </Head>
        <AppShell
          styles={{
            main: {
              background: theme.colorScheme === "dark" ? "#0E1525" : "#F0F1F8",
            },
          }}
          navbarOffsetBreakpoint="sm"
          asideOffsetBreakpoint="sm"
          header={
            <Header
              className={
                theme.colorScheme === "dark" ? "bg-[#1C2333]" : "bg-[#FFF]"
              }
              height={{ base: 50, md: 70 }}
              p="md"
            >
              <HomeHeader
                username={sessionData?.user.name as string}
                userImage={sessionData?.user.image as string}
                opened={opened}
                setOpened={setOpened}
              />
            </Header>
          }
        >
          {children}
        </AppShell>
      </>
    );
  };
  
  export default ElegirImpresoras;
  
