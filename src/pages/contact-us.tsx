import { type NextPage } from "next";
import Head from "next/head";
import { LandingHeader } from "~/components/landingHeader";
import { Footer } from "~/components/footer";
import { type FormEventHandler, useState, useRef } from "react";
import { ContactIMG } from "~/components/contactImg";
import {
  Autocomplete,
  Loader,
  useMantineColorScheme,
  Text,
  TextInput,
} from "@mantine/core";
import { useRouter } from "next/router";
import { set } from "react-hook-form";

const ContactUs: NextPage = () => {
  const { colorScheme } = useMantineColorScheme();
  return (
    <>
      <Head>
        <title>PrintIT</title>
        <link rel="icon" href="/Logo.ico" />
        <meta name="description" content="PrintIT" />
      </Head>
      <LandingHeader />
      <main
        className={
          colorScheme === "dark"
            ? "flex h-screen w-full flex-col items-start justify-center bg-[#0E1525] from-[#2e026d] to-[#15162c] p-10"
            : "flex h-screen w-full flex-col items-start justify-center bg-[#F0F1F8] from-[#2e026d] to-[#15162c] p-10"
        }
      >
        <h1 className="flex justify-start text-4xl">Contactate con Nosotros</h1>
        <h6 className="text-xs">
          Nos encantaria escuchar tus preguntas o propuestas
        </h6>
        <ContactForm />
        <picture className="absolute right-0 top-5 h-screen w-1/2">
          <ContactIMG />
        </picture>
      </main>

      <Footer />
    </>
  );
};

export default ContactUs;

const ContactForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState(false);
  const timeoutRef = useRef<number>(-1);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  const handleChange = (val: string) => {
    window.clearTimeout(timeoutRef.current);
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

  return (
    <>
      <Head>
        <title>PrintIT</title>
        <link rel="icon" href="/Logo.ico" />
        <meta name="description" content="PrintIT" />
      </Head>
      <form
        className="mx-auto mt-20 flex w-full flex-col items-start justify-start text-center"
        onSubmit={handleSubmit}
      >
        <div className="flex w-1/2 flex-row ">
          <div className="mb-2 w-4/5 pr-4">
            <Text
              fw={500}
              className={
                error
                  ? "font-family-Inter justify-left flex text-red-500"
                  : "font-family-Inter justify-left flex"
              }
            >
              Nombre
            </Text>
            {error ? (
              <TextInput
                error
                value={name}
                onChange={(event) => setName(event.currentTarget.value)}
                rightSection={loading ? <Loader size="1rem" /> : null}
                placeholder="Your Name"
              />
            ) : (
              <TextInput
                value={name}
                onChange={(event) => setName(event.currentTarget.value)}
                rightSection={loading ? <Loader size="1rem" /> : null}
                placeholder="Your Name"
              />
            )}
          </div>
          <div className="mb-2 w-4/5">
            <Text
              fw={500}
              className={
                error
                  ? "font-family-Inter justify-left flex text-red-500"
                  : "font-family-Inter justify-left flex"
              }
            >
              Apellido
            </Text>
            {error ? (
              <TextInput
                error
                value={surname}
                onChange={(event) => setSurname(event.currentTarget.value)}
                rightSection={loading ? <Loader size="1rem" /> : null}
                placeholder="Your Surname"
              />
            ) : (
              <TextInput
                value={surname}
                onChange={(event) => setSurname(event.currentTarget.value)}
                rightSection={loading ? <Loader size="1rem" /> : null}
                placeholder="Your Surname"
              />
            )}
          </div>
        </div>
        <div className="mb-2 w-1/2">
          <div>
            <Text
              fw={500}
              className={
                error
                  ? "font-family-Inter justify-left flex text-red-500"
                  : "font-family-Inter justify-left flex"
              }
            >
              Email
            </Text>
            {error ? (
              <Autocomplete
                error
                value={value}
                data={data}
                onChange={handleChange}
                rightSection={loading ? <Loader size="1rem" /> : null}
                placeholder="Your email"
              />
            ) : (
              <Autocomplete
                value={value}
                data={data}
                onChange={handleChange}
                rightSection={loading ? <Loader size="1rem" /> : null}
                placeholder="Your email"
              />
            )}
          </div>
          <div>
            <Text
              fw={500}
              className={
                error
                  ? "font-family-Inter justify-left flex text-red-500"
                  : "font-family-Inter justify-left flex"
              }
            >
              Mensaje
            </Text>
            {error ? (
              <TextInput
                error
                value={mensaje}
                onChange={(event) => setMensaje(event.currentTarget.value)}
                rightSection={loading ? <Loader size="1rem" /> : null}
                placeholder="Your Message"
              />
            ) : (
              <TextInput
                value={mensaje}
                onChange={(event) => setMensaje(event.currentTarget.value)}
                rightSection={loading ? <Loader size="1rem" /> : null}
                placeholder="Your Message"
              />
            )}
          </div>
          <div className=" flex-start flex w-full justify-start">
            <button
              className="font-family-Inter mt-8 min-w-full rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-700"
              type="submit"
            >
              Enviar
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
