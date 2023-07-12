import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
} from "~/server/api/trpc";

export const printerRouter = createTRPCRouter({
    addPrinter: publicProcedure
        .input(z.object({ userId: z.string(), printerOwner: z.string(), printerBrand: z.string(), printerModel: z.string(), printerType: z.string(), printerArea: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { userId, printerOwner, printerBrand, printerModel, printerType, printerArea } = input;

            const newPrinter = await ctx.prisma.printer.create({
                data: {
                    name: printerOwner,
                    brand: printerBrand,
                    model: printerModel,
                    type: printerType,
                    bedSize: printerArea,
                    user: {
                        connect: {
                            id: userId,
                        },
                    },
                }
            })

            if (!newPrinter) {
                throw new Error("Hubo un problema agregando la impresora");
            }

            return newPrinter;
        }),
    getPrinterForSTL: publicProcedure
        .input(z.object({ bedSize: z.string(), printerType: z.string(), userId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { bedSize, printerType, userId } = input;

            const printers = await ctx.prisma.printer.findMany({
                where: {
                    type: printerType,
                    isAvailable: true,
                    NOT: {
                        user: {
                            id: userId,
                        },
                    }
                }
            })

            if (!printers) {
                return null;
            }

            const printersForSTL = printers.filter((printer) => {
                const printerBedSize = printer.bedSize.split("x");
                const stlBedSize = bedSize.split("x");

                console.log("printerBedSize", printerBedSize);
                console.log("stlBedSize", stlBedSize);

                if (Number(printerBedSize[0]) >= Number(stlBedSize[0]) && Number(printerBedSize[1]) >= Number(stlBedSize[1]) && Number(printerBedSize[2]) >= Number(stlBedSize[2])) {
                    return true;
                }

                return false;
            })

            return printersForSTL;
        }),
    getMyPrinters: publicProcedure
        .input(z.object({ userId: z.string() }))
        .query(async ({ input, ctx }) => {
            const { userId } = input;

            const printers = await ctx.prisma.printer.findMany({
                where: {
                    user: {
                        id: userId,
                    },
                }
            })

            if (!printers) {
                return null;
            }

            return printers;
        }),
    deletePrinter: publicProcedure
        .input(z.object({ printerId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { printerId } = input;

            const deletedPrinter = await ctx.prisma.printer.delete({
                where: {
                    id: printerId,
                }
            })

            if (!deletedPrinter) {
                throw new Error("No existe la impresora para eliminar");
            }

            return deletedPrinter;
        }),
})
