import { NextRequest, NextResponse } from "next/server";
import {
  getPackageByTrackingNumber,
  updatePackageStage,
} from "@/app/_action/queries";

export async function GET(request: NextRequest) {
  const trackingNumber = request.nextUrl.searchParams.get("trackingNumber");
  if (!trackingNumber) {
    return NextResponse.json(
      { error: "Invalid tracking number" },
      { status: 400 },
    );
  }

  try {
    const packageInfo = await getPackageByTrackingNumber(trackingNumber);
    if (packageInfo) {
      return NextResponse.json(packageInfo);
    } else {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching package:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the package information" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { trackingNumber, stageNumber, location } = body;

  if (!trackingNumber || !stageNumber || !location) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  try {
    await updatePackageStage(trackingNumber, stageNumber, location);
    return NextResponse.json({ message: "Package stage updated successfully" });
  } catch (error) {
    console.error("Error updating package stage:", error);
    return NextResponse.json(
      { error: "An error occurred while updating the package stage" },
      { status: 500 },
    );
  }
}
