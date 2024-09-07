import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/src/db";
import { packages } from "@/src/db/schema";
import { eq } from "drizzle-orm";

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
    <div className="mx-auto max-w-xl px-3 lg:container">
      <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Package Details
      </h1>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Sender Information</CardTitle>
            <CardContent className="space-y-1 pt-2">
              <div className="flex items-center justify-start gap-3 text-lg">
                <p className="scroll-m-20 font-semibold tracking-tight">
                  Name:
                </p>
                <p className="text-muted-foreground">
                  {data[0].sender_full_name}
                </p>
              </div>
              <div className="flex items-center justify-start gap-3 text-lg">
                <p className="scroll-m-20 font-semibold tracking-tight">
                  Email:
                </p>
                <p className="text-muted-foreground">{data[0].sender_email}</p>
              </div>
              <div className="flex items-center justify-start gap-3 text-lg">
                <p className="scroll-m-20 font-semibold tracking-tight">
                  Phone:
                </p>
                <p className="text-muted-foreground">
                  {data[0].sender_phone_number}
                </p>
              </div>
              <div className="flex items-center justify-start gap-3 text-lg">
                <p className="scroll-m-20 font-semibold tracking-tight">
                  Country:
                </p>
                <p className="text-muted-foreground">
                  {data[0].sender_country}
                </p>
              </div>
              <div className="flex items-center justify-start gap-3 text-lg">
                <p className="scroll-m-20 font-semibold tracking-tight">
                  City:
                </p>
                <p className="text-muted-foreground">{data[0].sender_city}</p>
              </div>
              <div className="flex items-center justify-start gap-3 text-lg">
                <p className="scroll-m-20 font-semibold tracking-tight">
                  Address:
                </p>
                <p className="text-muted-foreground">
                  {data[0].sender_address}
                </p>
              </div>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
