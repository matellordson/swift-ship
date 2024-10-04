import { validateRequest } from "@/utils/auth";
import AdminDashboard from "../admin-dashboard/page";
import CustomerDashboardPage from "../_customer-dashboard/page";
import { Support } from "@/components/support";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const currentUser = await validateRequest();

  if (!currentUser) {
    redirect("/auth/signin");
  }

  if (currentUser?.user?.role === "admin") {
    return <AdminDashboard />;
  } else if (currentUser?.user?.role === "customer") {
    return <CustomerDashboardPage />;
  } else {
    <p>Your role is not recognised</p>;
  }
}
