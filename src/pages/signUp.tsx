import { type FormEventHandler, useState, useRef } from "react";
import { type NextPage } from "next";
import { Button, useMantineColorScheme, Text, TextInput, Autocomplete, Loader, PasswordInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { LogoSignUpIMG } from "~/components/signUpImg";
import { AuthShowcase } from "~/components/googleAuthShowcase";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { Logo } from "~/components/logo";
import Link from "next/link";
import Head from "next/head";

const SignUpPage: NextPage = () => {
  const { colorScheme } = useMantineColorScheme();
  return (
    <main className={colorScheme === "dark" ? "h-screen w-full bg-[#1C2333]" : "h-screen w-full bg-white"}>
      <div className="absolute ml-5 mt-5 flex items-center gap-2">
        <Logo width={40} height={40} />
        <h2>PrintIT</h2>
      </div>
      <section className="flex h-full w-1/2 flex-col items-center justify-center text-center">
        <h1 className={colorScheme === "dark" ? "font-family-Inter text-4xl text-white" : "font-family-Inter text-4xl text-black"}>
          Bienvenido a PrinIT
        </h1>
        <h3 className="font-family-Inter text-#AFAFAF">Ingrese sus datos</h3>
        <RegisterForm />
        <AuthShowcase />
        <p className={colorScheme === "dark" ? "font-family-Inter p-5 text-white" : "font-family-Inter p-5 text-black"}>
          ¿Ya tenés una cuenta?{" "}
          <Link href={"/signIn"} className="font-family-Inter text-blue-500">
            Ingresá acá
          </Link>
        </p>
      </section>
      <picture className="absolute right-0 top-0 h-screen w-1/2">
        <LogoSignUpIMG />
      </picture>
    </main>
  );
};

export default SignUpPage;

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<number>(-1);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);
  const router = useRouter();

  const handleChange = (val: string) => {
    window.clearTimeout(timeoutRef.current);
    setValue(val);
    setEmail(val);
    setData([]);

    if (val.trim().length === 0 || val.includes('@')) {
      setLoading(false);
    } else {
      setLoading(true);
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false);
        setData(['gmail.com', 'outlook.com', 'yahoo.com'].map((provider) => `${val}@${provider}`));
      }, 500);
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let errorMessage = "";

    if (email === "" || password === "" || name === "") {
      errorMessage = "Por favor complete todos los campos";
      setError(true);
    } else if (!email.includes("@") || !email.includes(".")) {
      errorMessage = "Por favor ingrese un email valido";
      setError(true);
    } else if (password.length < 8) {
      errorMessage = "La contraseña debe tener al menos 8 caracteres";
      setError(true);
    }

    if (errorMessage) {
      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
        autoClose: 5000,
      });
      setIsLoading(false);
    } else {
      await signIn("credentials", {
        redirect: false,
        email,
        password,
        name,
        method: "signUp",
      }).then((response) => {
        if (response?.ok) {
          notifications.show({
            title: "Éxito",
            message: "Registro exitoso",
            color: "green",
            autoClose: 2000,
          });
          setIsLoading(false);
          void router.push("/dashboard/subirArchivo");
        } else {
          notifications.show({
            title: "Error",
            message: response?.error || "Error al registrar usuario",
            color: "red",
            autoClose: 5000,
          });
          setIsLoading(false);
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
          <Text
            fw={500}
            className={
              error
                ? "font-family-Inter justify-left flex text-red-500"
                : "font-family-Inter justify-left flex"
            }

          >
            User
          </Text>
          <TextInput
            value={name}
            type="text"
            placeholder="Ingrese su Nombre"
            onChange={(e) => { setName(e.currentTarget.value); setError(false)} }
            {...(error ? { error } : {})}
          />
        </div>
        <div className="mb-2 w-4/5">
          <Text
            fw={500}
            className="font-family-Inter justify-left flex"
          >
            Email
          </Text>
          <Autocomplete
            {...(error ? { error } : {})}
            value={value}
            data={data}
            onChange={handleChange}
            rightSection={loading ? <Loader size="1rem" /> : null}
            placeholder="Your email"
          />
        </div>
        <div className="mb-2 w-4/5">
          <Text
            fw={500}
            className="font-family-Inter justify-left flex"
          >
            Password
          </Text>
          <PasswordInput
            value={password}
            onChange={(event) => { setPassword(event.currentTarget.value); setError(false) }}
            placeholder="Your password"
            className="mb-3"
            {...(error ? { error } : {})}
          />
        </div>
        <Button
          className="font-family-Inter mt-3 w-4/5 rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-700"
          type="submit"
          loading={isLoading}
        >
          Sign Up
        </Button>
      </form>
    </>
  );
};
