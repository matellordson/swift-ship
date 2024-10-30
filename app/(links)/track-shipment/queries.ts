import { eq } from "drizzle-orm";
import { db } from "@/src/db";
import { packageTable } from "@/src/db/schema";

export async function getPackageByTrackingNumber(trackingNumber: string) {
  const result = await db
    .select()
    .from(packageTable)
    .where(eq(packageTable.tracking_number, trackingNumber));
  return result[0];
}

export async function updatePackageStage(
  trackingNumber: string,
  stageNumber: number,
  location: string,
) {
  const stageColumn = `stage${stageNumber}` as keyof typeof packageTable;
  const stageLocationColumn =
    `stage${stageNumber}Location` as keyof typeof packageTable;
  const stageTimeColumn =
    `stage${stageNumber}Time` as keyof typeof packageTable;
  const stageIsCompletedColumn =
    `stage${stageNumber}IsCompleted` as keyof typeof packageTable;

  return await db
    .update(packageTable)
    .set({
      [stageColumn]: packageTable[stageColumn],
      [stageLocationColumn]: location,
      [stageTimeColumn]: new Date(),
      [stageIsCompletedColumn]: true,
    })
    .where(eq(packageTable.tracking_number, trackingNumber));
}
