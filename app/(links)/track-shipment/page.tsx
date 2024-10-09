"use client";

import { useState } from "react";
import {
  Package,
  Truck,
  Home,
  Search,
  AlertCircle,
  Calendar,
  User,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getPackageByTrackingNumber } from "@/app/_action/shipment-tracker";
import Link from "next/link";

type PackageInfo = {
  id: string;
  userId: string;
  sender_full_name: string | null;
  sender_email: string | null;
  sender_phone_number: string | null;
  sender_country: string | null;
  sender_city: string | null;
  sender_address: string | null;
  receiver_full_name: string | null;
  receiver_email: string | null;
  receiver_phone_number: string | null;
  receiver_country: string | null;
  receiver_city: string | null;
  receiver_address: string | null;
  package_type: string | null;
  dimension: string | null;
  weight: string | null;
  description: string | null;
  tracking_number: string;
  status: "pending" | "in transit" | "delivered";
  delivery_date: string | null;
};

export default function TrackShipment() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [packageInfo, setPackageInfo] = useState<PackageInfo | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setPackageInfo(null);

    try {
      const result = await getPackageByTrackingNumber(trackingNumber);
      if (result) {
        setPackageInfo(result as PackageInfo);
      } else {
        setError("No package found with this tracking number");
      }
    } catch (err) {
      setError("An error occurred while fetching package information");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusProgress = (status: PackageInfo["status"]) => {
    switch (status) {
      case "pending":
        return 33;
      case "in transit":
        return 66;
      case "delivered":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <nav className="top-0 z-10 border-b bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center">
                  <svg
                    className="h-8 w-8 text-black dark:text-white"
                    viewBox="0 0 76 65"
                    fill="currentColor"
                  >
                    <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                  </svg>
                  <span className="ml-2 text-xl font-bold">Vercel</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow py-8 lg:px-8">
        <Card className="mx-auto w-full max-w-3xl border-none">
          <CardHeader className="pb-4">
            <CardTitle className="text-center text-2xl font-bold">
              Track Your Shipment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter tracking number"
                  className="flex-grow"
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Tracking...
                    </span>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Track
                    </>
                  )}
                </Button>
              </div>
            </form>

            {error && (
              <div className="mt-4 flex items-center rounded-md bg-destructive/15 p-4 text-destructive">
                <AlertCircle className="mr-2 h-5 w-5" />
                {error}
              </div>
            )}

            {packageInfo && (
              <div className="mt-6 space-y-6">
                <div className="relative">
                  <Progress
                    value={getStatusProgress(packageInfo.status)}
                    className="h-2"
                  />
                  <div className="mt-2 flex items-center justify-between">
                    <div
                      className={`flex flex-col items-center ${
                        packageInfo.status === "pending"
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full ${
                          packageInfo.status === "pending"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <Package className="h-6 w-6" />
                      </div>
                      <span className="mt-2 text-sm font-medium">Pending</span>
                    </div>
                    <div
                      className={`flex flex-col items-center ${
                        packageInfo.status === "in transit"
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full ${
                          packageInfo.status === "in transit"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <Truck className="h-6 w-6" />
                      </div>
                      <span className="mt-2 text-sm font-medium">
                        In Transit
                      </span>
                    </div>
                    <div
                      className={`flex flex-col items-center ${
                        packageInfo.status === "delivered"
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full ${
                          packageInfo.status === "delivered"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <Home className="h-6 w-6" />
                      </div>
                      <span className="mt-2 text-sm font-medium">
                        Delivered
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Package Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {packageInfo.package_type && (
                        <div className="flex items-center">
                          <Badge variant="outline">
                            {packageInfo.package_type}
                          </Badge>
                        </div>
                      )}
                      <p>
                        <strong>Dimensions:</strong>{" "}
                        {packageInfo.dimension || "N/A"}
                      </p>
                      <p>
                        <strong>Weight:</strong> {packageInfo.weight || "N/A"}
                      </p>
                      <p>
                        <strong>Description:</strong>{" "}
                        {packageInfo.description || "N/A"}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        Shipping Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p>
                        <strong>Status:</strong>{" "}
                        {packageInfo.status.charAt(0).toUpperCase() +
                          packageInfo.status.slice(1)}
                      </p>
                      {packageInfo.delivery_date && (
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          <p>
                            <strong>Delivery Date:</strong>{" "}
                            {packageInfo.delivery_date}
                          </p>
                        </div>
                      )}
                      <p>
                        <strong>Tracking Number:</strong>{" "}
                        {packageInfo.tracking_number}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Sender</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {packageInfo.sender_full_name && (
                        <div className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          <p>{packageInfo.sender_full_name}</p>
                        </div>
                      )}
                      {packageInfo.sender_email && (
                        <div className="flex items-center">
                          <Mail className="mr-2 h-4 w-4" />
                          <p>{packageInfo.sender_email}</p>
                        </div>
                      )}
                      {packageInfo.sender_phone_number && (
                        <div className="flex items-center">
                          <Phone className="mr-2 h-4 w-4" />
                          <p>{packageInfo.sender_phone_number}</p>
                        </div>
                      )}
                      {(packageInfo.sender_address ||
                        packageInfo.sender_city ||
                        packageInfo.sender_country) && (
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4" />
                          <p>
                            {[
                              packageInfo.sender_address,
                              packageInfo.sender_city,
                              packageInfo.sender_country,
                            ]
                              .filter(Boolean)
                              .join(", ")}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Receiver</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {packageInfo.receiver_full_name && (
                        <div className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          <p>{packageInfo.receiver_full_name}</p>
                        </div>
                      )}
                      {packageInfo.receiver_email && (
                        <div className="flex items-center">
                          <Mail className="mr-2 h-4 w-4" />
                          <p>{packageInfo.receiver_email}</p>
                        </div>
                      )}
                      {packageInfo.receiver_phone_number && (
                        <div className="flex items-center">
                          <Phone className="mr-2 h-4 w-4" />
                          <p>{packageInfo.receiver_phone_number}</p>
                        </div>
                      )}
                      {(packageInfo.receiver_address ||
                        packageInfo.receiver_city ||
                        packageInfo.receiver_country) && (
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4" />
                          <p>
                            {[
                              packageInfo.receiver_address,
                              packageInfo.receiver_city,
                              packageInfo.receiver_country,
                            ]
                              .filter(Boolean)
                              .join(", ")}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} SwiftShip. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link
            className="text-xs underline-offset-4 hover:underline"
            href="/terms-and-conditions"
          >
            Terms and Conditions
          </Link>
        </nav>
      </footer>
    </div>
  );
}
