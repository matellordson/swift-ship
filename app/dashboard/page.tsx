import { db } from "@/src/db";
import { packageTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import CustomerDashboard from "./customer-dashboard";
import { redirect } from "next/navigation";
import { validateRequest } from "@/utils/auth";

export const revalidate = 0;

export default async function Page() {
  const user = await validateRequest();
  if (!user) {
    redirect("/auth/signin");
  }

  if (user.user?.role !== "customer") {
    redirect("/admin-dashboard");
  }

  const userId = user.user?.id as string;

  const data = await db
    .select()
    .from(packageTable)
    .where(eq(packageTable.userId, userId));

  return <CustomerDashboard initialData={data} userId={userId} />;
}
