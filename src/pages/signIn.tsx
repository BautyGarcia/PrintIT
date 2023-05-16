import { type NextPage } from "next";
import { signIn } from "next-auth/react";
import { type FormEventHandler, useState } from "react";
import Link from "next/link";

const SignInPage: NextPage = () => {
    return (
        <main className="flex min-h-screen flex-col items-start justify-center bg-white">
            <h1 className="text-4xl font-family-Inter text-black">Bienvenido devuelta</h1>
            <h3 className="font-family-Inter text-black">Ingrese sus datos</h3>            <SignInForm />
            <AuthShowcase />
            <p className="text-grey p-5">¿tenes una cuenta? <Link href={"/signUp"} className="text-blue-500">Ingresa</Link></p>
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
        <>
            <form className="flex flex-col items-start justify-center max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="font-bold mb-2 text-black" htmlFor="email">
                        Email 
                    </label>
                    <input
                        className="w-full border border-gray-400 p-2 rounded-lg"
                        type="email"
                        id="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="font-bold mb-2 text-black" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="w-full border border-gray-400 p-2 rounded-lg"
                        type="password"
                        id="password"
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-lg"
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
      <div className="flex flex-col items-center justify-center gap-4">
        <button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-white/20 mt-5"
          onClick={() => void signIn('google', {
            callbackUrl: '/home',
          })}
        >
          Sign In with Google
        </button>
      </div>
    );
  };