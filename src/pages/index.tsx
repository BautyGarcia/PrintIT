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
import { cn } from "../utils/util";
import { TopLandingPhone } from "~/components/Landing/topLandingPhone";

const Landing: NextPage = () => {
  const { colorScheme } = useMantineColorScheme();
  const largeScreen = useMediaQuery("(min-width: 1300px)");

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
        <div className={largeScreen ? "" : "hidden"}>
          <TopLanding />
        </div>
        <div className={largeScreen ? "hidden" : ""}>
          <TopLandingPhone />
        </div>
        <div
          className={cn(
            "relative z-20 flex h-[700px] w-full flex-col items-start justify-center from-[#2e026d] to-[#15162c] text-black",
            {
              "relative z-20 flex h-[700px] w-full flex-col items-start justify-center from-[#2e026d] to-[#15162c] text-white":
                colorScheme === "dark",
              "": largeScreen === true,
              "relative z-20 -mb-80 w-full items-start text-sm":
                largeScreen === false,
            }
          )}
        >
          <div
            className={
              largeScreen
                ? "ml-24 items-center"
                : "absolute left-0 top-0 ml-4 mt-20 items-start text-[10px]"
            }
          >
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
          <div className={largeScreen ? " -mb-28" : " -mb-20 -mt-44"}>
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
        <div
          className={
            largeScreen
              ? "flex flex-col items-center"
              : "flex flex-col items-center justify-center "
          }
        >
          <div
            className={largeScreen ? "flex flex-col items-center" : "hidden"}
          >
            <h1>Herramientas que facilitaran tu búsqueda ideal</h1>
          </div>
          <h2 className={largeScreen ? "" : "text-xl"}>
            Beneficios de usar PrintIt
          </h2>
        </div>
        <br></br>
        <div
          className={
            largeScreen
              ? "mb-20 ml-44 mr-44 mt-20 flex flex-row justify-around"
              : "flex w-3/4 flex-col items-center justify-center"
          }
        >
          <div
            className={cn(
              "mb-2 ml-2 mr-2 mt-2 flex flex-col items-center justify-center from-[#2e026d] to-[#15162c] text-black",
              {
                "mb-2 ml-2 mr-2 mt-2 flex flex-col items-center justify-center from-[#2e026d] to-[#15162c] text-white":
                  colorScheme === "dark",
                "h-[26rem] w-1/5 rounded-lg shadow-lg": largeScreen === true,
                "mb-8 mt-8 w-full items-start": largeScreen === false,
              }
            )}
          >
            <PuntodeImpresion />
            <h1>Punto de Impresion</h1>
            <p
              className={
                largeScreen ? "w-4/6 text-justify" : "w-full text-justify"
              }
            >
              Nuestras página web también esta enfocada en aquellos que buscan
              vender sus productos 3D o simplemente poner en uso su impresora 3D
            </p>
          </div>
          <div
            className={cn(
              "mb-2 ml-2 mr-2 mt-2 flex flex-col items-center justify-center from-[#2e026d] to-[#15162c] text-black",
              {
                "mb-2 ml-2 mr-2 mt-2 flex flex-col items-center justify-center from-[#2e026d] to-[#15162c] text-white":
                  colorScheme === "dark",
                "h-[26rem] w-1/5 rounded-xl shadow-lg": largeScreen === true,
                "mb-8 mt-8 w-full items-start ": largeScreen === false,
              }
            )}
          >
            <Necesidades />
            <h1>Tus Necesidades</h1>
            <p
              className={
                largeScreen ? "w-4/6 text-justify" : "w-full text-justify"
              }
            >
              Te brindamos la posibilidad de ahorrar mucho tiempo y dinero al no
              tener que comprar tu propia impresora 3D y los materiales
              necesarios para imprimir
            </p>
          </div>
          <div
            className={cn(
              "mb-2 ml-2 mr-2 mt-2 flex flex-col items-center justify-center from-[#2e026d] to-[#15162c] text-black",
              {
                "mb-2 ml-2 mr-2 mt-2 flex flex-col items-center justify-center from-[#2e026d] to-[#15162c] text-white":
                  colorScheme === "dark",
                "h-[26rem] w-1/5 rounded-xl shadow-lg": largeScreen === true,
                "mb-8 mt-8 w-full items-start": largeScreen === false,
              }
            )}
          >
            <Proveedores />
            <h1>Proveedores</h1>
            <p
              className={
                largeScreen ? "w-4/6 text-justify" : "w-full text-justify"
              }
            >
              Adicionalmente te ofrecemos los medios para contactarte con
              personas que buscan poner sus impresoras a disposición, con el fin
              de conseguir un beneficio mutuo
            </p>
          </div>
        </div>
        <div
          className={
            largeScreen
              ? "flex w-full flex-col items-start"
              : "flex w-full flex-col items-start "
          }
        >
          <div
            className={
              largeScreen
                ? "flex w-full flex-row items-start"
                : "flex w-full flex-row items-start"
            }
          >
            <div
              className={
                largeScreen
                  ? "ml-44 flex w-1/2 flex-col"
                  : "mb-8 ml-9 mr-9 mt-8 flex w-full flex-col text-justify"
              }
            >
              <h2 className="flex items-start text-blue-500">
                Nuestro Servicio
              </h2>
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
                que ofrecen sus servicios de impresión a precios competitivos.
                de forma rápida, fácil y accesible. Nuestra plataforma conecta a
                los usuarios con una amplia red de propietarios de impresoras 3D
                que ofrecen sus servicios de impresión a precios competitivos.
              </h3>
              <br></br>
              <button
                className={
                  largeScreen
                    ? "font-family-Inter flex w-1/6 flex-col items-center rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-700"
                    : "font-family-Inter flex w-5/6 flex-col items-center rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-700"
                }
              >
                Sobre nosotros
              </button>
            </div>
            <picture
              className={largeScreen ? "right-0 -mt-20 ml-96 w-1/3" : "hidden"}
            >
              <Servicio />
            </picture>
            <br></br>
          </div>
          <br></br>
          <div className="mb-8 flex w-full flex-row items-end ">
            <picture className={largeScreen ? "left-0 ml-44 w-1/3" : "hidden"}>
              <Objetivo />
            </picture>
            <div
              className={
                largeScreen
                  ? "flex w-1/2  flex-col"
                  : "ml-9 mr-9 flex w-full flex-col text-justify"
              }
            >
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
                emergente la cual esta revolucionando la forma en que se diseñan
                y producen objetos y tienen una gran importancia en varios
                campos, entre los que se incluyen la educación, la industria,
                diseños de productos personales e incluso la medicina. Se espera
                que su uso siga creciendo y evolucionando en el futuro,
                innovando el mundo en el que vivimos.
              </h3>
            </div>
          </div>
        </div>
        <br></br>
        <div className={largeScreen ? "mb-10 " : "-mt-44 mb-10"}>
          <Carousel />
        </div>
        <div
          className={
            largeScreen
              ? "flex w-full flex-row items-center"
              : "-mt-28 mb-12 flex w-full flex-row items-center"
          }
        >
          <div
            className={
              largeScreen
                ? "ml-28 flex w-1/2 flex-col items-center"
                : "-mt-28 flex w-screen flex-col items-center"
            }
          >
            <div className="items-center justify-center">
              <h1
                className={
                  largeScreen
                    ? "mb-4 ml-28 text-5xl"
                    : "mb-4 items-center text-4xl"
                }
              >
                Mantenete al Tanto
              </h1>
              <h1
                className={
                  largeScreen
                    ? "mb-4 ml-40 text-xs"
                    : "mb-4 ml-7 items-center text-[10px]"
                }
              >
                Ingresa tu mail para recibir noticias de las actualizaciones
              </h1>
            </div>
            <div
              className={
                largeScreen
                  ? "ml-28 flex w-full flex-col items-center justify-center"
                  : "mb-8 flex w-5/6 flex-col items-center"
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
