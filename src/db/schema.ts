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
  stage1: stageEnums("stage1")
    .notNull()
    .default("Shipping label created, SSL awaiting item"),
  stage1Location: text("stage1_location"),
  stage1Time: timestamp("stage1_time").defaultNow(),
  stage1IsCompleted: boolean("stage1_is_completed").default(false),
  stage2: stageEnums("stage2")
    .notNull()
    .default("Accepted by SSL regional destination facility "),
  stage2Location: text("stage2_location"),
  stage2Time: timestamp("stage2_time").defaultNow(),
  stage2IsCompleted: boolean("stage2_is_completed").default(false),
  stage3: stageEnums("stage3").default(
    "Arrived at SSL regional destination facility",
  ),
  stage3Location: text("stage3_location"),
  stage3Time: timestamp("stage3_time").defaultNow(),
  stage3IsCompleted: boolean("stage3_is_completed").default(false),
  stage4: stageEnums("stage4").default(
    "Departed SSL regional destination facility",
  ),
  stage4Location: text("stage4_location"),
  stage4Time: timestamp("stage4_time").defaultNow(),
  stage4IsCompleted: boolean("stage4_is_completed").default(false),
  stage5: stageEnums("stage5").default("In transit"),
  stage5Location: text("stage5_location"),
  stage5Time: timestamp("stage5_time").defaultNow(),
  stage5IsCompleted: boolean("stage5_is_completed").default(false),
  stage6: stageEnums("stage6").default("Delivered"),
  stage6Location: text("stage6_location"),
  stage6Time: timestamp("stage6_time").defaultNow(),
  stage6IsCompleted: boolean("stage6_is_completed").default(false),
});
