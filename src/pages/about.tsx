import { type NextPage } from "next";
import Head from "next/head";
import { NavBar } from "~/components/navBar";
import { Footer } from "~/components/footer";

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>PrintIT</title>
        <link rel="icon" href="/Logo.ico" />
        <meta name="description" content="PrintIT" />
      </Head>
      <NavBar />
      <main className="h-screen w-full bg-white"></main>
      <Footer />
    </>
  );
};

export default About;
