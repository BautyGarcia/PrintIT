import { z } from "zod";
import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";

export const printerRouter = createTRPCRouter({
    addPrinter: protectedProcedure
        .input(z.object({ printerOwner: z.string(), printerBrand: z.string(), printerModel: z.string(), printerType: z.string(), printerArea: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { printerOwner, printerBrand, printerModel, printerType, printerArea } = input;
            const userId = ctx.session.user.id;

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
    getPrinterForSTL: protectedProcedure
        .input(z.object({ bedSize: z.string(), printerType: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { bedSize, printerType } = input;
            const userId = ctx.session.user.id;

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
    getMyPrinters: protectedProcedure
        .query(async ({ ctx }) => {
            const userId = ctx.session.user.id;
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
    deletePrinter: protectedProcedure
        .input(z.object({ printerId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { printerId } = input;
            const ownerId = ctx.session.user.id;

            const printerToDelete = await ctx.prisma.printer.findUnique({
                where: {
                    id: printerId,
                },
            });

            if (!printerToDelete) {
                throw new Error("No existe la impresora para eliminar");
            }

            if (printerToDelete.userId !== ownerId) {
                throw new Error("No tienes permiso para eliminar esta impresora");
            }

            const deletedPrinter = await ctx.prisma.printer.delete({
                where: {
                    id: printerId,
                },
            });

            if (!deletedPrinter) {
                throw new Error("Hubo un problema eliminando la impresora");
            }

            return deletedPrinter;
        }),
})
