import { NextPage } from "next";
import Head from "next/head";
import { LandingHeader } from "~/components/landingHeader";
import { Footer } from "~/components/footer";
import { useMantineColorScheme } from "@mantine/core";

const About: NextPage = () => {
  const { colorScheme } = useMantineColorScheme();

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
          "h-screen w-full bg-[#0E1525] from-[#2e026d] to-[#15162c]"
          :
          "h-screen w-full bg-[#F0F1F8] from-[#2e026d] to-[#15162c]"
        }
      >
        <div>
        <AboutUs/>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default About;


export function AboutUs(){

  return (
    <form> 

      <svg width="500" height="80" viewBox="0 0 500 80" preserveAspectRatio="none">
      <path d="M500,5000  L0,40 Q250,80 500,40 L500,0 Z"
       fill="black" />
      </svg>

    </form>
  );
}
