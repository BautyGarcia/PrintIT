import { type NextPage } from "next";
import { type FormEventHandler, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Head from "next/head";
import {LogoSignUpIMG} from "~/components/signUpImg"

const SignUpPage: NextPage = () => {
  return (
    <section className="w-full h-full bg-white">
      <main className="w-1/2 flex items-center justify-center text-center flex-col h-full">
        <h1 className="text-4xl font-bold text-black">Bienvenido a PrinIT</h1>
        <h3 className="font-family-Inter text-black">Ingrese sus datos</h3>  
        <RegisterForm />
        <AuthShowcase />
        <p className="text-black p-5">Ya tenes una cuenta? <Link href={"/signIn"} className="text-blue-500">Ingresa</Link></p>
        <picture className="w-1/2 h-screen absolute right-0 top-0">
            <LogoSignUpIMG width={680} height={880}/>
        </picture>
      </main>
    </section>
  );
}

export default SignUpPage;

const AuthShowcase: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-white/20"
        onClick={() => void signIn('google', {
          callbackUrl: '/home',
        })}
      >
        Sign Up with Google
      </button>
    </div>
  );
};

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (email === "" || password === "" || name === "") {
      alert("Please fill all the fields");
      return;
    }

    await signIn("credentials", {
      callbackUrl: "/home",
      email,
      password,
      name,
      method: "signUp",
    });
  };

  return (
    <>
      <Head> 
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
        <div className="mb-6">
          <label className="font-bold text-black" htmlFor="fullName">
            Full Name
          </label>
          <input
            className="w-full border border-gray-400 p-2 rounded-lg mt-4"
            type="text"
            id="fullName"
            placeholder="Ingrese su Nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50 mb-5"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </>
  );
};
