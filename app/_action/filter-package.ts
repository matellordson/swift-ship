"use server";

import { db } from "@/src/db";
import { packageTable } from "@/src/db/schema";
import { eq, and, like } from "drizzle-orm";

export async function filterPackages(userId: string, trackingId: string = "") {
  if (trackingId) {
    return await db
      .select()
      .from(packageTable)
      .where(
        and(
          eq(packageTable.userId, userId),
          like(packageTable.tracking_number, `%${trackingId}%`),
        ),
      );
  } else {
    return await db
      .select()
      .from(packageTable)
      .where(eq(packageTable.userId, userId));
  }
}
