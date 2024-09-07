"use server";

import { auth } from "@/auth";
import { db } from "@/src/db";
import { packages } from "@/src/db/schema";
import { customAlphabet } from "nanoid";

function generateTrackingId() {
  const nanoid = customAlphabet("ABCDEFGHJKLMNPQRSTUVWXYZ23456789", 10);
  return `SWIFT-${nanoid()}`;
}

export async function submitPackage(formData: FormData) {
  const session = await auth();
  const getUserId = session?.user?.id as string;
  const trackingId = generateTrackingId();

  const packageData = {
    userId: getUserId,
    tracking_number: trackingId,
    // step1: Sender Information
    sender_full_name: formData.get("sender_full_name") as string,
    sender_email: formData.get("sender_email") as string,
    sender_phone_number: formData.get("sender_phone_number") as string,
    sender_country: formData.get("sender_country") as string,
    sender_city: formData.get("sender_city") as string,
    sender_address: formData.get("sender_address") as string,
    // step2: REciever
    receiver_full_name: formData.get("receiver_full_name") as string,
    receiver_email: formData.get("receiver_email") as string,
    receiver_phone_number: formData.get("receiver_phone_number") as string,
    receiver_country: formData.get("receiver_country") as string,
    receiver_city: formData.get("receiver_city") as string,
    receiver_address: formData.get("receiver_address") as string,
    package_type: formData.get("package_type") as string,
    package_category: formData.get("package_category") as string,
    dimension: formData.get("dimension") as string,
    weight: formData.get("weight") as string,
    description: formData.get("description") as string,
  };

  await db.insert(packages).values(packageData);
}
