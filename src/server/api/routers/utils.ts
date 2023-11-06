/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure
} from "~/server/api/trpc";
interface ResultProps {
    id: string;
    title: string;
    price: number;
}

interface DataProps {
    results: ResultProps[];
}

export const utilsRouter = createTRPCRouter({
    fetchFilamentPrice: publicProcedure
        .input(z.object({ printVolume: z.number(), printQuality: z.string(), printAmount: z.number() }))
        .mutation(async ({ input }) => {
            const { printVolume, printAmount, printQuality } = input;

            const references: {[key: string]: number} = {
                "Baja": 0.8,
                "Media": 1,
                "Alta": 1.2,
            }

            return fetch("https://api.mercadolibre.com/sites/MLA/search?q=Filamento%203D%20Rollo%20Negro%201kg%20Grillon3", {
                headers: {
                    "Authorization": `Bearer ${process.env.MELIACCESS as string}`
                },
            })
                .then(response => response.json())
                .then((data: DataProps) => {
                    data.results = data.results.slice(0, 3);

                    let filamentAverage = 0;
                    (data.results).forEach((result) => {
                        filamentAverage += result.price;
                    });
                    const filamentAveragePrice = filamentAverage / (data.results).length;

                    const gramsOfFilament = ((printVolume * 330) / 800) * 2.5;

                    const price = (((((gramsOfFilament * filamentAveragePrice) / 1000) * 1.15) * (references[printQuality] ?? 1)) * printAmount);

                    return Math.ceil(price);
                })
                .catch((err: Error) => {
                    throw err;
                });
        }),
    updateImage: protectedProcedure
        .input(z.object({ imageURL: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { imageURL } = input;
            const userId = ctx.session.user.id;

            try {
                await ctx.prisma.user.update({
                    where: {
                        id: userId
                    },
                    data: {
                        image: imageURL,
                    }
                });

                return { "message": "Imagen actualizada" };
            } catch (err) {
                throw new Error("Hubo un problema actualizando la imagen");
            }
        }),
    removeImage: protectedProcedure
        .input(z.object({}))
        .mutation(async ({ ctx }) => {
            const userId = ctx.session.user.id;

            try {
                await ctx.prisma.user.update({
                    where: {
                        id: userId
                    },
                    data: {
                        image: null,
                    }
                });

                return { "message": "Imagen eliminada" };
            } catch (err) {
                throw new Error("Hubo un problema eliminando la imagen");
            }
        }),
    updateUserInfo: protectedProcedure
        .input(z.object({ name: z.string(), email: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { name, email } = input;
            const userId = ctx.session.user.id;

            try {
                await ctx.prisma.user.update({
                    where: {
                        id: userId
                    },
                    data: {
                        name,
                        email,
                    }
                });

                return { "message": "Información actualizada" };
            } catch (err) {
                throw new Error("Hubo un problema actualizando la información");
            }
        }),
    getUserStats: protectedProcedure
        .query(async ({ ctx }) => {
            const userId = ctx.session.user.id;

            const userInfo = await ctx.prisma.user.findUnique({
                where: {
                    id: userId
                },
                select: {
                    _count: {
                        select: {
                            worksAsClient: true,
                            printers: true,
                            worksAsWorker: true,
                        }
                    }
                }
            });

            if (!userInfo) {
                throw new Error("Hubo un problema obteniendo la información");
            }

            return userInfo._count;
        }),
});