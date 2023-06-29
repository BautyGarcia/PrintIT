import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
} from "~/server/api/trpc";

export const workRouter = createTRPCRouter({
    getMyWorks: publicProcedure
        .input(z.object({ userEmail: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { userEmail } = input;

            const works = await ctx.prisma.work.findMany({
                where: {
                    worker: {
                        email: userEmail,
                    }
                },
            });

            if (!works) {
                return null;
            }

            return works;
        }),
    getMyOrders: publicProcedure
        .input(z.object({ userEmail: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { userEmail } = input;

            const works = await ctx.prisma.work.findMany({
                where: {
                    client: {
                        email: userEmail,
                    }
                },
            });

            if (!works) {
                return null;
            }

            return works;
        }),
    createWork: publicProcedure
        .input(z.object({ clientEmail: z.string(), workerEmail: z.string(), printerId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { clientEmail, workerEmail, printerId } = input;

            const newWork = await ctx.prisma.work.create({
                data: {
                    client: {
                        connect: {
                            email: clientEmail,
                        },
                    },
                    worker: {
                        connect: {
                            email: workerEmail,
                        },
                    },
                    printer: {
                        connect: {
                            id: printerId,
                        },
                    },
                    status: "NEGOTIATING",
                }
            })

            if (!newWork) {
                throw new Error("Hubo un problema agregando el trabajo");
            }

            return newWork;
        })
})
