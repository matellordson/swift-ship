import { db } from "@/src/db";
import { packageTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import CustomerDashboard from "./customer-dashboard";
import { redirect } from "next/navigation";
import { validateRequest } from "@/utils/auth";
import { Support } from "@/components/support";
import SmartSupp from "@/app/(links)/track-shipment/smartsupp";

export const revalidate = 0;

export default async function CustomerDashboardPage() {
  const user = await validateRequest();
  if (!user) {
    redirect("/auth/signin");
  }

  const userId = user.user?.id as string;

  const data = await db
    .select()
    .from(packageTable)
    .where(eq(packageTable.userId, userId));

  return (
    <>
      <CustomerDashboard initialData={data} userId={userId} />
      <SmartSupp />
    </>
  );
}
