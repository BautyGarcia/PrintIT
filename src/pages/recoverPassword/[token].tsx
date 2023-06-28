import { notifications } from "@mantine/notifications";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/utils/api";
import {
  Text,
  Button,
  Group,
  Anchor,
  Center,
  PasswordInput,
} from "@mantine/core";
import { useMantineColorScheme } from "@mantine/core";
import Head from "next/head";
import { Logo } from "~/components/Logos/logo";
import { useMediaQuery } from "@mantine/hooks";
import { RecoverTokenIMG } from "~/components/Recover/recoverToken";

const RecoverPassword: NextPage = () => {
  const router = useRouter();
  const { colorScheme } = useMantineColorScheme();

  const { token } = router.query;
  const { data: userEmail } = api.auth.getEmailByToken.useQuery(
    { token: token as string },
    { enabled: token !== undefined }
  );
  const { mutate: ResetPassword } = api.auth.resetPassword.useMutation();
  const { mutate: deleteToken } =
    api.auth.deletePasswordRecoveryRecord.useMutation();
  const { data: checkToken } = api.auth.checkIfTokenIsValid.useQuery(
    { token: token as string },
    { enabled: token !== undefined }
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const largeScreen = useMediaQuery("(min-width: 992px)");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Validation
    if (password.length < 8) {
      setError(true);
      notifications.show({
        title: "Error",
        message: "La contraseña debe tener al menos 8 caracteres.",
        color: "red",
        autoClose: 5000,
      });
      setIsLoading(false);
      return;
    }

    if (!password || !confirmPassword) {
      setError(true);
      notifications.show({
        title: "Error",
        message: "Por favor complete todos los campos.",
        color: "red",
        autoClose: 5000,
      });
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError(true);
      notifications.show({
        title: "Error",
        message: "Las contraseñas no coinciden.",
        color: "red",
        autoClose: 5000,
      });
      setIsLoading(false);
      return;
    }

    // Show a loading indicator
    setIsLoading(true);

    // Check if the token is valid
    if (!checkToken) {
      setError(true);
      notifications.show({
        title: "Error",
        message:
          "Esta session ya expiro o su contraseña ya fue restablecida. Por favor intente nuevamente.",
        color: "red",
        autoClose: 5000,
      });
      setIsLoading(false);
      return;
    }

    // Call the reset password API here and handle the response
    ResetPassword({
      email: userEmail as string,
      password,
    });

    // Reset the form and show a success message
    setPassword("");
    setConfirmPassword("");
    setError(false);

    // Delete the token so it can't be used again
    deleteToken({ token: token as string });

    // Show a notification to the user
    notifications.show({
      title: "Contraseña restablecida",
      message: "Su contraseña se ha restablecido correctamente.",
      color: "green",
      autoClose: 2000,
    });

    setIsLoading(false);
    // Redirect the user to the login page or any other desired page
    await router.push("/signIn");
  };

  return (
    <>
      <Head>
        <title>PrintIT</title>
        <link rel="icon" href="/Logo.ico" />
        <meta name="description" content="PrintIT" />
      </Head>
      <main
        className={
          colorScheme === "dark"
            ? "h-screen w-full bg-[#1C2333]"
            : "h-screen w-full bg-[#FFFFFF]"
        }
      >
        <div className="absolute ml-5 mt-5 flex items-center gap-2">
          <Logo width={40} height={40} href="/" />
        </div>
        <section
          className={
            largeScreen
              ? "flex h-full w-1/2 flex-col items-center justify-center text-center"
              : "flex h-full w-full flex-col items-center justify-center"
          }
        >
          <Text
            className={
              colorScheme === "dark"
                ? "font-family-Inter align-center w-4/5 text-center text-4xl text-white"
                : "flex h-full w-full flex-col items-center justify-center text-4xl"
            }
          >
            Recuperación de Contraseña
          </Text>
          <Text
            className={
              colorScheme === "dark"
                ? "font-family-Inter text-center text-base text-white"
                : "font-family-Inter text-center text-base text-black"
            }
          >
            Ingresa tu nueva contraseña
          </Text>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex w-full flex-col items-center justify-center text-center"
          >
            <div className="mb-2 w-4/5">
              <Text fw={500} className="font-family-Inter justify-left flex">
                Contraseña
              </Text>
              <PasswordInput
                placeholder="********"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className="mb-5 mt-1"
                {...(error ? { error } : {})}
                disabled={isLoading}
              />
              <Text fw={500} className="font-family-Inter justify-left flex">
                Confirmar Contraseña
              </Text>
              <PasswordInput
                placeholder="********"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError(false);
                }}
                className="mt-1"
                {...(error ? { error } : {})}
                disabled={isLoading}
              />
              <Group position="apart" mt="lg">
                <Anchor color="dimmed" size="sm">
                  <Center inline>
                    <Button
                      className={
                        colorScheme === "dark"
                          ? "bg-[#1864ab] text-white"
                          : "bg-[#1c7ed6]"
                      }
                      ml={5}
                      onClick={() => void router.push("/signIn")}
                    >
                      Voler al inicio de sesión
                    </Button>
                  </Center>
                </Anchor>
                <Button
                  type="submit"
                  className={
                    colorScheme === "dark" ? "bg-[#1864ab]" : "bg-[#1c7ed6]"
                  }
                  loading={isLoading}
                >
                  Reset password
                </Button>
              </Group>
            </div>
          </form>
        </section>
        <picture
          className={
            largeScreen ? "absolute right-0 top-0 h-screen w-1/2" : "hidden"
          }
        >
          <RecoverTokenIMG />
        </picture>
      </main>
    </>
  );
};

export default RecoverPassword;
