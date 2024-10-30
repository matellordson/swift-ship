"use server";

import { db } from "@/src/db";
import { packageTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function updatePackageStage(
  trackingNumber: string,
  newLocation: string,
) {
  const packages = await db.query.packageTable.findFirst({
    where: eq(packageTable.tracking_number, trackingNumber),
  });

  if (!packages) {
    throw new Error("Package not found");
  }

  let updateData = {};

  if (!packages.stage1IsCompleted) {
    updateData = {
      stage1IsCompleted: true,
      stage1Location: newLocation,
      stage2Location: newLocation,
    };
  } else if (!packages.stage2IsCompleted) {
    updateData = {
      stage2IsCompleted: true,
      stage2Location: newLocation,
      stage3Location: newLocation,
    };
  } else if (!packages.stage3IsCompleted) {
    updateData = {
      stage3IsCompleted: true,
      stage3Location: newLocation,
      stage4Location: newLocation,
    };
  } else if (!packages.stage4IsCompleted) {
    updateData = {
      stage4IsCompleted: true,
      stage4Location: newLocation,
      stage5Location: newLocation,
    };
  } else if (!packages.stage5IsCompleted) {
    updateData = {
      stage5IsCompleted: true,
      stage5Location: newLocation,
      stage6Location: newLocation,
    };
  } else if (!packages.stage6IsCompleted) {
    updateData = {
      stage6IsCompleted: true,
      stage6Location: newLocation,
    };
  } else {
    throw new Error("All stages are already completed");
  }

  await db
    .update(packageTable)
    .set(updateData)
    .where(eq(packageTable.tracking_number, trackingNumber));

  return { success: true };
}
