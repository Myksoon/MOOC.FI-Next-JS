import { desc, eq, ilike, sql } from "drizzle-orm";
import { db } from "../../db";
import { blogs } from "../../db/schema";
import { addToReadingList } from "./readingList";

export type Blog = typeof blogs.$inferSelect;

export const getBlogs = (filter = "") =>
  db.select().from(blogs).where(ilike(blogs.title, `%${filter}%`)).orderBy(desc(blogs.likes));

export const getBlogById = (id: number) =>
  // /blogs/abc would crash the query otherwise
  Number.isInteger(id) ? db.query.blogs.findFirst({ where: eq(blogs.id, id) }) : Promise.resolve(undefined);

export const addBlog = async (blog: Pick<Blog, "title" | "author" | "url" | "userId">) => {
  const [created] = await db.insert(blogs).values(blog).returning();
  if (created.userId) await addToReadingList(created.userId, created.id);
  return created;
};

export const likeBlog = async (id: number) => {
  const [updated] = await db
    .update(blogs)
    .set({ likes: sql`${blogs.likes} + 1` })
    .where(eq(blogs.id, id))
    .returning();
  return updated;
};
