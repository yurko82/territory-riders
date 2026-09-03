import { COOKIE_NAME } from "../shared/const.js";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  territory: router({
    list: publicProcedure.query(() => db.listTerritories()),
    activity: publicProcedure.query(() => db.listRecentEvents()),
    submitRide: protectedProcedure
      .input(z.object({
        distanceM: z.number().int().min(0).max(1_000_000),
        durationSec: z.number().int().min(1).max(86_400),
        route: z.array(z.object({ latitude: z.number(), longitude: z.number() })).min(2).max(5_000),
      }))
      .mutation(({ ctx, input }) => db.createRide({
        userId: ctx.user.id,
        distanceM: input.distanceM,
        durationSec: input.durationSec,
        route: input.route,
        status: "pending",
      })),
  }),
});

export type AppRouter = typeof appRouter;
