import { type NextPage } from "next";
import { signIn } from "next-auth/react";
import { type FormEventHandler, useState } from "react";
import Link from "next/link";
import { LogoGoogle } from "~/components/logoGoogle";
import Head from "next/head";
import { LogosignInIMG } from "~/components/signInImg";
import { Logo } from "~/components/logo";
import 'remixicon/fonts/remixicon.css'

const SignInPage: NextPage = () => {
    return (
        <main className="w-full h-screen bg-white">
            <div className="absolute mt-5 ml-5 flex items-center gap-2">
                <Logo width={40} height={40} />
                <h2>PrintIT</h2>
            </div>
            <section className="w-1/2 flex items-center justify-center text-center flex-col h-full">
                <h1 className="text-4xl font-family-Inter text-black">Bienvenido Devuelta</h1>
                <h3 className="font-family-Inter text-#AFAFAF">Ingrese sus datos</h3>
                <SignInForm />
                <AuthShowcase />
                <p className="font-family-Inter text-grey p-5">¿Tenes una cuenta? <Link href={"/signUp"} className="font-family-Inter text-blue-500">Inicia sesion aca</Link></p>

            </section>
            <picture className="w-1/2 h-screen absolute right-0 top-0">
                <LogosignInIMG />
            </picture>
        </main>
    );
}

export default SignInPage;

const SignInForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("password");
    const handleChangeInputType = () => {
        if (type == "password") {
            setType("text")
        } else {
            setType("password");
        }
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await signIn("credentials", {
            callbackUrl: "/home",
            email,
            password,
            method: "signIn"
        });
    };

    return (
        <>  <Head>
            <title>PrintIT</title>
            <link rel="icon" href="/Logo.ico" />
            <meta name="description" content="PrintIT" />
        </Head>
            <form className="flex text-center flex-col justify-center items-center w-full mx-auto mt-8" onSubmit={handleSubmit}>
                <div className="mb-2 w-4/5">
                    <label className="flex font-family-Inter text-black justify-left" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="w-full border border-gray-400 p-2 rounded-lg mt-2"
                        type="email"
                        id="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-2 w-4/5">
                    <label className="flex font-family-Inter text-black justify-left" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="w-full border border-gray-400 p-2 rounded-lg mt-2"
                        type={type}
                        id="password"
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span onClick={handleChangeInputType} className="absolute left-[43%] mt-4">
                        <i className={type === "password" ? "ri-eye-off-line" : "ri-eye-line"}></i>
                    </span>
                    <Link href={"/recover"} className="text-blue-500 flex justify-end text-xs">¿Olvidaste tu Contraseña?</Link>
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-family-Inter py-2 rounded-lg w-4/5 mt-3"
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
        <div className="w-full flex justify-center">

            <button
                className="flex rounded-lg border-2 border-[#D8D8D8] font-family-Inter text-black no-underline transition hover:bg-white/20 mt-5 flex-row items-center justify-center gap-4 w-4/5 h-10"
                onClick={() => void signIn('google', {
                    callbackUrl: '/home',
                })}
            >
                <LogoGoogle height={20} width={20} />
                Sign In with Google
            </button>

        </div>
    );
};