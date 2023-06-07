import { type NextPage } from "next";
import Head from "next/head";
import { LandingHeader } from "~/components/landingHeader";
import { Footer } from "~/components/footer";
import { ContactIMG } from "~/components/contactImg";
import { TextInput, Textarea, SimpleGrid, Group, Title, Button, useMantineColorScheme } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';

const ContactUs: NextPage = () => {
  const { colorScheme } = useMantineColorScheme();
  const largeScreen = useMediaQuery('(min-width: 1300px)');
  return (
    <>
      <Head>
        <title>PrintIT</title>
        <link rel="icon" href="/Logo.ico" />
        <meta name="description" content="PrintIT" />
      </Head>
      <LandingHeader />
      <main className={colorScheme === "dark"
        ? "flex h-screen w-full flex-row items-start justify-center bg-[#0E1525] from-[#2e026d] to-[#15162c] p-10"
        : "flex h-screen w-full flex-row items-start justify-center bg-[#F0F1F8] from-[#2e026d] to-[#15162c] p-10"
      }
      >
        <div className={largeScreen ? "w-1/2 flex justify-center mt-10 mr-8 font-family-Nunito" : "w-full h-full flex flex-col items-center justify-center"}>
          <GetInTouchSimple />
        </div>
        <picture className={largeScreen ? "h-1/2 w-1/3 mt-32  mr-32" : "hidden"}>
        <ContactIMG />
        </picture>
        
      </main>

      <Footer />
    </>
  );
};

export default ContactUs;


export function GetInTouchSimple() {
  const form = useForm({
    initialValues: {
      nombre: '',
      apellido: '',
      email: '',
      mensaje: '',
    },
    validate: {
      nombre: (value) => value.trim().length < 2,
      apellido: (value) => value.trim().length < 2,
      email: (value) => !/^\S+@\S+$/.test(value),
      mensaje: (value) => value.trim().length < 2,
    },
  });


  return (
    <form onSubmit={form.onSubmit(() => null)}>

      <Title className="mt-10"
        order={2}
        size="h1"

        weight={200}
        align="center"

      >
        <p>Contactate con Nosotros </p>
      </Title>

      <h1 className="text-xs aling-center justify-center flex items-centers mb-4 mt-1">
        Nos encantaria escuchar tus preguntas o propuestas
      </h1>

      <SimpleGrid cols={2} mt="xl" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <TextInput className="mt-2"
          label="Nombre"
          placeholder="Ingresa tu nombre"
          name="nombre"
          variant="filled"
          {...form.getInputProps('nombre')}
        />
        <TextInput className="mt-2"
          label="Apellido"
          placeholder="Ingrese su apellido"
          name="apellido"
          variant="filled"
          {...form.getInputProps('apellido')}
        />
      </SimpleGrid>

      <TextInput className="mt-4"
        label="Email"
        placeholder="Ingrese su email"
        name="email"
        variant="filled"
        {...form.getInputProps('email')}

      />
      <Textarea className="mt-4"
        mt="md"
        label="Mensaje"
        placeholder="Ingresa tu mensaje"
        maxRows={10}
        minRows={5}
        autosize
        name="mensaje"
        variant="filled"
        {...form.getInputProps('mensaje')}
      />

      <Group position="center" mt="xl">
        <Button type="submit" size="md" className="rounded-lg bg-blue-500 hover:bg-blue-700">
          Send message
        </Button>
      </Group>
    </form>
  );
}