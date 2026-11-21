import { db } from "../../db";
import { users } from "../../db/schema";

export const getUsers = () => db.select().from(users).orderBy(users.name);
