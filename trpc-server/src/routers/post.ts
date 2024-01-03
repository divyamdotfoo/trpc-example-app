import { z } from "zod";
import { router, publicProcedure as pp } from "../trpc";
import { db } from "../db";
import { Tag } from "@prisma/client";

export const postRouter = router({
  create: pp
    .input(
      z.object({
        title: z.string().min(10),
        content: z.object({}),
        userId: z.string(),
        tags: z.unknown(),
      })
    )
    .mutation(async (o) => {
      return db.post.createPost(
        o.input.userId,
        o.input.content,
        o.input.title,
        o.input.tags as Tag[]
      );
    }),
  get: pp
    .input(z.object({ id: z.string() }))
    .query(async (o) => await db.post.getPost(o.input.id)),
  getAll: pp.input(z.any()).query(async (o) => await db.post.getAllPosts()),
  getUserAll: pp
    .input(z.object({ id: z.string() }))
    .query(async (o) => await db.post.getUserPosts(o.input.id)),
  search: pp
    .input(z.object({ name: z.string() }))
    .query(async (o) => await db.post.searchPost(o.input.name)),
  updateLike: pp
    .input(z.object({ id: z.string(), inc: z.boolean() }))
    .mutation(async (o) => await db.post.updateLike(o.input.id, o.input.inc)),
  updateView: pp
    .input(z.object({ id: z.string() }))
    .mutation(async (o) => await db.post.updateViews(o.input.id)),
  delete: pp
    .input(z.object({ id: z.string() }))
    .mutation(async (o) => await db.post.deletePost(o.input.id)),
});
