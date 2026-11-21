import { and, eq } from "drizzle-orm";
import { db } from "../../db";
import { readingList } from "../../db/schema";

export const getReadingList = (userId: number) =>
  db.query.readingList.findMany({
    where: eq(readingList.userId, userId),
    with: { blog: { columns: { id: true, title: true, author: true } } },
    orderBy: readingList.id,
  });

export const isInReadingList = async (userId: number, blogId: number) =>
  !!(await db.query.readingList.findFirst({
    where: and(eq(readingList.userId, userId), eq(readingList.blogId, blogId)),
    columns: { id: true },
  }));

// the unique (user, blog) constraint makes a second add a no-op
export const addToReadingList = (userId: number, blogId: number) =>
  db.insert(readingList).values({ userId, blogId }).onConflictDoNothing();

// scoped to userId so a user can only change their own list
export const markAsRead = (userId: number, blogId: number) =>
  db
    .update(readingList)
    .set({ read: true })
    .where(and(eq(readingList.userId, userId), eq(readingList.blogId, blogId)));
