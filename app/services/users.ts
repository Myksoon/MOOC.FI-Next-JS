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
