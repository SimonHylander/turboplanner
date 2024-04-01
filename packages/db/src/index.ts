import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

import * as auth from "./schema/auth";
import * as post from "./schema/post";

export const schema = { ...auth, ...post };

export type UserSelect = auth.UserSelect;
export type UserInsert = auth.UserInsert;

export { mySqlTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

/* const psClient = new Client({
  host: process.env.DB_HOST!,
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
});

export const db = drizzle(psClient, { schema }); */

console.log(process.env.DB_HOST);

const connection = await mysql.createConnection({
  host: process.env.DB_HOST!,
  user: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
});

export const db = drizzle(connection, { schema, mode: "default" });
