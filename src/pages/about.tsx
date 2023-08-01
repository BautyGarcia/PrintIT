import { type NextPage } from "next";
import Head from "next/head";
import { LandingHeader } from "~/components/Landing/landingHeader";
import { Footer } from "~/components/Landing/footer";
import { useMantineColorScheme, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { AboutusImg } from "~/components/About/aboutusimg";
import { LinkedinLOGO } from "~/components/About/linkedinlogo";

const About: NextPage = () => {
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
            ? "flex h-full w-full flex-row items-start justify-center bg-[#0E1525] "
            : "flex h-full w-full flex-row items-start justify-center bg-[#F0F1F8] "
        }
        >
        <div
          className={
            largeScreen
              ? "font-family-Nunito mr-8 mt-20 flex w-1/2 aling-center items-center justify-center mt-36"
              : "flex h-screen w-full flex-col items-center justify-center"
          }
        >
          <AboutUS />
        </div>
        <picture
          className={largeScreen ? "mr-32 mt-28 h-1/2  w-1/3" : "hidden"}
        >
          <AboutusImg />
        </picture>
      </main>

      <Footer />
    </>
  );
};

export default About;

const AboutUS = () =>{
    return(
      <form>
        <h1>Como surgió PrintIT </h1>
        <br />
        <Text>Somos un grupo de cuatro estudiantes entusiastas de 17 años del Colegio ORT que comparten una pasión por la tecnología y la innovación. Hemos decidido unir fuerzas y crear esta plataforma con el objetivo de facilitar la comunicación entre clientes y proveedores de impresiones 3D.
              <br />
              Nuestra historia comenzó cuando nos dimos cuenta de la creciente demanda de servicios de impresión 3D en nuestra comunidad. Nos emocionó la idea de hacer que esta tecnología estuviera al alcance de todos, permitiendo a las personas convertir sus ideas en objetos tangibles. Sin embargo, también nos dimos cuenta de que había una falta de conectividad entre los clientes que necesitaban servicios de impresión 3D y los proveedores que podían ofrecerlos.
              <br />
              Decidimos aprovechar nuestras habilidades técnicas y conocimientos en programación para crear una solución que abordara este problema. Así nació PrintIT, una plataforma diseñada para brindar un espacio de comunicación y colaboración entre clientes y proveedores de impresiones 3D.</Text>
              

              
      </form>
    );
}
