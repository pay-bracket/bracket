import { publicProcedure, router } from "./trpc.js";

export const appRouter = router({
  ping: publicProcedure.query(() => "pont"),
});

export type AppRouter = typeof appRouter;

