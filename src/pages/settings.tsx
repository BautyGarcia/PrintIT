import Head from "next/head";
import SettingsHeader from "~/components/Settings/settingsHeader";
import { Avatar, useMantineColorScheme, Text, Button, Divider, FileButton, TextInput, Modal } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { api } from "~/utils/api";
import { IconCheck, IconTrash } from "@tabler/icons-react";

interface GCSResponseProps {
  fileURL: string;
}

const Settings: React.FC = () => {
  const { mutate: updateImage } = api.utils.updateImage.useMutation();
  const { mutate: updateUserInfo } = api.utils.updateUserInfo.useMutation();
  const [isUpdatingImage, setIsUpdatingImage] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [isError, setIsError] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const largeScreen = useMediaQuery("(min-width: 1300px)");
  const { colorScheme } = useMantineColorScheme();
  const { data: sessionData, update } = useSession();
  const router = useRouter();

  const handleImageUpload = async (fileImage: File) => {
    setIsUpdatingImage(true);

    if (Math.ceil(fileImage.size / 1024 / 1024) > 4) {
      notifications.show({
        title: "Error",
        message: "El archivo seleccionado es demasiado grande, debe ser menor a 4mb",
        color: "red",
        autoClose: 5000,
      });
      return;
    }

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
        onSuccess: async () => {
          notifications.update({
            id: 'update-image',
            title: 'Imagen Actualizada',
            message: 'La imagen se actualizó correctamente.',
            color: 'green',
            autoClose: 3000,
            icon: <IconCheck size="1rem" />,
          });
          setIsUpdatingImage(false);
          await update({ image: imageURL });
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
      });

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

  const handleUserInfoUpdate = () => {
    setIsUpdatingUser(true);

    if (newUsername === "" && newEmail === "") {
      notifications.show({
        title: "Error",
        message: "Por favor complete al menos un campo",
        color: "red",
        autoClose: 5000,
      });
      setIsUpdatingUser(false);
      setIsError(true);
      return;
    }

    if (newEmail !== "" && (!newEmail.includes("@") || !newEmail.includes("."))) {
      notifications.show({
        title: "Error",
        message: "Por favor ingrese un email valido",
        color: "red",
        autoClose: 5000,
      });
      setIsUpdatingUser(false);
      setIsError(true);
      return;
    }

    notifications.show({
      id: 'update-user-info',
      title: 'Actualizando Informacion...',
      message: 'Espere por favor',
      autoClose: false,
      loading: true,
      withCloseButton: false,
    });

    updateUserInfo({
      name: newUsername || sessionData?.user.name as string,
      email: newEmail || sessionData?.user.email as string,
    }, {
      onSuccess: async () => {
        notifications.update({
          id: 'update-user-info',
          title: 'Informacion Actualizada',
          message: 'La informacion se actualizó correctamente.',
          color: 'green',
          autoClose: 3000,
          icon: <IconCheck size="1rem" />,
        });
        setIsUpdatingUser(false);

        if (newUsername) {
          await update({ name: newUsername });
        }

        if (newEmail) {
          await update({ email: newEmail });
        }
      },
      onError: (error) => {
        notifications.update({
          id: 'update-user-info',
          title: 'Error',
          message: "Hubo un error actualizando la informacion. " + error.message,
          color: 'red',
          autoClose: 3000,
        });
        setIsUpdatingUser(false);
        setIsError(true);
      }
    })
  }

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
            <div className="flex gap-5">
              <FileButton
                onChange={(file) => handleImageUpload(file as File)}
                accept="image/png,image/jpeg"
              >
                {(props) => <Button
                  {...props}
                  className="w-min bg-blue-500 hover:bg-blue-700 rounded-lg"
                  size="lg"
                  loading={isUpdatingImage}
                >Cambiar Foto</Button>}
              </FileButton>
              <CheckDeletePopup />
            </div>
          </div>
          {largeScreen && <Divider orientation="vertical" size={"md"} my={"100px"} />}
          <div className="flex flex-col w-[60%] py-28 ml-5 justify-between">
            <div className="flex flex-col">
              <Text className={`text-5xl font-bold ${colorScheme === "dark" ? "text-[#FFF]" : ""}`}>Informacion Personal</Text>
              <div className="flex flex-col gap-5 mt-5">
                <TextInput
                  className="w-[40%]"
                  label="Nombre"
                  onChange={(event) => {
                    setNewUsername(event.currentTarget.value);
                    setIsError(false);
                  }}
                  defaultValue={sessionData?.user.name as string}
                  error={isError}
                  size="md"
                />
                <TextInput
                  className="w-[40%]"
                  label="Email"
                  onChange={(event) => {
                    setNewEmail(event.currentTarget.value);
                    setIsError(false);
                  }}
                  defaultValue={sessionData?.user.email as string}
                  error={isError}
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
              loading={isUpdatingUser}
              onClick={handleUserInfoUpdate}
            >Guardar Cambios</Button>
          </div>
        </main>
      </div>
    </>
  );
};

const CheckDeletePopup: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: removeImage } = api.utils.removeImage.useMutation();
  const [isUpdatingImage, setIsUpdatingImage] = useState(false);
  const { update } = useSession();

  const handleRemoveImage = () => {
    setIsUpdatingImage(true);
    notifications.show({
      id: 'remove-image',
      title: 'Eliminando Imagen...',
      message: 'Espere por favor',
      autoClose: false,
      loading: true,
      withCloseButton: false,
    });

    removeImage({
    }, {
      onSuccess: async () => {
        notifications.update({
          id: 'remove-image',
          title: 'Imagen Eliminada',
          message: 'La imagen se eliminó correctamente.',
          color: 'green',
          autoClose: 3000,
          icon: <IconCheck size="1rem" />,
        });
        setIsUpdatingImage(false);
        await update({ image: null });
        close();
      },
      onError: (error) => {
        notifications.update({
          id: 'remove-image',
          title: 'Error',
          message: "Hubo un error eliminando la imagen. " + error.message,
          color: 'red',
          autoClose: 3000,
        });
        setIsUpdatingImage(false);
        close();
      }
    });
  };

  return (
    <>
      <Modal opened={opened} onClose={close} centered withCloseButton={false} padding={"md"}>
        <Text className="font-semibold text-xl text-center">Estas por eliminar tu foto de perfil.
          <Text className="font-bold text-xl text-center">¿Estas seguro?</Text>
        </Text>
        <div className="flex w-full mt-5 justify-between">
          <Button className="w-min bg-blue-500 hover:bg-blue-700" onClick={close} loading={isUpdatingImage}>Cancelar</Button>
          <Button className="w-min bg-red-600 p-3 hover:bg-red-700" onClick={handleRemoveImage} loading={isUpdatingImage}>Eliminar</Button>
        </div>
      </Modal>
      <Button className="bg-red-600 p-3 hover:bg-red-700 rounded-lg" size="lg" onClick={open}><IconTrash /></Button>
    </>
  )
}

export default Settings;