import { PackageForm } from "@/components/new-package";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NoPackage } from "@/components/no-package";
import { db } from "@/src/db";
import { packages } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";

export const revalidate = 0;

export default async function CustomerDashboard() {
  const userId = await auth();
  const data = await db
    .select()
    .from(packages)
    .where(eq(packages.userId, userId?.user?.id as string));

  if (data.length === 0) {
    return <NoPackage />;
  } else {
    return (
      <div className="container mx-auto p-4">
        <div className="flex w-full items-center justify-between">
          <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Your Shipping Packages
          </h1>
          <PackageForm />
        </div>
        <Input className="mt-3 max-w-sm" placeholder="Filter tracking ID..." />
        <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-3">
          {data.map((packages) => (
            <Card className="p-4" key={packages.id}>
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold">Package ID:</p>
                  <p className="text-sm text-muted-foreground">
                    {packages.tracking_number}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Estimated Delivery:</p>
                  <p className="text-sm text-muted-foreground">2023-06-15</p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Origin:</p>
                  <p className="text-sm text-muted-foreground">
                    {packages.sender_country}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Destination:</p>
                  <p className="text-sm text-muted-foreground">
                    {packages.receiver_country}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Status:</p>
                  {packages.status == "processing" ? (
                    <div className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
                      <div className="h-2 w-2 rounded-full bg-orange-300"></div>
                      Processing
                    </div>
                  ) : packages.status == "in transit" ? (
                    <div className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
                      <div className="h-2 w-2 rounded-full bg-amber-600"></div>
                      In Transit
                    </div>
                  ) : packages.status == "delivered" ? (
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
                    {packages.package_type}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}
