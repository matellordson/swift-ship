DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('customer', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."stage" AS ENUM('Shipping label created, SSS awaiting item', 'Accepted by SSS regional destination facility ', 'Arrived at SSS regional destination facility', 'Departed SSS regional destination facility', 'In transit', 'Arrived at SSS regional destination facilities', 'Delivered');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "package" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
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
	"status" text DEFAULT 'pending',
	"delivery_date" text DEFAULT 'TBD',
	"stage1" "stage" DEFAULT 'Shipping label created, SSS awaiting item' NOT NULL,
	"stage1_location" text,
	"stage1_time" timestamp DEFAULT now(),
	"stage1_is_completed" boolean DEFAULT false,
	"stage2" "stage" DEFAULT 'Accepted by SSS regional destination facility ' NOT NULL,
	"stage2_location" text,
	"stage2_time" timestamp DEFAULT now(),
	"stage2_is_completed" boolean DEFAULT false,
	"stage3" "stage" DEFAULT 'Arrived at SSS regional destination facility',
	"stage3_location" text,
	"stage3_time" timestamp DEFAULT now(),
	"stage3_is_completed" boolean DEFAULT false,
	"stage4" "stage" DEFAULT 'Departed SSS regional destination facility',
	"stage4_location" text,
	"stage4_time" timestamp DEFAULT now(),
	"stage4_is_completed" boolean DEFAULT false,
	"stage5" "stage" DEFAULT 'In transit',
	"stage5_location" text,
	"stage5_time" timestamp DEFAULT now(),
	"stage5_is_completed" boolean DEFAULT false,
	"stage6" "stage" DEFAULT 'Arrived at SSS regional destination facility',
	"stage6_location" text,
	"stage6_time" timestamp DEFAULT now(),
	"stage6_is_completed" boolean DEFAULT false,
	"stage7" "stage" DEFAULT 'Delivered',
	"stage7_location" text,
	"stage7_time" timestamp DEFAULT now(),
	"stage7_is_completed" boolean DEFAULT false
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
