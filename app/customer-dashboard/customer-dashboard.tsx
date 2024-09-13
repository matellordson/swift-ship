"use client";

import { useState } from "react";
import { PackageForm } from "@/components/new-package";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NoPackage } from "@/components/no-package";
import { SupportButton } from "@/components/support";
import { filterPackages } from "../_action/filter-package";

export default function CustomerDashboard({ initialData, userId }) {
  const [packages, setPackages] = useState(initialData);
  const [trackingFilter, setTrackingFilter] = useState("");

  const handleFilterChange = async (e: any) => {
    const filterValue = e.target.value;
    setTrackingFilter(filterValue);
    const filteredData = await filterPackages(userId, filterValue);
    setPackages(filteredData);
  };

  if (packages.length === 0 && !trackingFilter) {
    return <NoPackage />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex w-full items-center justify-between">
        <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Your Shipping Packages
        </h1>
        <PackageForm />
      </div>
      <Input
        className="mt-3 max-w-sm"
        placeholder="Filter tracking ID..."
        value={trackingFilter}
        onChange={handleFilterChange}
      />
      <div className="mb-14 mt-3 grid grid-cols-1 gap-3 lg:grid-cols-3">
        {packages.map((pkg) => (
          <Card className="p-4" key={pkg.id}>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold">Package ID:</p>
                <p className="text-sm text-muted-foreground">
                  {pkg.tracking_number}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold">Estimated Delivery:</p>
                <p className="text-sm text-muted-foreground">2023-06-15</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Origin:</p>
                <p className="text-sm text-muted-foreground">
                  {pkg.sender_country}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold">Destination:</p>
                <p className="text-sm text-muted-foreground">
                  {pkg.receiver_country}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold">Status:</p>
                {pkg.status == "processing" ? (
                  <div className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-orange-300"></div>
                    Processing
                  </div>
                ) : pkg.status == "in transit" ? (
                  <div className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-amber-600"></div>
                    In Transit
                  </div>
                ) : pkg.status == "delivered" ? (
                  <div className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-green-300"></div>
                    Delivered
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div>
                <p className="text-sm font-semibold">Package Type:</p>
                <p className="text-sm text-muted-foreground">
                  {pkg.package_type}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <SupportButton />
    </div>
  );
}
