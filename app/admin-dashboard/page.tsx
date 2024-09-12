import { Shipment, columns } from "@/components/admin-table/column";
import { DataTable } from "@/components/admin-table/data-table";
import { CustomerChatButton } from "@/components/customer-chat";
import { db } from "@/src/db";
import { packages } from "@/src/db/schema";

export const revalidate = 0;

async function getData(): Promise<Shipment[]> {
  const data = await db
    .select({
      id: packages.id,
      tracking_id: packages.tracking_number,
      sender: packages.sender_full_name,
      receiver: packages.receiver_full_name,
      package_type: packages.package_type,
      status: packages.status,
      origin: packages.sender_country,
      destination: packages.receiver_country,
    })
    .from(packages);
  return data;
}

export default async function AdminDashboard() {
  const data = await getData();

  return (
    <div className="mx-auto max-w-xl px-3 lg:container">
      <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Admin Dashboard
      </h1>
      <DataTable columns={columns} data={data} />
      <CustomerChatButton />
    </div>
  );
}
