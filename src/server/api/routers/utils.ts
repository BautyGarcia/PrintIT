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

export const utilsRouter = createTRPCRouter({
    fetchFilamentPrice: publicProcedure
        .input(z.object({ printVolume: z.number() }))
        .mutation(async ({ input }) => {
            const { printVolume } = input;

            return fetch("https://api.mercadolibre.com/sites/MLA/search?q=Filamento%20Negro%20PLA%201kg", {
                headers: {
                    "Authorization": `Bearer ${process.env.MELIACCESS as string}`
                },
            })
                .then(response => response.json())
                .then(data => {
                    let filamentAverage = 0;
                    (data.results as ResultProps[]).forEach((result: ResultProps) => {
                        filamentAverage += result.price;
                    });
                    const filamentAveragePrice = filamentAverage / (data.results as ResultProps[]).length;
                    
                    const gramsOfFilament = ((printVolume * 330) / 800) * 2.5;
                    
                    const price = ((gramsOfFilament * filamentAveragePrice) / 1000) * 1.15;

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
        
});