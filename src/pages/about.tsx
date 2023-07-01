import { type NextPage } from "next";
import Head from "next/head";
import { LandingHeader } from "~/components/Landing/landingHeader";
import { Footer } from "~/components/Landing/footer";
import { useMantineColorScheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { LinkedinLOGO } from "~/components/Logos/linkedinLogo";

const About: NextPage = () => {
  const { colorScheme } = useMantineColorScheme();
  const largeScreen = useMediaQuery("(min-width: 1300px)");

  return (
    <>
      <Head>
        <title>PrintIT</title>
        <link rel="icon" href="/Logo.ico" />
        <meta name="description" content="PrintIT" />
      </Head>
      <LandingHeader />
      <main
        className={
          colorScheme === "dark"
            ? "flex h-[93vh] w-full bg-[#0E1525] p-10 pt-20"
            : "flex h-[93vh] w-full bg-[#F0F1F8] p-10 pt-20"
        }
      >
        <div
          className={
            largeScreen
              ? "font-family-Nunito mr-8  flex h-full w-full justify-center"
              : "flex h-full w-full items-center justify-center"
          }
        >
        </div>
      </main>
      <Footer />
    </>
  );
};

export default About;
