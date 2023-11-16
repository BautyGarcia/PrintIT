import { type PrismaClient, type RoleTypes } from "@prisma/client";
import { z } from "zod";
import {
    createTRPCRouter,
    protectedProcedure,
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
    getMyWorks: protectedProcedure
        .query(async ({ ctx }) => {
            const userId = ctx.session.user.id;
            const works = await ctx.prisma.work.findMany({
                where: {
                    worker: {
                        id: userId,
                    }
                },
                include: {
                    client: true,
                    prices: {
                        select: {
                            amount: true,
                            offeredAt: true,
                            id: true,
                        }
                    }
                },
                orderBy: {
                    status: 'desc'
                }
            });

            if (!works) {
                return null;
            }

            return works;
        }),
    getMyOrders: protectedProcedure
        .query(async ({ ctx }) => {
            const userId = ctx.session.user.id;
            const works = await ctx.prisma.work.findMany({
                where: {
                    client: {
                        id: userId,
                    }
                },
                include: {
                    worker: true,
                    prices: {
                        select: {
                            amount: true,
                            offeredAt: true,
                            id: true,
                        }
                    }
                }
            });

            if (!works) {
                return null;
            }

            return works;
        }),
    createWork: protectedProcedure
        .input(z.object({ workerId: z.string(), printerId: z.string(), price: z.number(), notes: z.string(), name: z.string(), amount: z.number(), quality: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { workerId, printerId, amount, name, notes, price, quality } = input;
            const clientId = ctx.session.user.id;

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
                    status: "Negociacion",
                    notes,
                    name,
                    amount,
                    quality,
                    prices: {
                        create: {
                            amount: price,
                            offeredAt: new Date(),
                        }
                    }
                }
            })

            if (!newWork) {
                throw new Error("Hubo un problema agregando el trabajo");
            }

            return newWork;
        }),
    cancelWork: protectedProcedure
        .input(z.object({ workId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { workId } = input;
            const userId = ctx.session.user.id;

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
                    status: "Cancelado",
                },
            });

            if (!canceledWork) {
                throw new Error("Hubo un problema cancelando el trabajo");
            }

            return canceledWork;
        }),
    updateWorkBid: protectedProcedure
        .input(z.object({ workId: z.string(), bid: z.number() }))
        .mutation(async ({ input, ctx }) => {
            const { workId, bid } = input;
            const bidderId = ctx.session.user.id;

            const workInfo = await getWorkInfoAndUserRoleType(ctx.prisma, workId, bidderId);

            const updatedWork = await ctx.prisma.work.update({
                where: {
                    id: workId,
                },
                data: {
                    lastBidder: workInfo.roleType,
                    prices: {
                        create: {
                            amount: bid,
                            offeredAt: new Date(),
                        }
                    }
                },
            });

            if (!updatedWork) {
                throw new Error("Hubo un problema actualizando el trabajo");
            }

            return updatedWork;
        }),
    setWorkToPrinting: protectedProcedure
        .input(z.object({ preferenceId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { preferenceId } = input;

            const confirmedWork = await ctx.prisma.work.update({
                where: {
                    preferenceId
                },
                data: {
                    status: "Imprimiendo",
                },
            });

            if (!confirmedWork) {
                throw new Error("Hubo un problema confirmando el trabajo");
            }

            return { id: confirmedWork.id };
        }
        ),
    setWorkToShipping: protectedProcedure
        .input(z.object({ workId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { workId } = input;
            const userId = ctx.session.user.id;

            await getWorkInfoAndUserRoleType(ctx.prisma, workId, userId);

            const confirmedWork = await ctx.prisma.work.update({
                where: {
                    id: workId,
                },
                data: {
                    status: "Enviando",
                },
            });

            if (!confirmedWork) {
                throw new Error("Hubo un problema confirmando el trabajo");
            }

            return confirmedWork;
        }),
    setWorkToFinished: protectedProcedure
        .input(z.object({ workId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { workId } = input;
            const userId = ctx.session.user.id;

            await getWorkInfoAndUserRoleType(ctx.prisma, workId, userId);

            const confirmedWork = await ctx.prisma.work.update({
                where: {
                    id: workId,
                },
                data: {
                    status: "Finalizado",
                },
            });

            if (!confirmedWork) {
                throw new Error("Hubo un problema confirmando el trabajo");
            }

            return confirmedWork;
        }),
    setWorkToPaying: protectedProcedure
        .input(z.object({ workId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { workId } = input;
            const userId = ctx.session.user.id;

            await getWorkInfoAndUserRoleType(ctx.prisma, workId, userId);

            const confirmedWork = await ctx.prisma.work.update({
                where: {
                    id: workId,
                },
                data: {
                    status: "Pagando",
                },
            });

            if (!confirmedWork) {
                throw new Error("Hubo un problema confirmando el trabajo");
            }

            return confirmedWork;
        }),
    setWorkToCancelled: protectedProcedure
        .input(z.object({ workId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { workId } = input;
            const userId = ctx.session.user.id;

            await getWorkInfoAndUserRoleType(ctx.prisma, workId, userId);

            const confirmedWork = await ctx.prisma.work.update({
                where: {
                    id: workId,
                },
                data: {
                    status: "Cancelado",
                },
            });

            if (!confirmedWork) {
                throw new Error("Hubo un problema confirmando el trabajo");
            }

            return confirmedWork;
        }),
    getWorkById: protectedProcedure
        .input(z.object({ workId: z.string() }))
        .query(async ({ input, ctx }) => {
            const { workId } = input;
            const userId = ctx.session.user.id;

            const workInfo = await getWorkInfoAndUserRoleType(ctx.prisma, workId, userId);

            return workInfo;
        }),
    addStlUrlToWork: protectedProcedure
        .input(z.object({ workId: z.string(), stlUrl: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { workId, stlUrl } = input;

            const updatedWork = await ctx.prisma.work.update({
                where: {
                    id: workId,
                },
                data: {
                    stlUrl,
                },
            });

            if (!updatedWork) {
                throw new Error("Hubo un problema actualizando el trabajo");
            }

            return updatedWork;
        }),
    getUserRoleType: protectedProcedure
        .input(z.object({ workId: z.string() }))
        .query(async ({ input, ctx }) => {
            const { workId } = input;
            const userId = ctx.session.user.id;

            const workInfo = await getWorkInfoAndUserRoleType(ctx.prisma, workId, userId);

            return workInfo.roleType;
        }),
})
