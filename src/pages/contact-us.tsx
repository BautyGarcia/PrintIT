import { type NextPage } from "next";
import Head from "next/head";
import { LandingHeader } from "~/components/landingHeader";
import { Footer } from "~/components/footer";
import { type FormEventHandler, useState } from "react";
import { ContactIMG } from "~/components/contactImg";

const ContactUs: NextPage = () => {
  return (
    <>
      <Head>
        <title>PrintIT</title>
        <link rel="icon" href="/Logo.ico" />
        <meta name="description" content="PrintIT" />
      </Head>
      <LandingHeader />
      <main className="h-screen w-full bg-white p-10">
        <h1 className="text-4xl">Contactate con Nosotros</h1>
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

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Head>
        <title>PrintIT</title>
        <link rel="icon" href="/Logo.ico" />
        <meta name="description" content="PrintIT" />
      </Head>
      <form
        className="mx-auto mt-8 flex w-full flex-col items-start justify-start text-center"
        onSubmit={handleSubmit}
      >
        <div className="flex w-1/2 flex-row ">
          <div className="mb-2 w-4/5 pr-4">
            <label
              className="font-family-Inter justify-left flex text-black"
              htmlFor="text"
            >
              Nombre
            </label>
            <input
              className="flex-start mt-2 flex w-full justify-start rounded-lg border border-gray-400 p-2"
              type="text"
              id="name"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2 w-4/5">
            <label
              className="font-family-Inter justify-left flex text-black"
              htmlFor="text"
            >
              Apellido
            </label>
            <input
              className="flex-start mt-2 flex w-full justify-start rounded-lg border border-gray-400 p-2"
              type="text"
              id="text"
              placeholder="Your email"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-2 w-1/2">
          <div>
            <label
              className="font-family-Inter justify-left flex text-black"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="flex-start mt-2 flex w-full justify-start rounded-lg border border-gray-400 p-2"
              type="email"
              id="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              className="font-family-Inter justify-left flex text-black"
              htmlFor="mensaje"
            >
              Mensaje
            </label>
            <input
              className="flex-start mt-2 flex h-20 w-full justify-start rounded-lg border border-gray-400 p-2 "
              type="text"
              id="mensaje"
              placeholder="Your mensaje"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            />
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
