import { type NextPage } from "next";
import Head from "next/head";
import { LandingHeader } from "~/components/Landing/landingHeader";
import { Footer } from "~/components/Landing/footer";
import { useMantineColorScheme, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { AboutusImg } from "~/components/About/aboutusimg";
import { LinkedinLOGO } from "~/components/About/linkedinlogo";
import { BautiImg } from "~/components/About/BautiImg";
import { BautyImg } from "~/components/About/BauryImg";
import { FrancoImg } from "~/components/About/FrancoImg";
import { EnzoImg } from "~/components/About/EnzoImg";
const About: NextPage = () => {
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
            ? "flex h-screen w-full flex-col items-start justify-center bg-[#0E1525] "
            : "flex h-screen w-full flex-col items-start justify-center bg-[#F0F1F8] "
        }
      >
        <div
          className={
            largeScreen
              ? "font-family-Nunito mr-8 flex aling-center items-center justify-center ml-20 flex-row"
              : "flex h-screen  flex-col items-center justify-center ml-20 mr-10"
          }
        >
          <AboutUS />

          <picture
            className={largeScreen ? "mr-32 mt-28 h-1/2 mb-32  w-full" : "hidden"}
          >
            <AboutusImg />
          </picture>
        </div>
        <div className={largeScreen ? "flex flex-row justify-center items-center  gap-40 mb-32 w-full text-black" : "w-full mt-10 grid grid-cols-2 gap-10 justify-center items-center"}>
          <div className={largeScreen ? "w-80 h-72 bg-white shadow-lg p-4 rounded-md  shadow-xl" : "w-40 h-40 bg-white shadow-lg p-4 rounded-md  shadow-xl"}>
            <BautiImg />
            <div className="flex items-center justify-evenly mr-10 text-xs mt-5 ">
              <LinkedinLOGO />
              <h1> Bautista Malumian</h1>
            </div>
          </div>
          <div className={largeScreen ? "w-80 h-72 bg-white shadow-lg p-4 rounded-md  shadow-xl" : "w-40 h-40 bg-white shadow-lg p-4 rounded-md  shadow-xl"}>
            <BautyImg />
            <div className="flex items-center justify-evenly mr-20 text-xs mt-5">
              <LinkedinLOGO />
              <h1> Bautista Garcia</h1>
            </div>
          </div>
          <div className={largeScreen ? "w-80 h-72 bg-white shadow-lg p-4 rounded-md  shadow-xl" : "w-40 h-40 bg-white shadow-lg p-4 rounded-md  shadow-xl"}>
            <FrancoImg />
            <div className="flex items-center justify-evenly mr-20 text-xs mt-5">
              <LinkedinLOGO />
              <h1> Franco Bugna</h1>
            </div>
          </div>
          <div className={largeScreen ? "w-80 h-72 bg-white shadow-lg p-4 rounded-md  shadow-xl" : "w-40 h-40 bg-white shadow-lg p-4 rounded-md  shadow-xl"}>
            <EnzoImg />
            <div className="flex items-center justify-evenly mr-10 text-xs mt-5">
              <LinkedinLOGO />
              <h1> Enzo Villela Molloy</h1>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default About;

const AboutUS = () => {
  return (
    <form>
      <div>
        <h1>Como surgió PrintIT </h1>
        <br />
        <Text>Somos un grupo de cuatro estudiantes entusiastas de 17 años del Colegio ORT que comparten una pasión por la tecnología y la innovación. Hemos decidido unir fuerzas y crear esta plataforma con el objetivo de facilitar la comunicación entre clientes y proveedores de impresiones 3D. Nuestra historia comenzó cuando nos dimos cuenta de la creciente demanda de servicios de impresión 3D en nuestra comunidad. Nos emocionó la idea de hacer que esta tecnología estuviera al alcance de todos, permitiendo a las personas convertir sus ideas en objetos tangibles. Sin embargo, también nos dimos cuenta de que había una falta de conectividad entre los clientes que necesitaban servicios de impresión 3D y los proveedores que podían ofrecerlos. Decidimos aprovechar nuestras habilidades técnicas y conocimientos en programación para crear una solución que abordara este problema. Así nació PrintIT, una plataforma diseñada para brindar un espacio de comunicación y colaboración entre clientes y proveedores de impresiones 3D.</Text>
      </div>
    </form>
  );
}
