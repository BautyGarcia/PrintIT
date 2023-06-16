import { NextPage } from "next";
import Head from "next/head";
import { LandingHeader } from "~/components/landingHeader";
import { Footer } from "~/components/footer";
import { useMantineColorScheme } from "@mantine/core";
import { TopAboutUs } from "~/components/topaboutimg";
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
        <div className="bg-[url('/img/TopAbout.png')]">

        </div>
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
      <div>

      </div>


    </form>
  );
}
