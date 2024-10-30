import {
  boolean,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const roleEnums = pgEnum("role", ["customer", "admin"]);
export const stageEnums = pgEnum("stage", [
  "Shipping label created, SSL awaiting item",
  "Accepted by SSL regional destination facility ",
  "Arrived at SSL regional destination facility",
  "Departed SSL regional destination facility",
  "In transit",
  "Delivered",
]);

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
  status: text("status").default("pending"),
  delivery_date: text("delivery_date").default("TBD"),
  stageId: text("stage_id"),
  stage1: stageEnums("stage1")
    .notNull()
    .default("Shipping label created, SSL awaiting item"),
  stage1Location: text("stage1_location").notNull(),
  stage1Time: timestamp("stage1_time").defaultNow().notNull(),
  stage1IsCompleted: boolean("stage1_is_completed").notNull().default(false),
  stage2: stageEnums("stage2")
    .notNull()
    .default("Accepted by SSL regional destination facility "),
  stage2Location: text("stage2_location").notNull(),
  stage2Time: timestamp("stage2_time").defaultNow().notNull(),
  stage2IsCompleted: boolean("stage2_is_completed").notNull().default(false),
  stage3: stageEnums("stage3")
    .notNull()
    .default("Arrived at SSL regional destination facility"),
  stage3Location: text("stage3_location").notNull(),
  stage3Time: timestamp("stage3_time").defaultNow().notNull(),
  stage3IsCompleted: boolean("stage3_is_completed").notNull().default(false),
  stage4: stageEnums("stage4")
    .notNull()
    .default("Departed SSL regional destination facility"),
  stage4Location: text("stage4_location").notNull(),
  stage4Time: timestamp("stage4_time").defaultNow().notNull(),
  stage4IsCompleted: boolean("stage4_is_completed").notNull().default(false),
  stage5: stageEnums("stage5").notNull().default("In transit"),
  stage5Location: text("stage5_location").notNull(),
  stage5Time: timestamp("stage5_time").defaultNow().notNull(),
  stage5IsCompleted: boolean("stage5_is_completed").notNull().default(false),
  stage6: stageEnums("stage6").notNull().default("Delivered"),
  stage6Location: text("stage6_location").notNull(),
  stage6Time: timestamp("stage6_time").defaultNow().notNull(),
  stage6IsCompleted: boolean("stage6_is_completed").notNull().default(false),
});
