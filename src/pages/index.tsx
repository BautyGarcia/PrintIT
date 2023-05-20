import { type NextPage } from "next";
import Head from "next/head";
import { signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { NavBar } from "~/components/navBar";
import { Footer } from "~/components/footer";

const Landing: NextPage = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined,
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <>
      <Head>
        <title>PrintIT</title>
        <link rel="icon" href="/Logo.ico" />
        <meta name="description" content="PrintIT" />
      </Head>
      <NavBar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-white from-[#2e026d] to-[#15162c]">
        {sessionData && (
          <button onClick={() => void signOut()} className="p-5">
            <p className="rounded bg-blue-500 px-4 py-2 text-white">SignOut</p>
          </button>
        )}
        <p className="text-center text-2xl text-white">
          {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
          {secretMessage && <span> - {secretMessage}</span>}
        </p>
      </main>
      <Footer />
    </>
  );
};

export default Landing;
