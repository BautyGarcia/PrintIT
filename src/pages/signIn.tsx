import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useState } from "react";
import { useForm } from "react-hook-form";

const SignInPage: NextPage = () => {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <h1 className="text-4xl font-bold text-white">Sign In Page</h1>
      <AuthShowcase />
      <FormShowcase />
    </main>
  );
}

export default SignInPage;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Google Sign in"}
      </button>
    </div>
  );
};

const FormShowcase: React.FC = () => {
  const { register, handleSubmit, formState } = useForm();
  const { data: sessionData } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setFormError(null);

    try {
      await api.auth.register.useQuery(data);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setFormError(error.message);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-bold text-white mb-2">Register Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-white font-semibold">
            Email
          </label>
          <input
            {...register("email", { required: true })}
            type="email"
            id="email"
            name="email"
            placeholder="Email address"
            className="w-full rounded-lg px-4 py-2 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
          {formState.errors.email && (
            <p className="text-red-500 mt-2">
              Please enter a valid email address.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-white font-semibold">
            Password
          </label>
          <input
            {...register("password", { required: true })}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="w-full rounded-lg px-4 py-2 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
          {formState.errors.password && (
            <p className="text-red-500 mt-2">
              Please enter a password.
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg px-4 py-2 disabled:opacity-50"
          disabled={isLoading || !!sessionData}
        >
          {isLoading ? "Submitting..." : "Register"}
        </button>

        {formError && (
          <p className="text-red-500 mt-2">
            {formError}
          </p>
        )}
      </form>
    </div>
  );
};