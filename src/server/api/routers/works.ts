import { type PrismaClient, RoleTypes } from "@prisma/client";
import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
} from "~/server/api/trpc";

const getWorkInfoAndUserRoleType = async (prisma: PrismaClient, workId: string, userId: string) => { 
    let roleType: RoleTypes = "CLIENT" || "WORKER";
    const work = await prisma.work.findUnique({
        where: {
            id: workId,
        },
    });

    if (!work) {
        throw new Error("Este trabajo no existe");
    }

    if (work.clientId !== userId && work.workerId !== userId) {
        throw new Error("No perteences a este trabajo");
    }

    if (work.clientId === userId) {
        roleType = "CLIENT";
    } 

    if (work.workerId === userId) {
        roleType = "WORKER";
    }

    return { work, roleType };
}

export const workRouter = createTRPCRouter({
    getMyWorks: publicProcedure
        .input(z.object({ userId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { userId } = input;

            const works = await ctx.prisma.work.findMany({
                where: {
                    worker: {
                        id: userId,
                    }
                },
            });

            if (!works) {
                return null;
            }

            return works;
        }),
    getMyOrders: publicProcedure
        .input(z.object({ userId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { userId } = input;

            const works = await ctx.prisma.work.findMany({
                where: {
                    client: {
                        id: userId,
                    }
                },
            });

            if (!works) {
                return null;
            }

            return works;
        }),
    createWork: publicProcedure
        .input(z.object({ clientId: z.string(), workerId: z.string(), printerId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { clientId, workerId, printerId } = input;

            const newWork = await ctx.prisma.work.create({
                data: {
                    client: {
                        connect: {
                            id: clientId,
                        },
                    },
                    worker: {
                        connect: {
                            id: workerId,
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
        }),
    cancelWork: publicProcedure
        .input(z.object({ userId: z.string(), workId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { userId, workId } = input;

            const work = await ctx.prisma.work.findUnique({
                where: {
                    id: workId,
                },
            });

            if (!work) {
                throw new Error("Este trabajo no existe");
            }

            if (work.clientId !== userId && work.workerId !== userId) {
                throw new Error("No tienes permiso para cancelar este trabajo");
            }

            const canceledWork = await ctx.prisma.work.update({
                where: {
                    id: workId,
                },
                data: {
                    status: "CANCELED",
                },
            });

            if (!canceledWork) {
                throw new Error("Hubo un problema cancelando el trabajo");
            }

            return canceledWork;
        }),
    updateWorkBid: publicProcedure
        .input(z.object({ workId: z.string(), bid: z.number(), bidderId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { workId, bid, bidderId } = input;

            const workInfo = await getWorkInfoAndUserRoleType(ctx.prisma, workId, bidderId);

            const updatedWork = await ctx.prisma.work.update({
                where: {
                    id: workId,
                },
                data: {
                    price: bid,
                    lastBidder: workInfo.roleType,
                },
            });

            if (!updatedWork) {
                throw new Error("Hubo un problema actualizando el trabajo");
            }

            return updatedWork;
        }),
    setWorkToPrinting: publicProcedure
        .input(z.object({ workId: z.string(), userId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { workId, userId } = input;

            await getWorkInfoAndUserRoleType(ctx.prisma, workId, userId);

            const confirmedWork = await ctx.prisma.work.update({
                where: {
                    id: workId,
                },
                data: {
                    status: "PRINTING",
                },
            });

            if (!confirmedWork) {
                throw new Error("Hubo un problema confirmando el trabajo");
            }

            return confirmedWork;
        }
    ),
    setWorkToShipping: publicProcedure
        .input(z.object({ workId: z.string(), userId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { workId, userId } = input;

            await getWorkInfoAndUserRoleType(ctx.prisma, workId, userId);

            const confirmedWork = await ctx.prisma.work.update({
                where: {
                    id: workId,
                },
                data: {
                    status: "SHIPPING",
                },
            });

            if (!confirmedWork) {
                throw new Error("Hubo un problema confirmando el trabajo");
            }

            return confirmedWork;
        }),
    setWorkToFinished: publicProcedure
        .input(z.object({ workId: z.string(), userId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { workId, userId } = input;

            await getWorkInfoAndUserRoleType(ctx.prisma, workId, userId);

            const confirmedWork = await ctx.prisma.work.update({
                where: {
                    id: workId,
                },
                data: {
                    status: "FINISHED",
                },
            });

            if (!confirmedWork) {
                throw new Error("Hubo un problema confirmando el trabajo");
            }

            return confirmedWork;
        }),
})
