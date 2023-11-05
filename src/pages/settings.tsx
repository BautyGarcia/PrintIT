import Head from "next/head";
import SettingsHeader from "~/components/Settings/settingsHeader";
import { Avatar, useMantineColorScheme, Text, Button, Divider, FileButton, TextInput } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { api } from "~/utils/api";
import { IconCheck } from "@tabler/icons-react";

interface GCSResponseProps {
  fileURL: string;
}

const Settings: React.FC = () => {
  const { mutate: updateImage } = api.utils.updateImage.useMutation();
  const [isUpdatingImage, setIsUpdatingImage] = useState(false);
  const largeScreen = useMediaQuery("(min-width: 1300px)");
  const { colorScheme } = useMantineColorScheme();
  const { data: sessionData } = useSession();
  const router = useRouter();

  const handleImageUpload = async (fileImage: File) => {
    setIsUpdatingImage(true);

    notifications.show({
      id: 'update-image',
      title: 'Subiendo Imagen...',
      message: 'Espere por favor',
      autoClose: false,
      loading: true,
      withCloseButton: false,
    });

    const newFile = new File([fileImage], `${Date.now().toString()}_${fileImage.name}`, { type: fileImage.type });
    const formData = new FormData();
    formData.append("file", newFile);
    await fetch("https://printitweb-filehandler.cyclic.app/", {
      method: 'POST',
      body: formData,
    }).then(async (response: Response) => {
      const data: GCSResponseProps = await response.json() as GCSResponseProps;
      const imageURL: string = data.fileURL;

      updateImage({
        imageURL
      }, {
        onSuccess: () => {
          notifications.update({
            id: 'update-image',
            title: 'Imagen Actualizada',
            message: 'La imagen se actualizó correctamente.',
            color: 'green',
            autoClose: 3000,
            icon: <IconCheck size="1rem" />,
          });
          setIsUpdatingImage(false);
        },
        onError: (error) => {
          notifications.update({
            id: 'update-image',
            title: 'Error',
            message: "Hubo un error subiendo la imagen. " + error.message,
            color: 'red',
            autoClose: 3000,
          });
          setIsUpdatingImage(false);
        }
      }
      )

    }).catch((err: Error) => {
      notifications.update({
        id: 'update-image',
        title: 'Error',
        message: `Hubo un error subiendo la imagen. ${err.message}`,
        color: 'red',
        autoClose: 3000,
      });
      setIsUpdatingImage(false);
    });

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
          {largeScreen && <Divider orientation="vertical" size={"md"} my={"100px"} />}
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
                    loading={isUpdatingImage}
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
