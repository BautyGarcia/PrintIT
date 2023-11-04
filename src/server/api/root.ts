import { createTRPCRouter } from "~/server/api/trpc";
import { authRouter } from "~/server/api/routers/auth";
import { printerRouter } from "./routers/printers";
import { workRouter } from "./routers/works";
import { emailRouter } from "./routers/emails";
import { utilsRouter } from "./routers/utils";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  printer: printerRouter,
  work: workRouter,
  email: emailRouter,
  utils: utilsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
