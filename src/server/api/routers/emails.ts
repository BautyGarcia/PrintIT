import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import { env } from "process";
import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";
import path from "path";
import {
    recoverPasswordTemplate,
    createWorkTemplate,
    finishNegotiationTemplate,
    updateBidTemplate,
    payedPrintToBuyerTemplate,
    payedPrintToWorkerTemplate,
    finishedPrintingTemplate
} from "~/utils/emailTemplates";

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: env.MAILUSER,
        pass: env.MAILPASSWORD,
    }
});

const imagePath = path.join(process.cwd(), 'public', 'LogoWhite.png');
const attachments = [
    {
        filename: 'LogoWhite.png',
        path: imagePath,
        cid: 'logoBlanco'
    }
];

export const emailRouter = createTRPCRouter({
    sendPasswordEmail: publicProcedure
        .input(z.object({ email: z.string() }))
        .mutation(async ({ input, ctx }) => {

            //Get input
            const { email } = input;

            //Check if email is asigned to a user
            const user = await ctx.prisma.user.findUnique({
                where: {
                    email,
                },
            });

            if (!user) {
                throw new Error("Este Email no esta asignado a ninguna cuenta");
            }

            //Create token
            const token = uuidv4();
            console.log(token);

            //Create token register
            const newRecoverPasswordToken = await ctx.prisma.passwordResetToken.create({
                data: {
                    email,
                    token,
                    expiresAt: new Date(Date.now() + 1000 * 60 * 60),
                },
            });

            const emailName = email.slice(0, email.indexOf('@'));
            const redirectURL = env.NODE_ENV === "production" ? `https://printitweb.vercel.app/recoverPassword/${token}` : `http://localhost:3000/recoverPassword/${token}`;

            //Set mail options
            const mailOptions = {
                from: 'PrintIT <contact.printit.app@gmail.com>',
                to: email,
                subject: 'PrintIT - Olvidaste tu contraseña',
                html: recoverPasswordTemplate(emailName, redirectURL),
                attachments
            };

            //Send Email
            try {
                await transporter.sendMail(mailOptions);
                console.log("Recovery email sent successfully.");
                return newRecoverPasswordToken;
            } catch (error) {
                console.log(error);
                throw new Error("No se pudo enviar el Email de recuperación");
            }
        }),
    sendUsEmail: publicProcedure
        .input(z.object({ email: z.string(), name: z.string(), message: z.string(), surname: z.string() }))
        .mutation(async ({ input }) => {

            //Get input
            const { email, name, message, surname } = input;

            //Set mail options
            const mailOptions = {
                from: 'PrintIT <contact.printit.app@gmail.com>',
                to: 'PrintIT <contact.printit.app@gmail.com>',
                subject: "Mensaje",
                html: `<p>De: ${email}, Nombre: ${name}, Apellido: ${surname}</p><p>${message}</p>`,
            };

            //Send Email
            try {
                await transporter.sendMail(mailOptions);
                console.log("Email sent successfully.");
                return true;
            } catch (error) {
                console.log(error);
                throw new Error("No se pudo enviar el Email");
            }
        }),
    sendCreateWorkEmail: protectedProcedure
        .input(z.object({ email: z.string(), clientName: z.string(), workerName: z.string() }))
        .mutation(async ({ input }) => {
            const { email, clientName, workerName } = input;

            const redirectURL = env.NODE_ENV === "production" ? `https://printitweb.vercel.app/dashboard/misTrabajos` : `http://localhost:3000/dashboard/misTrabajos`;

            const mailOptions = {
                from: 'PrintIT <contact.printit.app@gmail.com>',
                to: email,
                subject: 'PrintIT - ¡Tenemos un trabajo para ti!',
                html: createWorkTemplate(clientName, redirectURL, workerName),
                attachments
            };

            try {
                await transporter.sendMail(mailOptions);
                return { message: "Email sent successfully." };
            } catch (error) {
                console.log(error);
                throw new Error("No se pudo enviar el Email de crear trabajo");
            }
        }),
    sendNegotiationFinishedEmail: protectedProcedure
        .input(z.object({ workId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { workId } = input;
            const userId = ctx.session.user.id;

            const work = await ctx.prisma.work.findUnique({
                where: {
                    id: workId,
                },
                include: {
                    client: {
                        select: {
                            email: true,
                            name: true,
                            id: true,
                        }
                    },
                    worker: {
                        select: {
                            email: true,
                            name: true,
                            id: true,
                        }
                    },
                }
            });

            if (!work) {
                throw new Error("No se pudo encontrar el trabajo");
            }

            if (work.client.id !== userId && work.worker.id !== userId) {
                throw new Error("No tienes permiso para ver este trabajo");
            }

            try {
                await transporter.sendMail({
                    from: 'PrintIT <contact.printit.app@gmail.com>',
                    to: work.client.email,
                    subject: 'PrintIT - ¡Se terminó la negociación!',
                    html: finishNegotiationTemplate(work.client.name),
                    attachments
                });
                await transporter.sendMail({
                    from: 'PrintIT <contact.printit.app@gmail.com>',
                    to: work.worker.email,
                    subject: 'PrintIT - ¡Se terminó la negociación!',
                    html: finishNegotiationTemplate(work.worker.name),
                    attachments
                });
                return { message: "Email sent successfully." };
            } catch (error) {
                console.log(error);
                throw new Error("No se pudo enviar el Email de terminar negociación");
            }
        }),
    sendUpdateBidEmail: protectedProcedure
        .input(z.object({ workId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { workId } = input;
            const bidderId = ctx.session.user.id;

            const work = await ctx.prisma.work.findUnique({
                where: {
                    id: workId,
                },
                include: {
                    client: {
                        select: {
                            email: true,
                            name: true,
                            id: true,
                        }
                    },
                    worker: {
                        select: {
                            email: true,
                            name: true,
                            id: true,
                        }
                    },
                }
            });

            if (!work) {
                throw new Error("No se pudo encontrar el trabajo");
            }

            if (work.client.id !== bidderId && work.worker.id !== bidderId) {
                throw new Error("No tienes permiso para ver este trabajo");
            }

            const email = work.client.id === bidderId ? work.worker.email : work.client.email;
            const name = work.client.id === bidderId ? work.worker.name : work.client.name;

            const redirectSection = work.client.id === bidderId ? "misPedidos" : "misTrabajos";
            const redirectURL = env.NODE_ENV === "production" ? `https://printitweb.vercel.app/dashboard/${redirectSection}` : `http://localhost:3000/dashboard/${redirectSection}`;
            const redirectName = redirectSection === "misPedidos" ? "Mis Pedidos" : "Mis Trabajos";

            const mailOptions = {
                from: 'PrintIT <contact.printit.app@gmail.com>',
                to: email,
                subject: 'PrintIT - ¡Hay contraoferta!',
                html: updateBidTemplate(name, redirectURL, redirectName),
                attachments
            };

            try {
                await transporter.sendMail(mailOptions);
                return { message: "Email sent successfully." };
            } catch (error) {
                console.log(error);
                throw new Error("No se pudo enviar el Email de contraoferta");
            }
        }),
    sendPaymentEmail: protectedProcedure
        .input(z.object({ workId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { workId } = input;
            const userId = ctx.session.user.id;

            const work = await ctx.prisma.work.findUnique({
                where: {
                    id: workId,
                },
                include: {
                    client: {
                        select: {
                            email: true,
                            name: true,
                            id: true,
                        }
                    },
                    worker: {
                        select: {
                            email: true,
                            name: true,
                            id: true,
                        }
                    },
                }
            });

            if (!work) {
                throw new Error("No se pudo encontrar el trabajo");
            }

            if (work.client.id !== userId && work.worker.id !== userId) {
                throw new Error("No tienes permiso para ver este trabajo");
            }

            let redirectURL = env.NODE_ENV === "production" ? `https://printitweb.vercel.app/dashboard/misPedidos` : `http://localhost:3000/dashboard/misPedidos`;
            let redirectName = "Mis Pedidos";

            let mailOptions = {
                from: 'PrintIT <contact.printit.app@gmail.com>',
                to: work.client.email,
                subject: 'PrintIT - ¡Pago Realizdo!',
                html: payedPrintToBuyerTemplate(work.client.name, redirectURL, redirectName),
                attachments
            };

            try {
                await transporter.sendMail(mailOptions);
            } catch (error) {
                console.log(error);
                throw new Error("No se pudo enviar el Email de realizacion de pago a comprador");
            }

            redirectURL = env.NODE_ENV === "production" ? `https://printitweb.vercel.app/dashboard/misTrabajos` : `http://localhost:3000/dashboard/misTrabajos`;
            redirectName = "Mis Trabajos";

            mailOptions = {
                from: 'PrintIT <contact.printit.app@gmail.com>',
                to: work.worker.email,
                subject: 'PrintIT - ¡Pago Realizdo!',
                html: payedPrintToWorkerTemplate(work.worker.name, redirectURL, redirectName),
                attachments
            };

            try {
                await transporter.sendMail(mailOptions);
                return { message: "Emails sent successfully." };
            } catch (error) {
                console.log(error);
                throw new Error("No se pudo enviar el Email de realizacion de pago a vendedor");
            }
        }),
    sendFinishedWorkEmail: protectedProcedure
        .input(z.object({ workId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { workId } = input;
            const userId = ctx.session.user.id;

            const work = await ctx.prisma.work.findUnique({
                where: {
                    id: workId,
                },
                include: {
                    client: {
                        select: {
                            email: true,
                            name: true,
                            id: true,
                        }
                    },
                    worker: {
                        select: {
                            email: true,
                            name: true,
                            id: true,
                        }
                    },
                }
            });

            if (!work) {
                throw new Error("No se pudo encontrar el trabajo");
            }

            if (work.client.id !== userId && work.worker.id !== userId) {
                throw new Error("No tienes permiso para ver este trabajo");
            }

            const redirectURL = env.NODE_ENV === "production" ? `https://printitweb.vercel.app/dashboard/misPedidos` : `http://localhost:3000/dashboard/misPedidos`;
            const redirectName = "Mis Pedidos";

            const mailOptions = {
                from: 'PrintIT <contact.printit.app@gmail.com>',
                to: work.client.email,
                subject: 'PrintIT - ¡Se Termino!',
                html: finishedPrintingTemplate(work.client.name, redirectURL, redirectName),
                attachments
            };

            try {
                await transporter.sendMail(mailOptions);
                return { message: "Emails sent successfully." };
            } catch (error) {
                console.log(error);
                throw new Error("No se pudo enviar el Email de finalizar impresion");
            }
        }),
});
