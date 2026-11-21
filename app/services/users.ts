import { eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";

export const getUsers = () => db.select().from(users).orderBy(users.name);

// one query: the user row plus their blogs, joined by the relations in db/schema.ts
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

// only public fields: never the password hash or the token itself
export const getUserByToken = (token: string) =>
  db.query.users.findFirst({
    where: eq(users.token, token),
    columns: { id: true, username: true, name: true },
    with: { blogs: { columns: { author: true, title: true, url: true } } },
  });
