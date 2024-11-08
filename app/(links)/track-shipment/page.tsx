"use client";

import PackageTimeline from "@/components/PackageTimeline";
import Image from "next/image";
import swiftShipLogo from "@/app/public/logo1.png";
import { useRouter } from "next/navigation";
import SmartSupp from "./smartsupp";

export default function TrackShipment() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <nav className="mb-7 border-b bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div
                  className="flex items-center space-x-2"
                  onClick={router.back}
                >
                  <Image
                    src={swiftShipLogo}
                    height={50}
                    width={50}
                    priority
                    alt="Swift Ship logo"
                    className="m-0 h-36 p-0"
                  />
                  <p className="text-lg font-semibold tracking-tight text-primary lg:text-base">
                    Swift Ship
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <PackageTimeline />
      <SmartSupp />
    </div>
  );
}
