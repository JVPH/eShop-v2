import {
  pgTable,
  text,
  uuid,
  timestamp,
  numeric,
  jsonb,
  boolean,
  date,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  shippingAddress: jsonb("shippingAddress").notNull(),
  paymentMethod: text("paymentMethod").notNull(),
  paymentResult: jsonb("paymentResult").notNull(),
  taxPrice: numeric("taxPrice", { precision: 10, scale: 2 }).notNull(),
  shippingPrice: numeric("shippingPrice", {
    precision: 10,
    scale: 2,
  }).notNull(),
  totalPrice: numeric("totalPrice", { precision: 10, scale: 2 }).notNull(),
  isPaid: boolean("isPaid").notNull().default(false),
  isDelivered: boolean("isDelivered").notNull().default(false),
  paidAt: date("paidAt").notNull(),
  deliveredAt: date("deliveredAt").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});
