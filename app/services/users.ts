import { eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";

export const getUsers = () => db.select().from(users).orderBy(users.name);

export const getUserWithBlogs = (username: string) =>
  db.query.users.findFirst({
    where: eq(users.username, username),
    with: { blogs: true },
  });

export const getUserByUsername = (username: string) =>
  db.query.users.findFirst({ where: eq(users.username, username), columns: { id: true } });

export const addUser = (user: typeof users.$inferInsert) => db.insert(users).values(user);

export const setToken = (userId: number, token: string) =>
  db.update(users).set({ token }).where(eq(users.id, userId));

export const getUserByToken = (token: string) =>
  db.query.users.findFirst({
    where: eq(users.token, token),
    columns: { id: true, username: true, name: true },
    with: { blogs: { columns: { author: true, title: true, url: true } } },
  });
