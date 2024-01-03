import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { db } from "../db";
export const userRouter = router({
  getUser: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async (opts) => {
      return await db.user.getUser(opts.input.id);
    }),
  createUser: publicProcedure
    .input(z.object({ name: z.string().min(6).max(28) }))
    .mutation(async (opts) => {
      const { input } = opts;
      const user = await db.user.createUser(input.name);
      if (!user) return null;
      return user;
    }),
  deleteUser: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts;
      const user = await db.user.deleteUser(input.id);
      if (!user) return null;
      return user;
    }),
  updateBio: publicProcedure
    .input(z.object({ bio: z.string().min(4), id: z.string() }))
    .mutation(async (opts) => {
      return await db.user.changeBio(opts.input.id, opts.input.bio);
    }),
  searchUser: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async (opts) => {
      return await db.user.searchByName(opts.input.name);
    }),
  getFollowers: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async (opts) => {
      return await db.user.getFollowers(opts.input.id);
    }),
  getFollowing: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async (opts) => {
      return await db.user.getFollowing(opts.input.id);
    }),
  changeUsername: publicProcedure
    .input(z.object({ username: z.string(), id: z.string() }))
    .mutation(async (o) => {
      return await db.user.changeUsername(o.input.username, o.input.id);
    }),
  changeAvatar: publicProcedure
    .input(z.object({ avatar: z.string(), id: z.string() }))
    .mutation(async (o) => {
      return await db.user.changeAvatar(o.input.id, o.input.avatar);
    }),
  followUser: publicProcedure
    .input(z.object({ userId: z.string(), toFollow: z.string() }))
    .mutation(async (o) => {
      return await db.user.followUser(o.input.userId, o.input.toFollow);
    }),
});
