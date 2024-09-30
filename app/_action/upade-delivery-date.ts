"use server";

import { db } from "@/src/db";
import { packageTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function DeliveryDate(trackingId: string, newStatus: string) {
  try {
    await db
      .update(packageTable)
      .set({ status: newStatus })
      .where(eq(packageTable.tracking_number, trackingId));

    return { success: true, message: "Shipment status updated successfully" };
  } catch (error) {
    console.error("Error updating shipment status:", error);
    return { success: false, message: "Failed to update shipment status" };
  }
}

export async function updateDeliveryDate(trackingId: string, newDate: string) {
  try {
    await db
      .update(packageTable)
      .set({ delivery_date: newDate })
      .where(eq(packageTable.tracking_number, trackingId));

    return { success: true, message: "Delivery date updated successfully" };
  } catch (error) {
    console.error("Error updating delivery date:", error);
    return { success: false, message: "Failed to update delivery date" };
  }
}
