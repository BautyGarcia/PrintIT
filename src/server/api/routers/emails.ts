import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import { env } from "process";

import {
    createTRPCRouter,
    publicProcedure,
} from "~/server/api/trpc";
import path from "path";
import recoverPasswordTemplate from "~/utils/emailTemplates";

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: env.MAILUSER,
        pass: env.MAILPASSWORD,
    }
});

export const emailRouter = createTRPCRouter({
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
                html: recoverPasswordTemplate(emailName, redirectURL),
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
    sendUsEmail: publicProcedure
        .input(z.object({ email: z.string(), subject: z.string(), message: z.string() }))
        .mutation(async ({ input }) => {
                
                //Get input
                const { email, subject, message } = input;
    
                //Set mail options
                const mailOptions = {
                    from: 'PrintIT <contact.printit.app@gmail.com>',
                    to: 'PrintIT <contact.printit.app@gmail.com>',
                    subject: subject,
                    html: `<p>De: ${email}</p><p>${message}</p>`,
                };

                //Send Email
                try {
                    await transporter.sendMail(mailOptions);
                    console.log("Email sent successfully.");
                    return true;
                } catch (error) {
                    console.log(error);
                    throw new Error("No se pudo enviar el Email");
                }
            }),
});
