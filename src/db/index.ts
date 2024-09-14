import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/src/db/schema";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

const sql = neon(process.env.DATABASE_URL!);
export const db: NodePgDatabase<typeof schema> = drizzle(sql, {
  schema,
}) as any;
