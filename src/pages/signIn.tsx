import { type NextPage } from "next";
import { signIn } from "next-auth/react";
import { type FormEventHandler, useState } from "react";
import Link from "next/link";
import { LogoGoogle } from "~/components/logoGoogle";
import Head from "next/head";
import {LogosignInIMG} from "~/components/signInImg";

const SignInPage: NextPage = () => {
    return (
        <main className="w-full h-screen  bg-white">
           <section className="w-1/2 flex items-center justify-center text-center flex-col h-full">
            <h1 className="text-4xl font-family-Inter text-black">Bienvenido Devuelta</h1>
            <h3 className="font-family-Inter text-black">Ingrese sus datos</h3>            
            <SignInForm />
            <AuthShowcase />
            <p className="text-grey p-5">¿Tenes una cuenta? <Link href={"/signUp"} className="text-blue-500">Ingresa</Link></p>

           </section>
           <picture className="w-1/2 h-screen absolute right-0 top-0">
            <LogosignInIMG width={680} height={880}/>
           </picture>
        </main>
    );
}

export default SignInPage;

const SignInForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                <link rel="icon" href="/Logo.ico"/>
                <meta name="description" content="PrintIT" />
            </Head>
        <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="font-bold text-black" htmlFor="email">
                        Email 
                    </label>
                    <input
                        className="w-full border border-gray-400 p-2 rounded-lg mt-4"
                        type="email"
                        id="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="font-bold text-black" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="w-full border border-gray-400 p-2 rounded-lg mt-4"
                        type="password"
                        id="password"
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-lg w-4/5"
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
          className="flex rounded-full border-2 border-[#D8D8D8] font-semibold text-black no-underline transition hover:bg-white/20 mt-5 flex-row items-center justify-center gap-4 w-3/6 h-10"
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