import { notifications } from "@mantine/notifications";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/utils/api";
import {
    createStyles,
    Paper,
    Title,
    Text,
    Button,
    Container,
    Group,
    Anchor,
    Center,
    Box,
    rem,
    PasswordInput,
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useMantineColorScheme } from "@mantine/core";
import Head from "next/head";
import { Logo } from "~/components/logo";
import { useMediaQuery } from "@mantine/hooks";
import { RecoverIMG } from "~/components/recoverImg";



const RecoverPassword: NextPage = () => {
    const router = useRouter();
    const { colorScheme } = useMantineColorScheme();

    const { token } = router.query;
    const { data: userEmail } = api.auth.getEmailByToken.useQuery(
        { token: token as string },
        { enabled: token !== undefined }
    );
    const { mutate: ResetPassword } = api.auth.resetPassword.useMutation();
    const { mutate: deleteToken } = api.auth.deletePasswordRecoveryRecord.useMutation();
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
                message: "Esta session ya expiro o su contraseña ya fue restablecida. Por favor intente nuevamente.",
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
                <div className="absolute ml-5 mt-5 flex items-center gap-2">
                    <Logo width={40} height={40} href="/" />
                    <h2>PrintIT</h2>
                </div>
        <main className={colorScheme === "dark" ? "h-screen w-1/2 bg-[#1C2333] flex flex-col justify-start items-center text-center" : "h-screen w-1/2 bg-[#FFFFFF] flex flex-col justify-start items-center text-center"}>
            <section className={
                largeScreen
                 ? "flex h-screen w-full flex-col items-center justify-center text-center align-center"
                 : "flex h-screen w-full flex-col items-center justify-center text-center align-center"
                }>
                <Title className={
                    colorScheme === "dark"
                        ? "font-family-Inter text-xl text-white text-center align-center w-4/5"
                        : "font-family-Inter text-xl text-black text-center align-center w-4/5"
                    }>
                    Recuperación de Contraseña
                </Title>
                <Text className={
                    colorScheme === "dark"
                        ? "font-family-Inter text-xs text-white text-center"
                        : "font-family-Inter text-xs text-black text-center"
                    }>
                    Ingresa tu nueva contraseña
                </Text>

                <form onSubmit={handleSubmit} className="mx-auto mt-8 flex w-full flex-col items-center justify-center text-center">
                    <div className="mb-2 w-4/5 shadow">
                        <Text fw={500} className="font-family-Inter justify-left flex">
                            Contraseña
                        </Text>
                        <PasswordInput placeholder="********" onChange={(e) => { setPassword(e.target.value); setError(false) }} className="mb-5 mt-1" {...(error ? { error } : {})} disabled={isLoading} />
                        <Text fw={500} className="font-family-Inter justify-left flex">
                            Confirmar Contraseña
                        </Text>
                        <PasswordInput placeholder="********" onChange={(e) => { setConfirmPassword(e.target.value); setError(false) }} className="mt-1" {...(error ? { error } : {})} disabled={isLoading} />
                        <Group position="apart" mt="lg">
                            <Anchor color="dimmed" size="sm">
                                <Center inline>
                                    <IconArrowLeft size={rem(12)} stroke={1.5} />
                                    <Box ml={5} onClick={() => void router.push("/signIn")}>Voler al inicio de sesión</Box>
                                </Center>
                            </Anchor>
                            <Button type="submit" className={colorScheme === "dark" ? "bg-[#1864ab]" : "bg-[#1c7ed6]"} loading={isLoading}>Reset password</Button>
                        </Group>
                    </div>
                </form>
            </section>
            <picture
                className={
                    largeScreen ? "absolute right-0 top-0 h-screen w-1/2" : "hidden"
                }
            >
                <RecoverIMG />
            </picture>
        </main>
        </>
    );
};

export default RecoverPassword;