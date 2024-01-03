import { router, publicProcedure as pp } from "../trpc";
import { z } from "zod";
import { db } from "../db";

export const commentRouter = router({
  create: pp
    .input(
      z.object({ postId: z.string(), userId: z.string(), content: z.string() })
    )
    .mutation(
      async (o) =>
        await db.comment.addComment(
          o.input.postId,
          o.input.userId,
          o.input.content
        )
    ),
  delete: pp
    .input(z.object({ id: z.string() }))
    .mutation(async (o) => await db.comment.delComment(o.input.id)),
  updateLike: pp
    .input(z.object({ id: z.string(), inc: z.boolean() }))
    .mutation(
      async (o) => await db.comment.updateLike(o.input.id, o.input.inc)
    ),
  getAll: pp
    .input(z.object({ postId: z.string() }))
    .query(async (o) => await db.comment.getAll(o.input.postId)),
});
