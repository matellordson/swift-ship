"use server";

import { db } from "@/src/db";
import { packages } from "@/src/db/schema";
import { eq, and, like } from "drizzle-orm";

export async function filterPackages(userId: string, trackingId: string = "") {
  if (trackingId) {
    return await db
      .select()
      .from(packages)
      .where(
        and(
          eq(packages.userId, userId),
          like(packages.tracking_number, `%${trackingId}%`),
        ),
      );
  } else {
    return await db.select().from(packages).where(eq(packages.userId, userId));
  }
}
