import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>PrintIT</title>
        <meta name="description" content="PrintIT" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">PrintIT</h1>
        <Link href="/signIn"><p className="bg-blue-500 text-white py-2 px-4 rounded">SignIn</p></Link>
      </main>
    </>
  );
};

export default Home;