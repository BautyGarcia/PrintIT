import { NextPage } from "next";
import Head from "next/head";
import { LandingHeader } from "~/components/landingHeader";
import { Footer } from "~/components/footer";
import { useMantineColorScheme } from "@mantine/core";
import { TopAboutUs } from "~/components/topaboutimg";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import { LinkedinLOGO } from "~/components/linkedinlogo";

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
        className=
        {
          colorScheme === "dark" 
          ? "flex h-[93vh] w-full bg-[#0E1525] from-[#2e026d] to-[#15162c] p-10 pt-20"
          : "flex h-[93vh] w-full bg-[#F0F1F8] from-[#2e026d] to-[#15162c] p-10 pt-20"
        }
      >

        <div         
          className={
            largeScreen
              ? "font-family-Nunito mr-8 flex w-full h-full justify-center"
              : "flex h-full w-full items-center justify-center"
          }>
        <AboutUs/>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default About;


export function AboutUs(){
  const largeScreen = useMediaQuery("(min-width: 1300px)");

  return (
    <form> 
      <div>
        <div className="bg-[url('/TopAbout.png')] h-screen w-screen">

        </div>

        <div className={largeScreen ? "flex flex-row w-full h-full": "flex flex-col h-full w-full justify-center items-center"}>
          <div className={largeScreen ? "flex flex-col h-full w-1/2 ml-10": "flex flex-col h-full w-full justify-center items-center"}>
          <h1>
            Como surgió PrintIT
          </h1>
            <div className={largeScreen ? "": "ml-5"}> 
            <br></br> 

            <h3>
            Somos un grupo de cuatro estudiantes entusiastas de 17 años del Colegio ORT que comparten una pasión por la tecnología y la innovación. 
            Hemos decidido unir fuerzas y crear esta plataforma con el objetivo de facilitar la comunicación entre clientes y proveedores de impresiones 3D.
            </h3>

            <br></br>
            <h3>

            Nuestra historia comenzó cuando nos dimos cuenta de la creciente demanda de servicios de impresión 3D en nuestra comunidad.
            Nos emocionó la idea de hacer que esta tecnología estuviera al alcance de todos, permitiendo a las personas convertir sus ideas en objetos tangibles. Sin embargo, también nos dimos cuenta de que había una falta de conectividad entre los clientes que necesitaban servicios de impresión 3D y los proveedores que podían ofrecerlos.
            </h3>

            <br></br>
            <h3>

            Decidimos aprovechar nuestras habilidades técnicas y conocimientos en programación para crear una solución que abordara este problema. 
            Así nació PrintIT, una plataforma diseñada para brindar un espacio de comunicación y colaboración entre clientes y proveedores de impresiones 3D.
            </h3>
            </div>
          </div>

            <div className={largeScreen ? "flex w-1/2 ml-20 justify-center items-center" : "hidden"}>
            <Image
              src="/AboutUsImg.png"
              width={700}
              height={600}
              alt="Group of people"
            /> 
            </div>

          <div className="flex flex-row w-full h-full">

              <div className="bg-[#F7F6FF] rounded-xl h-[21vh] shadow-lg w-1/4 flex flex-col">
                <div className="p-1.5">
                  <Image
                  src="/BautyImg.png"
                  width={700}
                  height={600}
                  alt="Bauty image"
                  /> 
                </div>
                <div className=" flex flex-row">
                <div className="p-1.5 flex flex-row">
                  <h3>Bautista Garcia</h3>

                </div>
                <div className=" w-2/12">
                    <LinkedinLOGO />
                </div> 
                </div>
              </div>
          </div>

        </div>
      </div>

    </form>
  );
}
