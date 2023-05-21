import { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  useMantineTheme,
} from '@mantine/core';
import { type NextPage } from "next";
import HomeNavBar from '~/components/homeNavBar';
import HomeHeader from '~/components/homeHeader';
import { useSession } from 'next-auth/react';
import Head from "next/head";
import STLDropzone from '~/components/fileDropzone';

const HomePage: NextPage = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>PrintIT</title>
        <link rel="icon" href="/Logo.ico" />
        <meta name="description" content="PrintIT" />
      </Head>
      <AppShell
        styles={{
          main: {
            background: theme.colorScheme === 'dark' ? "#0E1525" : "#F0F1F8",
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar className={theme.colorScheme === 'dark' ? 'bg-[#1C2333]' : 'bg-[#FFF]'} p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
            <HomeNavBar />
          </Navbar>
        }
        header={
          <Header className={theme.colorScheme === 'dark' ? 'bg-[#1C2333]' : 'bg-[#FFF]'} height={{ base: 50, md: 70 }} p="md">
            <HomeHeader username={sessionData?.user.name as string} userImage={sessionData?.user.image as string} opened={opened} setOpened={setOpened} />
          </Header>
        }
      >
        <STLDropzone />
      </AppShell>
    </>
  );
}

export default HomePage;