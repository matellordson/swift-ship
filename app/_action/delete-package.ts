"use server";

import { db } from "@/src/db";
import { packageTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function deletePackage(trackingId: string) {
  try {
    await db
      .delete(packageTable)
      .where(eq(packageTable.tracking_number, trackingId));

    return { success: true, message: "Package deleted successfully" };
  } catch (error) {
    console.error("Error deleting package:", error);
    return { success: false, message: "Failed to delete package" };
  }
}
