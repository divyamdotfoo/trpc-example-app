import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
// @ts-ignore
import cors from "cors";
const t = initTRPC.create();
export const router = t.router;
export const publicProcedure = t.procedure;
import { postRouter } from "./routers/post";
import { userRouter } from "./routers/user";
import { commentRouter } from "./routers/comment";

export const appRouter = router({
  user: userRouter,
  post: postRouter,
  comment: commentRouter,
});

export type AppRouter = typeof appRouter;

const app = express();
app.use(cors());
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);

app.listen(4000, () => console.log("started"));
