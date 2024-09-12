import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/src/db";
import { packages } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export const revalidate = 0;

export default async function PackageDetails({
  params,
}: {
  params: { id: string };
}) {
  const data = await db
    .select()
    .from(packages)
    .where(eq(packages.tracking_number, params.id))
    .limit(1);

  return (
    <div className="mx-auto mb-20 px-3 lg:container">
      <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Package Details
      </h1>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Card className="p-5">
          <p className="scroll-m-20 text-xl font-semibold tracking-tight">
            Sender Information
          </p>
          <CardContent className="space-y-1 px-0 pt-2">
            <div className="sm flex items-center justify-start gap-3">
              <p className="scroll-m-20 font-semibold tracking-tight">Name:</p>
              <p className="text-muted-foreground">
                {data[0].sender_full_name}
              </p>
            </div>
            <div className="sm flex items-center justify-start gap-3">
              <p className="scroll-m-20 font-semibold tracking-tight">Email:</p>
              <p className="text-muted-foreground">{data[0].sender_email}</p>
            </div>
            <div className="sm flex items-center justify-start gap-3">
              <p className="scroll-m-20 font-semibold tracking-tight">Phone:</p>
              <p className="text-muted-foreground">
                {data[0].sender_phone_number}
              </p>
            </div>
            <div className="sm flex items-center justify-start gap-3">
              <p className="scroll-m-20 font-semibold tracking-tight">
                Country:
              </p>
              <p className="text-muted-foreground">{data[0].sender_country}</p>
            </div>
            <div className="sm flex items-center justify-start gap-3">
              <p className="scroll-m-20 font-semibold tracking-tight">City:</p>
              <p className="text-muted-foreground">{data[0].sender_city}</p>
            </div>
            <div className="sm flex items-center justify-start gap-3">
              <p className="scroll-m-20 font-semibold tracking-tight">
                Address:
              </p>
              <p className="text-muted-foreground">{data[0].sender_address}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="p-5">
          <p className="scroll-m-20 text-xl font-semibold tracking-tight">
            Receiver Information
          </p>
          <CardContent className="space-y-1 px-0 pt-2">
            <div className="sm flex items-center justify-start gap-3">
              <p className="scroll-m-20 font-semibold tracking-tight">Name:</p>
              <p className="text-muted-foreground">
                {data[0].receiver_full_name}
              </p>
            </div>
            <div className="sm flex items-center justify-start gap-3">
              <p className="scroll-m-20 font-semibold tracking-tight">Email:</p>
              <p className="text-muted-foreground">{data[0].receiver_email}</p>
            </div>
            <div className="sm flex items-center justify-start gap-3">
              <p className="scroll-m-20 font-semibold tracking-tight">Phone:</p>
              <p className="text-muted-foreground">
                {data[0].receiver_phone_number}
              </p>
            </div>
            <div className="sm flex items-center justify-start gap-3">
              <p className="scroll-m-20 font-semibold tracking-tight">
                Country:
              </p>
              <p className="text-muted-foreground">
                {data[0].receiver_country}
              </p>
            </div>
            <div className="sm flex items-center justify-start gap-3">
              <p className="scroll-m-20 font-semibold tracking-tight">City:</p>
              <p className="text-muted-foreground">{data[0].receiver_city}</p>
            </div>
            <div className="sm flex items-center justify-start gap-3">
              <p className="scroll-m-20 font-semibold tracking-tight">
                Address:
              </p>
              <p className="text-muted-foreground">
                {data[0].receiver_address}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="p-5">
          <p className="scroll-m-20 text-xl font-semibold tracking-tight">
            Package Information
          </p>
          <CardContent className="space-y-1 px-0 pt-2">
            <div className="sm flex items-center justify-start gap-3">
              <p className="scroll-m-20 font-semibold tracking-tight">
                Tracking Number:
              </p>
              <p className="text-muted-foreground">{data[0].tracking_number}</p>
            </div>
            <div className="sm flex items-center justify-start gap-3">
              <p className="scroll-m-20 font-semibold tracking-tight">Type:</p>
              <p className="text-muted-foreground">{data[0].package_type}</p>
            </div>
            <div className="sm flex items-center justify-start gap-3">
              <p className="scroll-m-20 font-semibold tracking-tight">
                Dimension:
              </p>
              <p className="text-muted-foreground">{data[0].dimension}</p>
            </div>
            <div className="sm flex items-center justify-start gap-3">
              <p className="scroll-m-20 font-semibold tracking-tight">
                Weight:
              </p>
              <p className="text-muted-foreground">{data[0].weight}</p>
            </div>
            <div className="sm flex items-center justify-start gap-3">
              <p className="scroll-m-20 font-semibold tracking-tight">
                Description:
              </p>
              <p className="text-muted-foreground">{data[0].description}</p>
            </div>
            <div className="sm flex items-center justify-start gap-3">
              <p className="scroll-m-20 font-semibold tracking-tight">City:</p>
              <p className="text-muted-foreground">{data[0].sender_city}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
