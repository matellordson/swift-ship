import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const roleEnums = pgEnum("role", ["customer", "admin"]);

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  username: text("username").unique().notNull(),
  password_hash: text("password"),
  role: roleEnums("role").notNull().default("customer"),
});

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const packageTable = pgTable("package", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId").notNull(),
  sender_full_name: text("sender_full_name"),
  sender_email: text("sender_email"),
  sender_phone_number: text("sender_phone_number"),
  sender_country: text("sender_country"),
  sender_city: text("sender_city"),
  sender_address: text("sender_address"),
  receiver_full_name: text("receiver_full_name"),
  receiver_email: text("receiver_email"),
  receiver_phone_number: text("receiver_phone_number"),
  receiver_country: text("receiver_country"),
  receiver_city: text("receiver_city"),
  receiver_address: text("receiver_address"),
  package_type: text("package_type"),
  dimension: text("dimension"),
  weight: text("weight"),
  description: text("description"),
  tracking_number: text("tracking_number").notNull(),
  status: text("status").default("pending").notNull(),
  delivery_date: text("delivery_date").default("TBD"),
});
