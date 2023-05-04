import { z } from "zod";
import bcrypt from "bcrypt";
import { env } from "~/env.mjs";
import jwt from "jsonwebtoken";
import { getServerAuthSession } from "~/server/auth";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";
import { GetServerSidePropsContext } from "next";

export const authRouter = createTRPCRouter({
    login: publicProcedure
        .input(z.object({ email: z.string(), password: z.string() }))
        .query(async ({ input, ctx }) => {
            const user = await ctx.prisma.user.findUnique({
                where: {
                    email: input.email,
                },
            });

            if (!user) {
                throw new Error('Invalid email or password');
            }

            const { password } = user;

            if (!password) {
                throw new Error('User has no Password');
            }

            const passwordValid = await bcrypt.compare(input.password, password);

            if (!passwordValid) {
                throw new Error('Invalid email or password');
            }

            const token = jwt.sign({ userId: user.id }, env.JWT_SECRET);

            return {
                token,
                user
            };
        }),
    register: publicProcedure
        .input(z.object({ email: z.string(), password: z.string() }))
        .query(async ({ input, ctx }) => {
            const existingUser = await ctx.prisma.user.findUnique({
                where: {
                    email: input.email,
                },
            });

            if (existingUser) {
                throw new Error('User with that email already exists');
            }

            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(input.password, salt);

            const newUser = await ctx.prisma.user.create({
                data: {
                    email: input.email,
                    password: hashedPassword,
                },
            });

            const token = jwt.sign({ userId: newUser.id }, env.JWT_SECRET);

            return {
                token,
                user: newUser,
            };
        })
    /*
    authorization: protectedProcedure.query(({ ctx }) => {
        //Things
    })*/
})