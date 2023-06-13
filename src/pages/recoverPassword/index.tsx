import { type NextPage } from "next";
import { Logo } from "~/components/logo";
import { useState, useRef } from "react";
import { RecoverIMG } from "~/components/recoverImg";
import Head from "next/head";
import { api } from "~/utils/api";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  Autocomplete,
  Loader,
  useMantineColorScheme,
  Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const Recover: NextPage = () => {
  const { colorScheme } = useMantineColorScheme();
  const largeScreen = useMediaQuery("(min-width: 992px)");

  return (
    <>
      <Head>
        <title>PrintIT</title>
        <link rel="icon" href="/Logo.ico" />
        <meta name="description" content="PrintIT" />
      </Head>
      <main
        className={
          colorScheme === "dark"
            ? "h-screen w-full bg-[#1C2333]"
            : "h-screen w-full bg-[#FFFFFF]"
        }
      >
        <div className="absolute ml-5 mt-5 flex items-center gap-2">
          <Logo width={40} height={40} href="/" />
        </div>
        <section
          className={
            largeScreen
              ? "flex h-full w-1/2 flex-col items-center justify-center text-center"
              : "flex h-full w-full flex-col items-center justify-center"
          }
        >
          <h1
            className={
              colorScheme === "dark"
                ? "font-family-Inter text-4xl text-white"
                : "font-family-Inter text-4xl text-black"
            }
          >
            Recuperar Contraseña
          </h1>
          <h3 className="font-family-Inter text-#AFAFAF">
            Te enviaremos un mail para recuperarla
          </h3>
          <RecoverForm />
        </section>
        <picture
          className={
            largeScreen ? "absolute right-0 top-0 h-screen w-1/2" : "hidden"
          }
        >
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
  const { mutate: sendPasswordEmail } =
    api.auth.sendPasswordEmail.useMutation();
  const timeoutRef = useRef<number>(-1);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);

  const handleChange = (val: string) => {
    window.clearTimeout(timeoutRef.current);
    setError(false);
    setValue(val);
    setEmail(val);
    setData([]);

    if (val.trim().length === 0 || val.includes("@")) {
      setLoading(false);
    } else {
      setLoading(true);
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false);
        setData(
          ["gmail.com", "outlook.com", "yahoo.com"].map(
            (provider) => `${val}@${provider}`
          )
        );
      }, 500);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    let errorMessage = "";

    if (!email.includes("@") || !email.includes(".")) {
      errorMessage = "Ingrese un Email";
      setError(true);
    }

    if (errorMessage) {
      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
      });
      setIsLoading(false);
    } else {
      sendPasswordEmail(
        { email },
        {
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
        }
      );
    }
  };

  return (
    <form
      className="mx-auto mt-8 flex w-full flex-col items-center justify-center text-center"
      onSubmit={handleSubmit}
    >
      <div className="mb-2 w-4/5">
        <Text fw={500} className="font-family-Inter justify-left flex">
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
