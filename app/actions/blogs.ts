"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addBlog } from "../services/blogs";

export async function createBlog(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();
  if (!title || !url) throw new Error("title and url are required");

  addBlog({ title, author, url });
  revalidatePath("/blogs");
  redirect("/blogs");
}
