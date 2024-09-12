import { auth } from "@/auth";
import { db } from "@/src/db";
import { packages } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import CustomerDashboard from "./customer-dashboard";

export const revalidate = 0;

export default async function Page() {
  const userId = await auth();
  const data = await db
    .select()
    .from(packages)
    .where(eq(packages.userId, userId?.user?.id as string));

  return <CustomerDashboard initialData={data} userId={userId?.user?.id} />;
}
