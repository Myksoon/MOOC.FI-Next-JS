// usage: npx tsx --env-file=.env.local set-password.ts <username> <password>
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { users } from "./db/schema";

async function main() {
  const [username, password] = process.argv.slice(2);
  if (!username || !password) throw new Error("usage: set-password.ts <username> <password>");

  const updated = await db
    .update(users)
    .set({ passwordHash: await bcrypt.hash(password, 10) })
    .where(eq(users.username, username))
    .returning({ id: users.id });
  if (!updated.length) throw new Error(`no user "${username}"`);
  console.log(`password set for ${username}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
