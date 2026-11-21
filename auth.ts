import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  // needed for npm start locally
  trustHost: true,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      credentials: { username: {}, password: {} },
      authorize: async (credentials) => {
        const username = String(credentials.username ?? "");
        const password = String(credentials.password ?? "");
        const user = await db.query.users.findFirst({ where: eq(users.username, username) });
        if (!user?.passwordHash || !(await bcrypt.compare(password, user.passwordHash))) return null;
        // username goes in the email field
        return { id: String(user.id), name: user.name, email: user.username };
      },
    }),
  ],
});
