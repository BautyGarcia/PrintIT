import { type NextPage } from "next";
import Head from "next/head";
import { LandingHeader } from "~/components/landingHeader";
import { Footer } from "~/components/footer";
import PrinterPopup from "~/components/addPrinterPopup";
import { useMantineColorScheme } from "@mantine/core";

const Landing: NextPage = () => {
  const { colorScheme } = useMantineColorScheme();

//flex min-h-screen flex-col items-center justify-center bg-white from-[#2e026d] to-[#15162c]
  return (
    <>
      <Head>
        <title>PrintIT</title>
        <link rel="icon" href="/Logo.ico" />
        <meta name="description" content="PrintIT" />
      </Head>
      <LandingHeader />
      <main
        className=
        {
          colorScheme === "dark" ?
          "flex min-h-screen flex-col items-center justify-center bg-[#0E1525] from-[#2e026d] to-[#15162c]"
          :
          "flex min-h-screen flex-col items-center justify-center bg-[#F0F1F8] from-[#2e026d] to-[#15162c]"
        }
      >
        <PrinterPopup />
      </main>
      <Footer />
    </>
  );
};

export default Landing;
