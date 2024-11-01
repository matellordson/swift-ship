import Logo from "@/components/logo";
import PackageTimeline from "@/components/PackageTimeline";
import Link from "next/link";

export default function TrackShipment() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <nav className="mb-7 border-b bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Logo />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <PackageTimeline />
    </div>
  );
}
