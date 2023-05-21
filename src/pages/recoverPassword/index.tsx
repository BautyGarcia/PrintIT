import { type NextPage } from "next";
import { Logo } from "~/components/logo";
import { useState } from "react";
import { RecoverIMG } from "~/components/recoverImg";
import Head from "next/head";
import { api } from "~/utils/api";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";

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
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const { mutate: sendPasswordEmail } = api.auth.sendPasswordEmail.useMutation();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        let errorMessage = "";

        if (!email.includes("@") || !email.includes(".")) { errorMessage = "Ingrese un Email"; setError(true) }

        if (errorMessage) {
            notifications.show({
                title: "Error",
                message: errorMessage,
                color: "red",
            });
            setIsLoading(false);
        } else {
            sendPasswordEmail({ email }, {
                onSuccess: () => {
                    notifications.show({
                        title: "Email enviado",
                        message: "Se envio un email para recuperar la contraseña",
                        color: "green",
                    });
                    setIsLoading(false);
                    setError(false);
                },
                onError: (error) => {
                    notifications.show({
                        title: "Error",
                        message: error.message,
                        color: "red",
                    });
                    setIsLoading(false);
                },
            });
        }
    }

    return (
        <form className="mx-auto mt-8 flex w-full flex-col items-center justify-center text-center" onSubmit={handleSubmit}>
            <div className="mb-2 w-4/5">
                <label
                    className= { error ? "font-family-Inter justify-left flex text-red-500" : "font-family-Inter justify-left flex text-black" }
                    htmlFor="email"
                >
                    Email
                </label>
                <input
                    className= { error ? "mt-2 w-full rounded-lg border border-red-500 p-2" : "mt-2 w-full rounded-lg border border-gray-400 p-2" }
                    type="email"
                    id="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <Button
                className="font-family-Inter mt-3 w-4/5 rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-700"
                type="submit"
                loading={isLoading}
            >
                Recuperar Contraseña
            </Button>
        </form>
    );
};