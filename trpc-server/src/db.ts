import prisma from "./prismaClient";
import { Post, Prisma, Tag } from "@prisma/client";
export const db = {
  user: {
    createUser: async (name: string) => {
      const user = await prisma.user.create({
        data: {
          name,
        },
      });
      return user;
    },
    getUser: async (id: string) => {
      const user = await prisma.user.findFirst({
        where: {
          id,
        },
      });
      return user;
    },
    getFollowers: async (id: string) => {
      const followers = await prisma.user.findFirst({
        where: {
          id,
        },
        select: {
          followers: true,
        },
      });
      return followers;
    },
    getFollowing: async (id: string) => {
      const following = await prisma.user.findFirst({
        where: {
          id,
        },
        select: {
          following: true,
        },
      });
      return following;
    },
    searchByName: async (name: string) => {
      const users = await prisma.user.findMany({
        where: {
          OR: [
            {
              name: {
                startsWith: name,
              },
            },
            {
              username: {
                startsWith: name,
              },
            },
          ],
        },
      });
      if (!users.length) return null;
      return users;
    },
    changeUsername: async (username: string, id: string) => {
      const checkUser = await prisma.user.findFirst({
        where: {
          username,
        },
      });
      if (checkUser) {
        return false;
      }
      const user = await prisma.user.update({
        where: {
          id,
        },
        data: {
          username,
        },
      });
      return user;
    },
    changeAvatar: async (id: string, avatar: string) => {
      await prisma.user.update({
        where: {
          id,
        },
        data: {
          avatar,
        },
      });
    },
    changeBio: async (id: string, bio: string) => {
      const res = await prisma.user.update({
        where: {
          id,
        },
        data: {
          bio,
        },
      });
      if (!res) return null;
      return res;
    },
    updateLinks: async (id: string, links: string[]) => {
      await prisma.user.update({
        where: {
          id,
        },
        data: {
          links: {
            set: links,
          },
        },
      });
    },
    deleteUser: async (id: string) => {
      const user = await prisma.user.delete({
        where: {
          id,
        },
      });
      return user;
    },
    followUser: async (id: string, userFollowedId: string) => {
      await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          followingNo: {
            increment: 1,
          },
          following: {
            connect: {
              id: userFollowedId,
            },
          },
        },
      });
      await prisma.user.update({
        where: {
          id: userFollowedId,
        },
        data: {
          followersNo: {
            increment: 1,
          },
          followers: {
            connect: {
              id: id,
            },
          },
        },
      });
    },
  },
  post: {
    createPost: async (
      userId: string,
      content: Object,
      title: string,
      tags: Tag[]
    ) => {
      const post = await prisma.post.create({
        data: {
          content: content as unknown as Prisma.JsonObject,
          title,
          userId,
          tags: {
            connect: tags,
          },
        },
      });
      if (!post) return null;
      return post;
    },
    getPost: async (id: string) => {
      return await prisma.post.findFirst({
        where: {
          id,
        },
      });
    },
    getUserPosts: async (userId: string) => {
      const posts = await prisma.post.findMany({
        where: {
          userId,
        },
      });
      if (!posts.length) return null;
      return posts;
    },
    getAllPosts: async () => {
      return await prisma.post.findMany({});
    },
    searchPost: async (name: string) => {
      const posts = await prisma.post.findMany({
        where: {
          title: {
            startsWith: name,
            contains: name,
          },
        },
      });
      if (!posts.length) return null;
      return posts;
    },

    deletePost: async (id: string) => {
      const post = await prisma.post.delete({
        where: {
          id,
        },
      });
      return post;
    },
    updateLike: async (id: string, inc: boolean) => {
      if (inc) {
        const post = await prisma.post.update({
          where: {
            id,
          },
          data: {
            likes: {
              increment: 1,
            },
          },
        });
        return post;
      } else {
        await prisma.post.update({
          where: {
            id,
          },
          data: {
            likes: {
              decrement: 1,
            },
          },
        });
      }
    },
    updateViews: async (id: string) => {
      await prisma.post.update({
        where: {
          id,
        },
        data: {
          views: {
            increment: 1,
          },
        },
      });
    },
  },
  comment: {
    addComment: async (postId: string, userId: string, content: string) => {
      const comment = await prisma.comment.create({
        data: {
          userId,
          content,
          likes: 0,
          postId,
        },
      });
      return comment;
    },
    delComment: async (id: string) => {
      await prisma.comment.delete({
        where: {
          id,
        },
      });
    },
    updateLike: async (id: string, inc: boolean) => {
      if (inc) {
        const comment = await prisma.comment.update({
          where: {
            id,
          },
          data: {
            likes: {
              increment: 1,
            },
          },
        });
        return comment;
      } else {
        const comment = await prisma.comment.update({
          where: {
            id,
          },
          data: {
            likes: {
              decrement: 1,
            },
          },
        });
        return comment;
      }
    },
    getAll: async (postId: string) => {
      const comments = await prisma.comment.findMany({
        where: {
          postId,
        },
        include: {
          user: true,
        },
      });
      if (!comments.length) return null;
      return comments;
    },
  },
};
