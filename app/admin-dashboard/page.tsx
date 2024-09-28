import AdminSupport from "@/components/admin-support";
import { Shipment, columns } from "@/components/admin-table/column";
import { DataTable } from "@/components/admin-table/data-table";
import { db } from "@/src/db";
import { packageTable } from "@/src/db/schema";
import { validateRequest } from "@/utils/auth";
import { redirect } from "next/navigation";

export const revalidate = 0;

async function getData(): Promise<Shipment[]> {
  const data = await db
    .select({
      id: packageTable.id,
      user_id: packageTable.userId,
      tracking_id: packageTable.tracking_number,
      sender: packageTable.sender_full_name,
      receiver: packageTable.receiver_full_name,
      package_type: packageTable.package_type,
      status: packageTable.status,
      origin: packageTable.sender_country,
      destination: packageTable.receiver_country,
    })
    .from(packageTable);
  return data;
}

export default async function AdminDashboard() {
  const data = await getData();
  const user = await validateRequest();
  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <div className="mx-auto max-w-xl px-3 lg:container">
      <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Admin Dashboard
      </h1>
      <DataTable columns={columns} data={data} />
      <AdminSupport />
    </div>
  );
}
