import { faker } from "@faker-js/faker";
import prisma from "./prismaClient";
import { db } from "./db";
async function main() {
  const users: string[] = [];
  await prisma.comment.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});
  for (let i = 0; i < 10; i++) {
    users.push(await seed());
    console.log(users);
  }
  for (let i = 0; i < users.length; i++) {
    await prisma.post.create({
      data: {
        content: faker.company.buzzPhrase(),
        title: faker.company.buzzAdjective(),
        userId: users[i],
        commentsNo: faker.number.int({ min: 5, max: 20 }),
        createdAt: faker.date.anytime(),
        likes: faker.number.int({ min: 10, max: 100 }),
      },
    });
    await prisma.post.create({
      data: {
        content: faker.company.buzzPhrase(),
        title: faker.company.buzzAdjective(),
        userId: users[i],
        commentsNo: faker.number.int({ min: 5, max: 20 }),
        createdAt: faker.date.anytime(),
        likes: faker.number.int({ min: 10, max: 100 }),
      },
    });
    await prisma.post.create({
      data: {
        content: faker.company.buzzPhrase(),
        title: faker.company.buzzAdjective(),
        userId: users[i],
        commentsNo: faker.number.int({ min: 5, max: 20 }),
        createdAt: faker.date.anytime(),
        likes: faker.number.int({ min: 10, max: 100 }),
      },
    });
  }
}
async function seed() {
  const user = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      bio: faker.person.bio(),
      followersNo: faker.number.int({ min: 1, max: 20 }),
      followingNo: faker.number.int({ min: 1, max: 20 }),
      username: faker.internet.userName(),
      createdAt: faker.date.anytime(),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${faker.string.alpha(
        5
      )}`,
    },
  });
  return user.id;
}

// main();
async function check() {
  const users = await prisma.user.findMany({});
  const posts = await prisma.post.findMany({});
  console.log(users, posts);
}
check();
