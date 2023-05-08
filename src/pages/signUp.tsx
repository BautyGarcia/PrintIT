import { type NextPage } from "next";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

const SignInPage: NextPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <h1 className="text-4xl font-bold text-white">Sign In Page</h1>
      <RegisterForm />
      <AuthShowcase />
      <p className="text-white p-5">Ya tenes una cuenta? <Link href={"/logIn"} className="text-blue-500">Ingresa</Link></p>
    </main>
  );
}

export default SignInPage;

const AuthShowcase: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={() => void signIn('google', {
          callbackUrl: 'http://localhost:3000/home',
        })}
      >
        Sign in with Google
      </button>
    </div>
  );
};

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await signIn("credentials", {
      callbackUrl: "http://localhost:3000/home",
      email,
      password,
      name
    });
  };

  return (
    <>
      <form className="flex flex-col max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-white">Sign up</h2>
        <div className="mb-4">
          <label className="font-bold mb-2 text-white" htmlFor="email">
            Email
          </label>
          <input
            className="w-full border border-gray-400 p-2 rounded-lg"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="font-bold mb-2 text-white" htmlFor="password">
            Password
          </label>
          <input
            className="w-full border border-gray-400 p-2 rounded-lg"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="font-bold mb-2 text-white" htmlFor="fullName">
            Full Name
          </label>
          <input
            className="w-full border border-gray-400 p-2 rounded-lg"
            type="text"
            id="fullName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50 mb-5"
          type="submit"
        >
          Registrarse
        </button>
      </form>
    </>
  );
};
