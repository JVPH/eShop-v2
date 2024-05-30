import { pgTable, text, uuid, timestamp, integer, numeric } from "drizzle-orm/pg-core";

export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  image: text('image').notNull(),
  brand: text('brand').notNull(),
  category: text('category').notNull(),
  description: text('description').notNull(),
  rating: integer('rating').notNull(),
  price: numeric('price', { precision: 10, scale: 2}).notNull(),
  countInStock: integer('countInStock').notNull(),
  timestamp: timestamp('timestamp').notNull().defaultNow()
});

