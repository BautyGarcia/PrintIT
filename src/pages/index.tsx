import { type NextPage } from "next";
import Head from "next/head";
import { LandingHeader } from "~/components/landingHeader";
import { Footer } from "~/components/footer";
import { useMantineColorScheme } from "@mantine/core";
import { TopLanding } from "~/components/Landing/topLanding";
import { Impresora } from "~/components/Landing/Impresora";
import { HombreNubeTanto } from "~/components/Landing/hombreNube";
import { Proveedores } from "~/components/Landing/proveedores";
import { PuntodeImpresion } from "~/components/Landing/puntoDeImpresion";
import { Necesidades } from "~/components/Landing/tusNecesidades";
import { Objetivo } from "~/components/Landing/objetivo";
import { Servicio } from "~/components/Landing/servicio";
import { UsoBlack } from "~/components/Landing/usoPrintItBlack";
import { UsoWhite } from "~/components/Landing/usoPrintItWhite";
import { Discord } from "~/components/Landing/discord";
import { Instagram } from "~/components/Landing/instagram";
import { FaceBook } from "~/components/Landing/facebook";
import Carousel from "~/components/Landing/carousel";
import Contacto from "~/components/Landing/contacto";
import { useMediaQuery } from "@mantine/hooks";
import { api } from "~/utils/api";
import { useState } from "react";

const Landing: NextPage = () => {
  const { colorScheme } = useMantineColorScheme();
  const largeScreen = useMediaQuery("(min-width: 1300px)");
  const { mutate: sendContactEmail } = api.email.sendUsEmail.useMutation();
  const [ email, setEmail ] = useState("");
  
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
            ? "flex min-h-screen flex-col items-center justify-center bg-[#0E1525] from-[#2e026d] to-[#15162c]"
            : "flex min-h-screen flex-col items-center justify-center bg-[#F0F1F8] from-[#2e026d] to-[#15162c]"
        }
      >
        <TopLanding />
        <div
          className={
            colorScheme === "dark"
              ? "relative z-20 flex h-[700px] w-full flex-col items-start justify-center from-[#2e026d] to-[#15162c] text-white"
              : "relative z-20 flex h-[700px] w-full flex-col items-start justify-center from-[#2e026d] to-[#15162c] text-black"
          }
        >
          <div className="ml-24 items-center">
            <h1>
              Encuentra tus productos 3D favoritos de una forma fácil y segura
            </h1>
            <br></br>
            <p>
              ¡Te brindamos la posibilidad de contactarte con proveedores y
              distintas opciones que facilitaran tu compra!{" "}
            </p>
          </div>
        </div>
        <div
          className={
            colorScheme === "dark"
              ? "relative  from-[#2e026d] to-[#15162c] text-white"
              : "relative  from-[#2e026d] to-[#15162c] text-black"
          }
        >
          <div className=" -mb-28">
            <Impresora />
          </div>
          <div
            className={
              colorScheme === "dark"
                ? "mb-4 flex items-center justify-center from-[#2e026d] to-[#15162c]"
                : "hidden"
            }
          >
            <UsoWhite />
          </div>
          <div
            className={
              colorScheme === "dark"
                ? "hidden"
                : "mb-4 flex items-center justify-center from-[#2e026d] to-[#15162c]"
            }
          >
            <UsoBlack />
          </div>
          <h3 className="-mb-12 mt-0 flex justify-center">
            Nos podes encontrar en redes sociales
          </h3>
          <div className=" flex w-full items-center justify-between p-4">
            <div>
              <Instagram />
            </div>
            <div>
              <Discord />
            </div>
            <div>
              <FaceBook />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h1>Herramientas que facilitaran tu búsqueda ideal</h1>
          <h3>Beneficios de usar PrintIt</h3>
        </div>
        <div
          className={
            largeScreen
              ? "mb-20 ml-44 mr-44 mt-20 flex flex-row justify-between"
              : "flex w-3/4 flex-col items-center justify-center"
          }
        >
          <div
            className={
              colorScheme === "dark"
                ? "mb-2 ml-2 mr-2 mt-2 flex w-1/6 flex-col items-center justify-center from-[#2e026d] to-[#15162c] text-white"
                : "mb-2 ml-2 mr-2 mt-2 flex w-1/6 flex-col items-center justify-center from-[#2e026d] to-[#15162c] text-black"
            }
          >
            <PuntodeImpresion />
            <h1>Punto de Impresion</h1>
            <h3 className={largeScreen ? "" : ""}>
              Nuestras página web también esta enfocada en aquellos que buscan
              vender sus productos 3D o simplemente poner en uso su impresora 3D
            </h3>
          </div>
          <div
            className={
              colorScheme === "dark"
                ? "mb-2 ml-2 mr-2 mt-2 flex w-1/6 flex-col items-center justify-center from-[#2e026d] to-[#15162c] text-white"
                : "mb-2 ml-2 mr-2 mt-2 flex w-1/6 flex-col items-center justify-center from-[#2e026d] to-[#15162c] text-black"
            }
          >
            <Necesidades />
            <h1>Tus Necesidades</h1>
            <h3>
              Te brindamos la posibilidad de ahorrar mucho tiempo y dinero al no
              tener que comprar tu propia impresora 3D y los materiales
              necesarios para imprimir
            </h3>
          </div>
          <div
            className={
              colorScheme === "dark"
                ? "mb-2 ml-2 mr-2 mt-2 flex w-1/6 flex-col items-center justify-center from-[#2e026d] to-[#15162c] text-white"
                : "mb-2 ml-2 mr-2 mt-2 flex w-1/6 flex-col items-center justify-center from-[#2e026d] to-[#15162c] text-black"
            }
          >
            <Proveedores />
            <h1>Proveedores</h1>
            <h3>
              Adicionalmente te ofrecemos los medios para contactarte con
              personas que buscan poner sus impresoras a disposición, con el fin
              de conseguir un beneficio mutuo
            </h3>
          </div>
        </div>
        <div className="flex w-full flex-row items-start">
          <div className="ml-52 flex w-1/2 flex-col">
            <h2 className="flex items-start text-blue-500">Nuestro Servicio</h2>
            <h1
              className={
                colorScheme === "dark"
                  ? "flex items-center text-white"
                  : "flex items-center text-black"
              }
            >
              Te ayudamos a imprimir lo que necesites
            </h1>
            <h3>
              De forma rápida, fácil y accesible. Nuestra plataforma conecta a
              los usuarios con una amplia red de propietarios de impresoras 3D
              que ofrecen sus servicios de impresión a precios competitivos. de
              forma rápida, fácil y accesible. Nuestra plataforma conecta a los
              usuarios con una amplia red de propietarios de impresoras 3D que
              ofrecen sus servicios de impresión a precios competitivos.
            </h3>
            <br></br>
            <button className="font-family-Inter flex w-1/6 flex-col items-center rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-700">
              Sobre nosotros
            </button>
          </div>
          <picture className="right-0 ml-64 w-1/3">
            <Servicio />
          </picture>
          <br></br>
        </div>
        <br></br>
        <div className="mb-8 flex w-full flex-row items-end ">
          <picture className=" left-0 ml-52 w-1/3">
            <Objetivo />
          </picture>
          <div className=" flex w-1/2  flex-col">
            <h2 className="flex items-start text-blue-500">
              Parte de nuestro objetivo
            </h2>
            <h1
              className={
                colorScheme === "dark"
                  ? "flex items-center text-white"
                  : "flex items-center text-black"
              }
            >
              Importancia de la impresion 3D
            </h1>
            <h3>
              Nosotros creemos que la impresion 3D es una tecnología que vino
              para quedarse. Este permite crear objetos tridimensionales a
              partir de modelos digitales. La consideramos una tecnologia
              emergente la cual esta revolucionando la forma en que se diseñan y
              producen objetos y tienen una gran importancia en varios campos,
              entre los que se incluyen la educación, la industria, diseños de
              productos personales e incluso la medicina. Se espera que su uso
              siga creciendo y evolucionando en el futuro, innovando el mundo en
              el que vivimos.
            </h3>
          </div>
        </div>
        <br></br>
        <div className="mb-10">
          <Carousel />
        </div>
        <div className="flex w-full flex-row items-center">
          <div
            className={
              largeScreen
                ? "ml-28 flex w-1/2 flex-col items-center"
                : "flex w-screen flex-col items-center"
            }
          >
            <h1 className="mb-4 flex items-center text-5xl">
              Mantenete al Tanto
            </h1>
            <h1 className="mb-8 flex items-center text-sm">
              Ingresa tu mail para recibir noticias de las actualizaciones
            </h1>
            <div
              className={
                largeScreen
                  ? "ml-28 flex w-full flex-col items-center justify-center"
                  : "mb-8 flex w-2/3 flex-col items-center"
              }
            >
              <Contacto />
            </div>
          </div>
          <div
            className={
              largeScreen
                ? "right-0 mb-12 flex w-1/2 items-end justify-end"
                : "hidden"
            }
          >
            <HombreNubeTanto />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Landing;
