import { type NextPage } from "next";
import { signIn } from "next-auth/react";
import { type FormEventHandler, useState } from "react";
import Link from "next/link";
import { LogoGoogle } from "~/components/logoGoogle";
import Head from "next/head";
import { LogosignInIMG } from "~/components/signInImg";
import { Logo } from "~/components/logo";
import "remixicon/fonts/remixicon.css";
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';

const SignInPage: NextPage = () => {
    return (
        <main className="h-screen w-full bg-white">
            <div className="absolute ml-5 mt-5 flex items-center gap-2">
                <Logo width={40} height={40} />
                <h2>PrintIT</h2>
            </div>
            <section className="flex h-full w-1/2 flex-col items-center justify-center text-center">
                <h1 className="font-family-Inter text-4xl text-black">
                    Bienvenido Devuelta
                </h1>
                <h3 className="font-family-Inter text-#AFAFAF">Ingrese sus datos</h3>
                <SignInForm />
                <AuthShowcase />
                <p className="font-family-Inter text-grey p-5">
                    ¿No tenés cuenta?{" "}
                    <Link href={"/signUp"} className="font-family-Inter text-blue-500">
                        Registrate acá
                    </Link>
                </p>
            </section>
            <picture className="absolute right-0 top-0 h-screen w-1/2">
                <LogosignInIMG />
            </picture>
        </main>
    );
};

export default SignInPage;

const SignInForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("password");
    const [error, setError] = useState(false);

    const router = useRouter();

    const handleChangeInputType = () => {
        if (type == "password") {
            setType("text");
        } else {
            setType("password");
        }
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        let errorMessage = "";

        if (!email || !password) { errorMessage = "Por favor complete todos los campos"; setError(true) }
        else if (!email.includes("@") || !email.includes(".")) { errorMessage = "Por favor ingrese un email valido"; setError(true) }
        else if (password.length < 8) { errorMessage = "La contraseña debe tener al menos 8 caracteres"; setError(true) }

        if (errorMessage) {
            notifications.show({
                title: 'Error',
                message: errorMessage,
                color: 'red',
                autoClose: 5000,
            })
        } else {
            await signIn("credentials", {
                email,
                password,
                method: "signIn",
                redirect: false,
            }).then((response) => {
                if (response?.ok) {
                    notifications.show({
                        title: 'Éxito',
                        message: "Inicio de sesión exitoso",
                        color: 'green',
                        autoClose: 2000,
                    });
                    void router.push("/home");
                } else {
                    notifications.show({
                        title: 'Error',
                        message: response?.error || "Error al iniciar sesión",
                        color: 'red',
                        autoClose: 5000,
                    })
                    setError(true);
                }
            });
        }
    };

    return (
        <>
            <Head>
                <title>PrintIT</title>
                <link rel="icon" href="/Logo.ico" />
                <meta name="description" content="PrintIT" />
            </Head>
            <form
                className="mx-auto mt-8 flex w-full flex-col items-center justify-center text-center"
                onSubmit={handleSubmit}
            >
                <div className="mb-2 w-4/5">
                    <label
                        className= { error ? "font-family-Inter justify-left flex text-red-500" : "font-family-Inter justify-left flex text-black" }
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        className= { error ? "mt-2 w-full rounded-lg border border-red-400 p-2 focus:border-sky-500" : "mt-2 w-full rounded-lg border border-gray-400 p-2 focus:border-sky-500" }
                        type="text"
                        id="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-2 w-4/5">
                    <label
                        className= { error ? "font-family-Inter justify-left flex text-red-500" : "font-family-Inter justify-left flex text-black" }
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        className= { error ? "mt-2 w-full rounded-lg border border-red-400 p-2" : "mt-2 w-full rounded-lg border border-gray-400 p-2" }
                        type={type}
                        id="password"
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                        onClick={handleChangeInputType}
                        className="absolute left-[43%] mt-4"
                    >
                        <i
                            className={
                                type === "password" ? "ri-eye-off-line" : "ri-eye-line"
                            }
                        ></i>
                    </span>
                    <Link
                        href={"/recoverPassword"}
                        className="flex justify-end text-xs text-blue-500"
                    >
                        ¿Olvidaste tu Contraseña?
                    </Link>
                </div>
                <button
                    className="font-family-Inter mt-3 w-4/5 rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-700"
                    type="submit"
                >
                    Sign in
                </button>
            </form>
        </>
    );
};

const AuthShowcase: React.FC = () => {
    return (
        <div className="flex w-full justify-center">
            <button
                className="font-family-Inter mt-5 flex h-10 w-4/5 flex-row items-center justify-center gap-4 rounded-lg border-2 border-[#D8D8D8] text-black no-underline transition hover:bg-white/20"
                onClick={() =>
                    void signIn("google", {
                        callbackUrl: "/home",
                    })
                }
            >
                <LogoGoogle height={20} width={20} />
                Sign In with Google
            </button>
        </div>
    );
};
