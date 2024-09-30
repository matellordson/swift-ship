"use client";

import { useState, useCallback } from "react";
import { debounce } from "lodash";
import { PackageForm } from "@/components/new-package";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NoPackage } from "@/components/no-package";
import { filterPackages } from "../_action/filter-package";
import { Loader } from "lucide-react";

interface Package {
  userId: string;
  id: string;
  sender_full_name: string | null;
  sender_email: string | null;
  sender_phone_number: string | null;
  sender_country: string | null;
  sender_city: string | null;
  receiver_full_name: string | null;
  receiver_email: string | null;
  receiver_phone_number: string | null;
  receiver_country: string | null;
  receiver_city: string | null;
  tracking_number: string;
  package_type: string | null;
  weight: string | null;
  dimension: string | null;
  status: string | null;
  delivery_date: string | null;
}

interface CustomerDashboardProps {
  initialData: Package[];
  userId: string;
}

export default function CustomerDashboard({
  initialData,
  userId,
}: CustomerDashboardProps) {
  const [packages, setPackages] = useState<Package[]>(initialData);
  const [trackingFilter, setTrackingFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedFilterPackages = useCallback(
    debounce(async (userId: string, filterValue: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const filteredData: Package[] = await filterPackages(
          userId,
          filterValue,
        );
        setPackages(filteredData);
      } catch (err) {
        setError(
          "An error occurred while filtering packages. Please try again.",
        );
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    [],
  );

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = e.target.value;
    setTrackingFilter(filterValue);
    debouncedFilterPackages(userId, filterValue);
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
      {isLoading && (
        <div className="mt-5 flex w-fit items-center justify-center gap-2">
          <Loader className="h-6 animate-spin" />
          <p>Filtering...</p>
        </div>
      )}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      <div className="mb-14 mt-3 grid grid-cols-1 gap-3 lg:grid-cols-3">
        {packages.map((pkg: Package) => (
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
                <p className="text-sm text-muted-foreground">
                  {pkg.delivery_date || "TBD"}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold">Origin:</p>
                <p className="text-sm text-muted-foreground">
                  {pkg.sender_country || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold">Destination:</p>
                <p className="text-sm text-muted-foreground">
                  {pkg.receiver_country || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold">Status:</p>
                {pkg.status === "processing" ? (
                  <div className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-orange-300"></div>
                    Processing
                  </div>
                ) : pkg.status === "in transit" ? (
                  <div className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-amber-600"></div>
                    In Transit
                  </div>
                ) : pkg.status === "delivered" ? (
                  <div className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-green-300"></div>
                    Delivered
                  </div>
                ) : pkg.status === "pending" ? (
                  <div className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground"></div>
                    Pending
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div>
                <p className="text-sm font-semibold">Package Type:</p>
                <p className="text-sm text-muted-foreground">
                  {pkg.package_type || "N/A"}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
