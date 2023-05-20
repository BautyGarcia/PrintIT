import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import { env } from "process";
import bcrypt from "bcrypt";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: env.MAILUSER,
        pass: env.MAILPASSWORD,
    }
});

export const authRouter = createTRPCRouter({
    recoverPassword: publicProcedure
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
                throw new Error("User not found");
            }

            //Create token
            const token = uuidv4();
            console.log(token);

            //Create token register
            const newRecoverPasswordToken = await ctx.prisma.passwordResetToken.create({
                data: {
                    email,
                    token,
                    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 4),
                },
            });

            //Set mail options
            const mailOptions = {
                from: env.MAILUSER,
                to: email,
                subject: "Password Recovery",
                text: `You have requested to recover your password. Please click on the following link to reset your password: http://localhost:3000/recoverPassword/${token}`,
            };

            //Send Email
            try {
                await transporter.sendMail(mailOptions);
                console.log("Recovery email sent successfully.");
                return newRecoverPasswordToken;
            } catch (error) {
                console.log(error);
                throw new Error("Error sending email");
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
                throw new Error("Token not found");
            }

            return passwordResetToken;
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
});
