DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('customer', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('pending', 'processing', 'in transit', 'delivered');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "package" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"sender_full_name" text,
	"sender_email" text,
	"sender_phone_number" text,
	"sender_country" text,
	"sender_city" text,
	"sender_address" text,
	"receiver_full_name" text,
	"receiver_email" text,
	"receiver_phone_number" text,
	"receiver_country" text,
	"receiver_city" text,
	"receiver_address" text,
	"package_type" text,
	"dimension" text,
	"weight" text,
	"description" text,
	"tracking_number" text NOT NULL,
	"status" "status" DEFAULT 'pending' NOT NULL,
	"delivery_date" text DEFAULT 'TBD'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text,
	"role" "role" DEFAULT 'customer' NOT NULL,
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
