import { db } from "@/src/db";
import { packages } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import CustomerDashboard from "./customer-dashboard";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const revalidate = 0;

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const getUserId = user.id;

  const data = await db
    .select()
    .from(packages)
    .where(eq(packages.userId, getUserId));

  return <CustomerDashboard initialData={data} userId={getUserId} />;
}
