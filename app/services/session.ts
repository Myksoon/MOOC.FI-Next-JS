import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";

// the logged-in user's row (without the password hash), or undefined when logged out
export const getCurrentUser = async () => {
  const username = (await auth())?.user?.email;
  if (!username) return undefined;
  return db.query.users.findFirst({
    where: eq(users.username, username),
    columns: { passwordHash: false },
  });
};
