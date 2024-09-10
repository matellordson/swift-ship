import { PackageForm } from "@/components/new-package";
import { NoPackage } from "@/components/no-package";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircleDashedIcon } from "lucide-react";

export default function CustomerDashboard() {
  return (
    <>
      {/* <NoPackage /> */}
      <div className="container mx-auto p-4">
        <div className="flex w-full items-center justify-between">
          <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Your Shipping Packages
          </h1>
          <PackageForm />
        </div>
        <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-3">
          <Card className="p-4">
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold">Package ID:</p>
                <p className="text-sm text-muted-foreground">SwIFT-J75H84G</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Estimated Delivery:</p>
                <p className="text-sm text-muted-foreground">2023-06-15</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Origin:</p>
                <p className="text-sm text-muted-foreground">
                  San Francisco, CA
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold">Destination:</p>
                <p className="text-sm text-muted-foreground">New York, NY</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Status:</p>
                <div className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-orange-300"></div>
                  Processing
                </div>
                {/* <div className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-amber-600"></div>
                In Transit
              </div>
              <div className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-green-300"></div>
                Delivered
              </div> */}
              </div>
              <div>
                <p className="text-sm font-semibold">Package Type:</p>
                <p className="text-sm text-muted-foreground">Furniture</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
