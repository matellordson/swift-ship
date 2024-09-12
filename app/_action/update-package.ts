"use server";

import { db } from "@/src/db";
import { packages } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function updateShipmentStatus(
  trackingId: string,
  newStatus: string,
) {
  try {
    await db
      .update(packages)
      .set({ status: newStatus })
      .where(eq(packages.tracking_number, trackingId));

    return { success: true, message: "Shipment status updated successfully" };
  } catch (error) {
    console.error("Error updating shipment status:", error);
    return { success: false, message: "Failed to update shipment status" };
  }
}
