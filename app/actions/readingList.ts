"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addToReadingList, markAsRead } from "../services/readingList";
import { getCurrentUser } from "../services/session";

const blogIdFrom = (formData: FormData) => {
  const blogId = Number(formData.get("blogId"));
  if (!Number.isInteger(blogId)) throw new Error("invalid blog id");
  return blogId;
};

export async function addBlogToReadingList(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const blogId = blogIdFrom(formData);
  await addToReadingList(user.id, blogId);
  revalidatePath(`/blogs/${blogId}`);
  revalidatePath("/me");
}

export async function markBlogAsRead(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  await markAsRead(user.id, blogIdFrom(formData));
  revalidatePath("/me");
}
