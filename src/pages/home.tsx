import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { NavBar } from "~/components/navBar";
import { Footer } from "~/components/footer";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  return (
    <>
      <Head>
        <title>PrintIT</title>
        <link rel="icon" href="/Logo.ico" />
        <meta name="description" content="PrintIT" />
      </Head>
      <NavBar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="text-4xl font-bold text-white">Home Page</h1>
        {sessionData && (
          <p className="text-white">Welcome {sessionData.user?.name}</p>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Home;
