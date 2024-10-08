"use server";

import { db } from "@/src/db";
import { packageTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function getPackageByTrackingNumber(trackingNumber: string) {
  try {
    const result = await db
      .select()
      .from(packageTable)
      .where(eq(packageTable.tracking_number, trackingNumber))
      .limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("Error fetching package:", error);
    return null;
  }
}
