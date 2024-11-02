import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/src/db/schema";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

const sql = neon(process.env.DATABASE_URL!);
export const db: NodePgDatabase<typeof schema> = drizzle(sql, {
  schema,
}) as any;

// import { config } from "dotenv";
// import { drizzle } from "drizzle-orm/postgres-js";
// import postgres from "postgres";

// config({ path: ".env.local" }); // or .env.local

// const client = postgres(process.env.DATABASE_URL!);
// export const db: NodePgDatabase<typeof schema> = drizzle(client, {
//   schema,
// }) as any;
