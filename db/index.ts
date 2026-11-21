import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// DATABASE_URL is the test DB (tests, CI); Vercel production sets IDK_BROOO_DATABASE_URL
export const db = drizzle((process.env.DATABASE_URL ?? process.env.IDK_BROOO_DATABASE_URL)!, { schema });
