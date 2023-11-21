import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure
} from "~/server/api/trpc";
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { Storage } from "@google-cloud/storage";

interface ResultProps {
    id: string;
    title: string;
    price: number;
}

interface DataProps {
    results: ResultProps[];
}

const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: {
        type: process.env.TYPE,
        project_id: process.env.PROJECT_ID,
        private_key: process.env.PRIVATE_KEY,
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
    }
});

export const utilsRouter = createTRPCRouter({
    fetchFilamentPrice: publicProcedure
        .input(z.object({ printVolume: z.number(), printQuality: z.string(), printAmount: z.number() }))
        .mutation(async ({ input }) => {
            const { printVolume, printAmount, printQuality } = input;

            const references: { [key: string]: number } = {
                "Baja": 0.8,
                "Media": 1,
                "Alta": 1.2,
            }

            return fetch("https://api.mercadolibre.com/sites/MLA/search?q=Filamento%203D%20Rollo%20Negro%201kg%20Grillon3")
                .then(response => response.json())
                .then((data: DataProps) => {
                    data.results = data.results.slice(0, 3);

                    let filamentAverage = 0;
                    (data.results).forEach((result) => {
                        filamentAverage += result.price;
                    });
                    const filamentAveragePrice = filamentAverage / (data.results).length;

                    const gramsOfFilament = ((printVolume * 330) / 800) * 2.5;

                    const price = ((((((gramsOfFilament * filamentAveragePrice) / 1000) * 1.15) + 200) * (references[printQuality] ?? 1)) * printAmount);

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
    createPreference: protectedProcedure
        .input(z.object({ quantity: z.number(), id: z.string(), price: z.number() }))
        .mutation(async ({ input, ctx }) => {
            const { quantity, price, id } = input;

            const sellerInfo = await ctx.prisma.work.findUnique({
                where: {
                    id: id,
                },
                select: {
                    worker: {
                        select: {
                            mp_token: true,
                        }
                    }
                },
            });

            if (!sellerInfo) {
                throw new Error("Hubo un problema obteniendo la información del vendedor");
            }

            const client = new MercadoPagoConfig({
                accessToken: process.env.MP_ACCESS_TOKEN as string
            });

            const preference = new Preference(client);


            return preference.create({
                body: {
                    items: [
                        {
                            id: id,
                            title: "Impresion 3D PrintIT",
                            quantity: quantity,
                            currency_id: "ARS",
                            unit_price: price
                        }
                    ],
                    payer: {
                        name: ctx.session.user.name?.split(" ")[0] as string,
                        surname: ctx.session.user.name?.split(" ")[1] as string || "",
                        email: ctx.session.user.email as string,
                    },
                    back_urls: {
                        success: "https://printitweb.vercel.app/dashboard/misPedidos",
                        failure: "https://printitweb.vercel.app/dashboard/misPedidos",
                        pending: "https://printitweb.vercel.app/dashboard/misPedidos",
                    },
                    marketplace_fee: 0.1,
                    auto_return: "approved",
                }
            })
                .then(async (response) => {
                    await ctx.prisma.work.update({
                        where: {
                            id: id,
                        },
                        data: {
                            preferenceId: response.id,
                        },
                    });
                    return { redirectURL: response.init_point, mp_token: sellerInfo.worker.mp_token, id: response.id };
                })
                .catch((error: Error) => {
                    throw new Error(`Hubo un problema creando el formulario de pago. ${error.message}`);
                });
        }),
    getPresignedURL: protectedProcedure
        .input(z.object({ fileName: z.string(), contentType: z.string() }))
        .mutation(async ({ input }) => {
            const { fileName, contentType } = input;

            const expires = Date.now() + 7 * 24 * 60 * 60 * 1000;
            const bucket = storage.bucket(process.env.PROJECT_NAME ?? "");
            
            const [url] = await bucket.file(fileName).getSignedUrl({
                action: "write",
                version: "v4",
                expires,
                contentType,
            })

            return {
                fetchUrl: url, 
                fileUrl: `https://storage.googleapis.com/${process.env.PROJECT_NAME ?? ""}/${fileName}` 
            };
        }),
})