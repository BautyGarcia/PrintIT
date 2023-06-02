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

const useStyles = createStyles((theme) => ({
    title: {
        fontSize: rem(26),
        fontWeight: 900,
        fontFamily: theme.fontFamily,
    },

    controls: {
        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'column-reverse',
        },
    },

    control: {
        [theme.fn.smallerThan('xs')]: {
            width: '100%',
            textAlign: 'center',
        },
    },

}));

const RecoverPassword: NextPage = () => {
    const router = useRouter();
    const { classes } = useStyles();
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
        <Group className={colorScheme === "dark" ? "bg-[#1C2333]" : "bg-[F0F1F8]"}>
            <Container size={460} mt={280} className="flex flex-col w-screen h-screen items-center">
                <Title className={classes.title} align="center">
                    Recuperación de Contraseña
                </Title>
                <Text c="dimmed" fz="sm" ta="center">
                    Ingresa tu nueva contraseña
                </Text>

                <form onSubmit={handleSubmit}>
                    <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                        <Text component="label" htmlFor="your-password" size="sm" weight={500}>
                            Contraseña
                        </Text>
                        <PasswordInput placeholder="********" onChange={(e) => { setPassword(e.target.value); setError(false) }} className="mb-5 mt-1" {...(error ? { error } : {})} disabled={isLoading} />
                        <Text component="label" htmlFor="your-password" size="sm" weight={500}>
                            Confirmar Contraseña
                        </Text>
                        <PasswordInput placeholder="********" onChange={(e) => { setConfirmPassword(e.target.value); setError(false) }} className="mt-1" {...(error ? { error } : {})} disabled={isLoading} />
                        <Group position="apart" mt="lg" className={classes.controls}>
                            <Anchor color="dimmed" size="sm" className={classes.control}>
                                <Center inline>
                                    <IconArrowLeft size={rem(12)} stroke={1.5} />
                                    <Box ml={5} onClick={() => void router.push("/signIn")}>Voler al inicio de sesión</Box>
                                </Center>
                            </Anchor>
                            <Button type="submit" className={colorScheme === "dark" ? "bg-[#1864ab]" : "bg-[#1c7ed6]"} loading={isLoading}>Reset password</Button>
                        </Group>
                    </Paper>
                </form>
            </Container>
        </Group>
    );
};

export default RecoverPassword;