import Head from "next/head";
import SettingsHeader from "~/components/Settings/settingsHeader";
import { Avatar, useMantineColorScheme, Text, Button, Divider, FileButton, TextInput } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

const Settings: React.FC = () => {
  const { colorScheme } = useMantineColorScheme();
  const { data: sessionData } = useSession();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);

  const handleImageUpload = (fileImage: File) => {
    console.log(fileImage)
    setFile(fileImage);
    //console.log(file)
  };

  return (
    <>
      <Head>
        <title>PrintIT</title>
        <link rel="icon" href="/General/Logo.ico" />
        <meta name="description" content="PrintIT" />
      </Head>
      <div className={`flex flex-col h-screen ${colorScheme === "dark" ? "bg-[#0E1525]" : "bg-[#F0F1F8]"}`}>
        <SettingsHeader />
        <main className="flex flex-grow pt-[60px]">
          <div className="flex flex-col items-center justify-between w-[40%] py-28">
            <div className="flex flex-col items-center h-2/3 gap-16">
              <div className="flex flex-col items-center">
                <Avatar className="rounded-full w-[300px] h-[300px] mb-5" src={sessionData?.user.image as string} alt="User Image" />
                <Text className={`text-3xl font-bold ${colorScheme === "dark" ? "text-[#FFF]" : ""}`}>{sessionData?.user.name}</Text>
                <Text className={`text-xl font-semibold ${colorScheme === "dark" ? "text-[#FFF]" : ""}`}>{sessionData?.user.email}</Text>
              </div>
              <div className="flex flex-row gap-8">
                <div className="flex flex-col items-center gap-3">
                  <Text className={`text-4xl font-bold ${colorScheme === "dark" ? "text-[#FFF]" : ""}`}>12</Text>
                  <Text className="text-2xl">Pedidos</Text>
                </div>
                <Divider orientation="vertical" size={"md"} />
                <div className="flex flex-col items-center gap-3">
                  <Text className={`text-4xl font-bold ${colorScheme === "dark" ? "text-[#FFF]" : ""}`}>2</Text>
                  <Text className="text-2xl">Impresiones</Text>
                </div>
                <Divider orientation="vertical" size={"md"} />
                <div className="flex flex-col items-center gap-3">
                  <Text className={`text-4xl font-bold ${colorScheme === "dark" ? "text-[#FFF]" : ""}`}>103</Text>
                  <Text className="text-2xl">Trabajos</Text>
                </div>
              </div>
            </div>
            <FileButton
              onChange={(file) => handleImageUpload(file as File)}
              accept="image/png,image/jpeg"
            >
              {(props) => <Button
                {...props}
                className="w-min bg-blue-500 hover:bg-blue-700"
                size="lg"
              >Cambiar Foto</Button>}
            </FileButton>
          </div>
          <Divider orientation="vertical" size={"md"} my={"100px"} />
          <div className="flex flex-col w-[60%] py-28 ml-5 justify-between">
            <div className="flex flex-col">
              <Text className={`text-5xl font-bold ${colorScheme === "dark" ? "text-[#FFF]" : ""}`}>Informacion Personal</Text>
              <div className="flex flex-col gap-5 mt-5">
                <TextInput
                  className="w-[40%]"
                  label="Nombre"
                  defaultValue={sessionData?.user.name as string}
                  size="md"
                />
                <TextInput
                  className="w-[40%]"
                  label="Email"
                  defaultValue={sessionData?.user.email as string}
                  size="md"
                />
                <div>
                  <Text>Contraseña</Text>
                  <Button
                    className="w-min bg-blue-500 hover:bg-blue-700"
                    size="sm"
                    onClick={() => {
                      void router.push("/recoverPassword")
                    }}
                  >Cambiar Contraseña</Button>
                </div>
              </div>
            </div>
            <Button
              className="w-min bg-blue-500 hover:bg-blue-700"
              size="lg"
            >Guardar Cambios</Button>
          </div>
        </main>
      </div>
    </>
  );
};

export default Settings;
