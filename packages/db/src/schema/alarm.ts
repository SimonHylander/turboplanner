import { sql } from "drizzle-orm";
import {
  boolean,
  json,
  mysqlEnum,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";

export const alarm = mySqlTable("alarm", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  ringtone: varchar("ringtone", { length: 256 }).notNull(),
  // repeatOnDay: varchar("name", { length: 256 }).notNull(),
  date: timestamp("date")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});
