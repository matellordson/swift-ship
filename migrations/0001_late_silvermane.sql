ALTER TABLE "package" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "package" ALTER COLUMN "status" SET DEFAULT 'processing';--> statement-breakpoint
ALTER TABLE "package" ALTER COLUMN "status" DROP NOT NULL;