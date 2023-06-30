import { z } from "zod";
import bcrypt from "bcrypt";

import {
    createTRPCRouter,
    publicProcedure,
} from "~/server/api/trpc";

export const authRouter = createTRPCRouter({
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
