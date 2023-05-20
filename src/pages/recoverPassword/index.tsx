import { type NextPage } from "next";
import { Logo } from "~/components/logo";
import { useState } from "react";
import { RecoverIMG } from "~/components/recoverImg";
import Head from "next/head";
import { api } from "~/utils/api";

const Recover: NextPage = () => {
    return (
        <>
            <Head>
                <title>PrintIT</title>
                <link rel="icon" href="/Logo.ico" />
                <meta name="description" content="PrintIT" />
            </Head>
            <main className="h-screen w-full bg-white">
                <div className="absolute ml-5 mt-5 flex items-center gap-2">
                    <Logo width={40} height={40} />
                    <h2>PrintIT</h2>
                </div>
                <section className="flex h-full w-1/2 flex-col items-center justify-center text-center">
                    <h1 className="font-family-Inter text-4xl text-black">
                        Recuperar Contraseña
                    </h1>
                    <h3 className="font-family-Inter text-#AFAFAF">
                        Te enviaremos un mail para recuperarla
                    </h3>
                    <RecoverForm />
                </section>
                <picture className="absolute right-0 top-0 h-screen w-1/2">
                    <RecoverIMG />
                </picture>
            </main>
        </>
    );
};

export default Recover;

const RecoverForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const { mutate: RecoverPassword } = api.auth.recoverPassword.useMutation();

    return (
        <form className="mx-auto mt-8 flex w-full flex-col items-center justify-center text-center">
            <div className="mb-2 w-4/5">
                <label
                    className="font-family-Inter justify-left flex text-black"
                    htmlFor="email"
                >
                    Email
                </label>
                <input
                    className="mt-2 w-full rounded-lg border border-gray-400 p-2"
                    type="email"
                    id="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button
                className="font-family-Inter mt-3 w-4/5 rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-700"
                type="submit"
                onClick={() => RecoverPassword({ email })}
            >
                Recuperar Contraseña
            </button>
        </form>
    );
};