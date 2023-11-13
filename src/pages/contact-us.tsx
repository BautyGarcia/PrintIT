import { type NextPage } from "next";
import Head from "next/head";
import { LandingHeader } from "~/components/Landing/landingHeader";
import { Footer } from "~/components/Landing/footer";
import { ContactIMG } from "~/components/Contact/contactImga";
import {
  TextInput,
  Textarea,
  SimpleGrid,
  Group,
  Button,
  useMantineColorScheme,
  Text
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { type FormEventHandler, useState } from "react";
import { api } from "~/utils/api";

const ContactUs: NextPage = () => {
  const { colorScheme } = useMantineColorScheme();
  const largeScreen = useMediaQuery("(min-width: 1300px)");
  return (
    <>
      <Head>
        <title>PrintIT</title>
        <link rel="icon" href="/General/Logo.ico" />
        <meta name="description" content="PrintIT" />
      </Head>
      <LandingHeader />
      <main
        className={
          colorScheme === "dark"
            ? "flex h-[93vh] w-full flex-row items-center justify-center bg-[#0E1525] from-[#2e026d] to-[#15162c]"
            : "flex h-[93vh] w-full flex-row items-center justify-center bg-[#F0F1F8] from-[#2e026d] to-[#15162c]"
        }
      >
        <div
          className={
            largeScreen
              ? "font-family-Nunito flex w-1/2 h-full items-center justify-center"
              : "flex h-full w-full flex-col items-center justify-center px-8"
          }
        >
          <GetInTouchSimple />
        </div>
        {
          largeScreen && <ContactIMG />
        }
      </main>
      <Footer />
    </>
  );
};

export default ContactUs;

const GetInTouchSimple = () => {
  const { mutate: sendUsEmail } = api.email.sendUsEmail.useMutation();
  const largeScreen = useMediaQuery("(min-width: 1300px)");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [surname, setSurname] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let errorMessage = "";

    if (!email || !name || !message || !surname) {
      errorMessage = "Por favor complete todos los campos";
      setError(true);
    } else if (!email.includes("@") || !email.includes(".")) {
      errorMessage = "Por favor ingrese un email valido";
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
      sendUsEmail({
        email: email,
        message: message,
        name: name,
        surname: surname
      }, {
        onSuccess: () => {
          notifications.show({
            title: "Mensaje enviado!",
            message: "Su mensaje fue enviado correctamente.",
            color: "green",
            autoClose: 5000,
          });
          setIsLoading(false);
        },
        onError: (error) => {
          notifications.show({
            title: "Error",
            message: error.message,
            color: "red",
            autoClose: 5000,
          });
          setIsLoading(false);
        },
      })
    }
  }

  return (
    <form
      className={largeScreen ? "w-2/3 flex flex-col" : "w-full"}
      onSubmit={handleSubmit}
    >

      <div className="flex flex-col items-center">
        <Text className="font-semibold text-4xl text-center">Contactate con Nosotros</Text>

        <Text>
          Nos encantaria escuchar tus preguntas o propuestas
        </Text>
      </div>

      <SimpleGrid cols={2} mt="xl" breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        <TextInput
          className="mt-0"
          label="Nombre"
          placeholder="Ingresa tu nombre"
          name="nombre"
          {...(error ? { error } : {})}
          onChange={(e) => { setError(false); setName(e.currentTarget.value) }}
        />
        <TextInput
          className="mt-0"
          label="Apellido"
          placeholder="Ingrese su apellido"
          name="apellido"
          {...(error ? { error } : {})}
          onChange={(e) => { setError(false); setSurname(e.currentTarget.value) }}
        />
      </SimpleGrid>

      <TextInput
        className="mt-4"
        label="Email"
        placeholder="Ingrese su email"
        name="email"
        {...(error ? { error } : {})}
        onChange={(e) => { setError(false); setEmail(e.currentTarget.value) }}
      />
      <Textarea
        className="mt-4"
        mt="md"
        label="Mensaje"
        placeholder="Ingresa tu mensaje"
        maxRows={10}
        minRows={5}
        autosize
        name="mensaje"
        {...(error ? { error } : {})}
        onChange={(e) => { setError(false); setMessage(e.currentTarget.value) }}
      />

      <Group position="center" mt="xl">
        <Button
          type="submit"
          size="md"
          className="rounded-lg bg-blue-500 hover:bg-blue-700"
          loading={isLoading}
        >
          Send message
        </Button>
      </Group>
    </form>
  );
}
