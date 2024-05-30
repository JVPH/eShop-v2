import { pgTable, timestamp, text, uuid, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name"),
  email: text("email").unique().notNull(),
  passwordHash: text("passwordHash").notNull(),
  isAdmin: boolean("isAdmin").default(false),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});
