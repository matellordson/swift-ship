import { validateRequest } from "@/utils/auth";
import AdminDashboard from "../_admin-dashboard/page";
import CustomerDashboardPage from "../_customer-dashboard/page";

export default async function Dashboard() {
  const currentUser = await validateRequest();

  if (currentUser?.user?.role === "admin") {
    return <AdminDashboard />;
  } else if (currentUser?.user?.role === "customer") {
    return <CustomerDashboardPage />;
  } else {
    <p>Your role is not recognised</p>;
  }
}
