"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addBlog, likeBlog } from "../services/blogs";
import { getCurrentUser } from "../services/session";

type BlogValues = { title: string; author: string; url: string };
export type BlogFormState = {
  errors?: Partial<Record<keyof BlogValues, string>>;
  values?: BlogValues;
  success?: boolean;
};

export async function createBlog(_prev: BlogFormState, formData: FormData): Promise<BlogFormState> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const values: BlogValues = {
    title: String(formData.get("title") ?? "").trim(),
    author: String(formData.get("author") ?? "").trim(),
    url: String(formData.get("url") ?? "").trim(),
  };
  const errors: BlogFormState["errors"] = {};
  for (const [field, value] of Object.entries(values) as [keyof BlogValues, string][]) {
    if (!value) errors[field] = `${field} is required`;
    else if (value.length < 5) errors[field] = `${field} must be at least 5 characters`;
  }
  // values go back so the form keeps what the user typed
  if (Object.keys(errors).length) return { errors, values };

  await addBlog({ ...values, userId: user.id });
  revalidatePath("/blogs");
  return { success: true };
}

export async function like(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!(await likeBlog(id))) throw new Error(`blog ${id} not found`);

  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
}
