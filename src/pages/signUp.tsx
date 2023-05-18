import { type NextPage } from "next";
import { type FormEventHandler, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Head from "next/head";
import { LogoSignUpIMG } from "~/components/signUpImg";
import { LogoGoogle } from "~/components/logoGoogle";
import { Logo } from "~/components/logo";
import "remixicon/fonts/remixicon.css";

const SignUpPage: NextPage = () => {
  return (
    <main className="h-screen w-full bg-white">
      <div className="absolute ml-5 mt-5 flex items-center gap-2">
        <Logo width={40} height={40} />
        <h2>PrintIT</h2>
      </div>
      <section className="flex h-full w-1/2 flex-col items-center justify-center text-center">
        <h1 className="font-family-Inter text-4xl text-black">
          Bienvenido a PrinIT
        </h1>
        <h3 className="font-family-Inter text-#AFAFAF">Ingrese sus datos</h3>
        <RegisterForm />
        <AuthShowcase />
        <p className="font-family-Inter p-5 text-black">
          Ya tenes una cuenta?{" "}
          <Link href={"/signIn"} className="font-family-Inter text-blue-500">
            Ingresa
          </Link>
        </p>
      </section>
      <picture className="w-1/2 h-screen absolute right-0 top-0">
        <LogoSignUpIMG />
      </picture>
    </main>
  );
};

export default SignUpPage;

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
        Sign Up with Google
      </button>
    </div>
  );
};

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const handleChangeInputType = () => {
    if (type == "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

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
        <link rel="icon" href="/Logo.ico" />
        <meta name="description" content="PrintIT" />
      </Head>
      <form
        className="mx-auto mt-8 flex w-full flex-col items-center justify-center text-center"
        onSubmit={handleSubmit}
      >
        <div className="mb-2 w-4/5">
          <label
            className="font-family-Inter justify-left flex text-black"
            htmlFor="fullName"
          >
            User
          </label>
          <input
            className="mt-2 w-full rounded-lg border border-gray-400 p-2"
            type="text"
            id="fullName"
            placeholder="Ingrese su Usuario"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <div className="mb-2 w-4/5">
          <label
            className="font-family-Inter justify-left flex text-black"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="mt-2 w-full rounded-lg border border-gray-400 p-2"
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
        </div>
        <button
          className="font-family-Inter mt-3 w-4/5 rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-700"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </>
  );
};
