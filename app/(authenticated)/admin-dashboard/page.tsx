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
      delivery_date: packageTable.delivery_date,
      stage1: packageTable.stage1 , 
      stage1Location: packageTable.stage1Location,
      stage1Time: packageTable.stage1Time,
      stage1IsCompleted: packageTable.stage1IsCompleted,
      stage2: packageTable.stage2,
      stage2Location: packageTable.stage2Location,
      stage2Time: packageTable.stage2Time,
      stage2IsCompleted: packageTable.stage2IsCompleted,
      stage3: packageTable.stage3,
      stage3Location: packageTable.stage3Location,
      stage3Time: packageTable.stage3Time,
      stage3IsCompleted: packageTable.stage3IsCompleted,
      stage4: packageTable.stage4,
      stage4Location: packageTable.stage4Location,
      stage4Time: packageTable.stage4Time,
      stage4IsCompleted: packageTable.stage4IsCompleted,
      stage5: packageTable.stage5,
      stage5Location: packageTable.stage5Location,
      stage5Time: packageTable.stage5Time,
      stage5IsCompleted: packageTable.stage5IsCompleted,
      stage6: packageTable.stage6,
      stage6Location: packageTable.stage6Location,
      stage6Time: packageTable.stage6Time,
      stage6IsCompleted: packageTable.stage6IsCompleted,
      stage7: packageTable.stage7,
      stage7Location: packageTable.stage7Location,
      stage7Time: packageTable.stage7Time,
      stage7IsCompleted: packageTable.stage7IsCompleted
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
      <div className="max-h-96">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
