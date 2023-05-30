import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import { env } from "process";
import bcrypt from "bcrypt";

import {
    createTRPCRouter,
    publicProcedure,
} from "~/server/api/trpc";
import path from "path";

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: env.MAILUSER,
        pass: env.MAILPASSWORD,
    }
});

const emailText = (username: string, redirectURL: string) => `
    <!DOCTYPE html>

    <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Recovery</title>
            <style>
                body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                background-color: #f2f2f2;
                }

                .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 4px;
                overflow: hidden;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .header {
                padding: 20px;
                background-color: #007bff;
                color: #ffffff;
                text-align: center;
                }

                .logo {
                max-width: 50px;
                margin: 0 auto;
                display: block;
                }

                .content {
                padding: 20px;
                text-align: center;
                }

                .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007bff;
                color: #ffffff;
                text-decoration: none;
                border-radius: 4px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="cid:logoBlanco" alt="App Logo" class="logo">
                </div>
                <div class="content">
                    <h1>Recuperación de contraseña</h1>
                    <p>Hola <b>${username}</b>,</p>
                    <p>Hemos recibido una solicitud para restablecer tu contraseña. Para continuar, por favor haz clic en el siguiente botón:</p>
                    <a href="${redirectURL}" class="button">Restablecer Contraseña</a>
                    <p>Si no solicitaste restablecer la contraseña, por favor ignora este correo electrónico.</p>
                    <p>Gracias,</p>
                    <p>El equipo de PrintIT</p>
                </div>
            </div>
        </body>
    </html>
`


export const authRouter = createTRPCRouter({
    sendPasswordEmail: publicProcedure
        .input(z.object({ email: z.string() }))
        .mutation(async ({ input, ctx }) => {

            //Get input
            const { email } = input;

            //Check if email is asigned to a user
            const user = await ctx.prisma.user.findUnique({
                where: {
                    email,
                },
            });

            if (!user) {
                throw new Error("Este Email no esta asignado a ninguna cuenta");
            }

            //Create token
            const token = uuidv4();
            console.log(token);

            //Create token register
            const newRecoverPasswordToken = await ctx.prisma.passwordResetToken.create({
                data: {
                    email,
                    token,
                    expiresAt: new Date(Date.now() + 1000 * 60 * 60),
                },
            });

            const emailName = email.slice(0, email.indexOf('@'));
            const redirectURL = env.NODE_ENV === "production" ? `https://printitweb.vercel.app/recoverPassword/${token}` : `http://localhost:3000/recoverPassword/${token}`;
            const imagePath = path.join(process.cwd(), 'public', 'LogoWhite.png');

            //Set mail options
            const mailOptions = {
                from: 'PrintIT <contact.printit.app@gmail.com>',
                to: email,
                subject: 'PrintIT - Olvidaste tu contraseña',
                html: emailText(emailName, redirectURL),
                attachments: [
                    {
                        filename: 'LogoWhite.png',
                        path: imagePath,
                        cid: 'logoBlanco' //same cid value as in the html img src
                    }
                ]
            };

            //Send Email
            try {
                await transporter.sendMail(mailOptions);
                console.log("Recovery email sent successfully.");
                return newRecoverPasswordToken;
            } catch (error) {
                console.log(error);
                throw new Error("No se pudo enviar el Email de recuperación");
            }
        }),
    getEmailByToken: publicProcedure
        .input(z.object({ token: z.string() }))
        .query(async ({ input, ctx }) => {
            const { token } = input;

            const passwordResetToken = await ctx.prisma.passwordResetToken.findUnique({
                where: {
                    token,
                },
                select: {
                    email: true,
                }
            });

            if (!passwordResetToken) {
                return null;
            }

            return passwordResetToken.email;
        }),
    resetPassword: publicProcedure
        .input(z.object({ email: z.string(), password: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { email, password } = input;

            const user = await ctx.prisma.user.findUnique({
                where: {
                    email,
                },
            });

            if (!user) {
                throw new Error("User not found");
            }

            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);

            await ctx.prisma.user.update({
                where: {
                    email,
                },
                data: {
                    password: hashedPassword,
                },
            });

            return user;
        }),
    deletePasswordRecoveryRecord: publicProcedure
        .input(z.object({ token: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { token } = input;

            const passwordResetToken = await ctx.prisma.passwordResetToken.findUnique({
                where: {
                    token,
                },
            });

            if (!passwordResetToken) {
                throw new Error("The token do not exist");
            }

            await ctx.prisma.passwordResetToken.delete({
                where: {
                    token,
                },
            });

            return true;
        }
    ),
    checkIfTokenIsValid: publicProcedure
        .input(z.object({ token: z.string() }))
        .query(async ({ input, ctx }) => {
            const { token } = input;

            const passwordResetToken = await ctx.prisma.passwordResetToken.findUnique({
                where: {
                    token,
                },
            });

            if (!passwordResetToken) {
                return false;
            }

            if (passwordResetToken.expiresAt < new Date()) {
                await ctx.prisma.passwordResetToken.delete({
                    where: {
                        token,
                    },
                });
                return false;
            }

            return true;
        }
    ),
});
