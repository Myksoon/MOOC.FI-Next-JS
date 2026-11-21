"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { addUser, getUserByUsername } from "../services/users";

type RegisterValues = { username: string; name: string };
export type RegisterFormState = {
  errors?: Partial<Record<"username" | "name" | "password" | "passwordConfirm", string>>;
  // passwords are never sent back to the browser
  values?: RegisterValues;
  success?: boolean;
};

export async function registerUser(_prev: RegisterFormState, formData: FormData): Promise<RegisterFormState> {
  const values: RegisterValues = {
    username: String(formData.get("username") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
  };
  const password = String(formData.get("password") ?? "");
  const passwordConfirm = String(formData.get("passwordConfirm") ?? "");

  const errors: RegisterFormState["errors"] = {};
  if (values.username.length < 4) errors.username = "username must be at least 4 characters";
  else if (await getUserByUsername(values.username)) errors.username = "username is already taken";
  if (!values.name) errors.name = "name is required";
  if (password.length < 4) errors.password = "password must be at least 4 characters";
  if (password !== passwordConfirm) errors.passwordConfirm = "passwords do not match";
  if (Object.keys(errors).length) return { errors, values };

  await addUser({ ...values, passwordHash: await bcrypt.hash(password, 10) });
  revalidatePath("/users");
  return { success: true };
}
