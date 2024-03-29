import Head from "next/head";
import SettingsHeader from "~/components/Settings/settingsHeader";
import { Avatar, useMantineColorScheme, Text, Button, Divider, FileButton, TextInput, Modal } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { api } from "~/utils/api";
import { IconCheck, IconArrowBack } from "@tabler/icons-react";
import MercadoPagoLogo from "~/components/Utils/mercadoPagoLogo";

const Settings: React.FC = () => {
  const { mutate: updateImage } = api.utils.updateImage.useMutation();
  const { mutate: updateUserInfo } = api.utils.updateUserInfo.useMutation();
  const { mutate: saveToken } = api.auth.saveMercadoPagoToken.useMutation();
  const { mutate: removeToken } = api.auth.removeMercadoPagoToken.useMutation();
  const { data: userStats } = api.utils.getUserStats.useQuery();
  const { data: isConnected, refetch: refetchConnection } = api.auth.isMercadoPagoConnected.useQuery();
  const [isConnecting, setIsConnecting] = useState(true);
  const [isUpdatingImage, setIsUpdatingImage] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [isError, setIsError] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const largeScreen = useMediaQuery("(min-width: 1300px)");
  const { mutate: getSignedURL } = api.utils.getPresignedURL.useMutation();
  const { colorScheme } = useMantineColorScheme();
  const { data: sessionData, update } = useSession();
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      setIsConnecting(true);
      saveToken({
        token: code,
      }, {
        onSuccess: async () => {
          notifications.show({
            title: "Exito",
            message: "Se conecto correctamente con Mercado Pago",
            color: "green",
            autoClose: 5000,
          });
          setIsConnecting(false);
          await refetchConnection();
        },
        onError: (error) => {
          notifications.show({
            title: "Error",
            message: error.message,
            color: "red",
            autoClose: 5000,
          });
          setIsConnecting(false);
        }
      })
    }

    setIsConnecting(false);
  }, [saveToken, refetchConnection]);

  const handleImageUpload = (fileImage: File) => {
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
    getSignedURL({
      fileName: newFile.name,
      contentType: newFile.type,
    }, {
      onSuccess: async (signedUrlData) => {
        await fetch(signedUrlData.fetchUrl, {
          method: "PUT",
          body: newFile,
          headers: {
            'Content-Type': newFile.type,
          },
        }).then(() => {
          const fileUrl = signedUrlData.fileUrl;
          updateImage({
            imageURL: fileUrl,
          }, {
            onSuccess: async () => {
              notifications.update({
                id: 'update-image',
                title: 'Imagen Subida',
                message: 'La imagen se subió correctamente.',
                color: 'green',
                autoClose: 3000,
                icon: <IconCheck size="1rem" />,
              });
              setIsUpdatingImage(false);
              await update({ image: fileUrl });
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
          })
        })
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
    })
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={`flex flex-col min-w-screen min-h-screen ${colorScheme === "dark" ? "bg-[#0E1525]" : "bg-[#F0F1F8]"}`}>
        <SettingsHeader />
        <main className={`flex flex-grow pt-[60px] ${largeScreen ? "" : "flex-col"}`}>
          <div className={`flex flex-col items-center justify-between py-28 ${largeScreen ? "w-[40%]" : "w-screen"}`}>
            <div className="flex flex-col items-center gap-16">
              <div className="flex flex-col items-center">
                <Avatar className="rounded-full w-[300px] h-[300px] mb-5" src={sessionData?.user.image as string} alt="User Image" />
                <Text className={`text-3xl font-bold ${colorScheme === "dark" ? "text-[#FFF]" : ""}`}>{sessionData?.user.name}</Text>
                <Text className={`text-xl font-semibold ${colorScheme === "dark" ? "text-[#FFF]" : ""}`}>{sessionData?.user.email}</Text>
              </div>
              <div className={`flex gap-8 ${largeScreen ? "" : "mb-8"}`}>
                <div className="flex flex-col items-center gap-3">
                  <Text className={`${largeScreen ? "text-4xl" : "text-2xl"} font-bold ${colorScheme === "dark" ? "text-[#FFF]" : ""}`}>{userStats?.worksAsClient || 0}</Text>
                  <Text className={`${largeScreen ? "text-2xl" : "text-lg"}`}>Pedidos</Text>
                </div>
                <Divider orientation="vertical" size={"md"} />
                <div className="flex flex-col items-center gap-3">
                  <Text
                    className={`${largeScreen ? "text-4xl" : "text-2xl"} font-bold ${colorScheme === "dark" ? "text-[#FFF]" : ""}`}
                  >{userStats?.printers || 0}
                  </Text>
                  <Text
                    className={`${largeScreen ? "text-2xl" : "text-lg"}`}
                  >Impresoras
                  </Text>
                </div>
                <Divider orientation="vertical" size={"md"} />
                <div className="flex flex-col items-center gap-3">
                  <Text
                    className={`${largeScreen ? "text-4xl" : "text-2xl"} font-bold ${colorScheme === "dark" ? "text-[#FFF]" : ""}`}
                  >{userStats?.worksAsWorker || 0}
                  </Text>
                  <Text
                    className={`${largeScreen ? "text-2xl" : "text-lg"}`}
                  >Trabajos
                  </Text>
                </div>
              </div>
            </div>
            <div className={`flex gap-5 pt-10`}>
              <FileButton
                onChange={(file) => handleImageUpload(file as File)}
                accept="image/png,image/jpeg"
              >
                {(props) => <Button
                  {...props}
                  className="w-min bg-blue-500 hover:bg-blue-700 rounded-md"
                  size="lg"
                  loading={isUpdatingImage}
                >Cambiar Foto</Button>}
              </FileButton>
              <CheckDeletePopup />
            </div>
          </div>
          {largeScreen && <Divider orientation="vertical" size={"md"} my={"100px"} />}
          <div className={`flex flex-col py-28 px-5 justify-between ${largeScreen ? "w-[60%] pl-10" : "min-w-full"}`}>
            <div className={`flex flex-col`}>
              <Text className={`text-5xl font-bold ${colorScheme === "dark" ? "text-[#FFF]" : ""}`}>Informacion Personal</Text>
              <div className="flex flex-col gap-5 mt-5">
                <TextInput
                  className={`${largeScreen ? "w-[40%]" : "w-full"}`}
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
                  className={`${largeScreen ? "w-[40%]" : "w-full"}`}
                  label="Email"
                  onChange={(event) => {
                    setNewEmail(event.currentTarget.value);
                    setIsError(false);
                  }}
                  defaultValue={sessionData?.user.email as string}
                  error={isError}
                  size="md"
                />
                <Button
                  className={`w-min bg-blue-500 hover:bg-blue-700 mt-3`}
                  size="md"
                  loading={isUpdatingUser}
                  onClick={handleUserInfoUpdate}
                >Guardar Cambios</Button>
              </div>
              <Text className={`text-5xl font-bold mt-8 ${colorScheme === "dark" ? "text-[#FFF]" : ""}`}>Privacidad</Text>
              <div className="flex flex-col gap-5 mt-5">
                <div className="flex items-center">
                  <TextInput
                    className={`${largeScreen ? "w-[40%]" : "w-full"}`}
                    label="Contraseña"
                    placeholder="**********"
                    disabled
                    size="md"
                  />
                  <Button
                    className="w-min bg-blue-500 hover:bg-blue-700 self-end ml-5"
                    size="md"
                    onClick={() => {
                      void router.push("/recoverPassword")
                    }}
                  >Cambiar Contraseña</Button>
                </div>
                <div className="flex items-center mt-4 gap-5">
                  <Button
                    className={`w-min h-[42px] bg-blue-500 hover:bg-blue-700`}
                    size="md"
                    loading={isConnecting}
                    onClick={() => {
                      if (isConnected) return true;
                      setIsConnecting(true);
                      const clientId = process.env.NEXT_PUBLIC_MP_APP_ID as string;
                      const state = `${sessionData?.user.id as string}_${Date.now()}`;
                      const redirectUri = "https://printitweb.vercel.app/settings"
                      const authUrl = `https://auth.mercadopago.com/authorization?client_id=${clientId}&response_type=code&platform_id=mp&state=${state}&redirect_uri=${redirectUri}`;
                      void router.push(authUrl);
                    }}

                  >
                    {isConnected ? "Cuenta conectada" : isConnecting ? "Conectando..." : "Conectar Mercado Pago"}
                    {isConnecting ? "" : <MercadoPagoLogo />}
                  </Button>
                  {
                    isConnected && 
                    <Button
                      className="w-min h-[42px] bg-red-500 hover:bg-red-700"
                      loading={isConnecting}
                      size="md"
                      onClick={() => {
                        setIsConnecting(true);
                        removeToken({}, {
                          onSuccess: async () => {
                            notifications.show({
                              title: "Exito",
                              message: "Se desconecto correctamente de Mercado Pago",
                              color: "green",
                              autoClose: 5000,
                            });
                            setIsConnecting(false);
                            await refetchConnection();
                          },
                          onError: (error) => {
                            notifications.show({
                              title: "Error",
                              message: error.message,
                              color: "red",
                              autoClose: 5000,
                            });
                            setIsConnecting(false);
                          }
                        })
                      }}
                    >
                      Desconectar
                    </Button>
                  }
                </div>
              </div>
            </div>
            <Button
              className={`w-min bg-blue-500 hover:bg-blue-700 ${largeScreen ? "" : "mt-20"}`}
              size="lg"
              onClick={() => {
                void router.push("/dashboard/subirArchivo")
              }}
            >
              <IconArrowBack className="mr-2" />
              Volver
            </Button>
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
      <Button className="bg-red-600 p-3 hover:bg-red-700 rounded-md" size="lg" onClick={open}>Eliminar Foto</Button>
    </>
  )
}

export default Settings;