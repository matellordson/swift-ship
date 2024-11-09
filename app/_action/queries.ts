import { db } from "@/src/db";
import { eq } from "drizzle-orm";
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
  const stageIsCompletedColumn =
    `stage${stageNumber}IsCompleted` as keyof typeof packageTable;

  await db
    .update(packageTable)
    .set({
      [stageColumn]: packageTable[stageColumn],
      [stageLocationColumn]: location,
      [stageIsCompletedColumn]: true,
    })
    .where(eq(packageTable.tracking_number, trackingNumber));
}
