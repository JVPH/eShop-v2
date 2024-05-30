import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user";
import { products } from "./product";

export const reviews = pgTable("reviews", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  comment: text("comment").notNull(),
  user: uuid("user")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  product: uuid("product")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});
