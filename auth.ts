import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Vercel sets this itself; needed for `npm start` on localhost
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
        // users created before passwords existed have an empty hash, which never matches
        if (!user?.passwordHash || !(await bcrypt.compare(password, user.passwordHash))) return null;
        // the session only carries name/email/image, so the username rides in the email field
        return { id: String(user.id), name: user.name, email: user.username };
      },
    }),
  ],
});
