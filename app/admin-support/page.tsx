import { cookies } from "next/headers";
import { supabase } from "@/src/db/supabase";
import AdminSupportPage from "./admin-support-page";
import { validateRequest } from "@/utils/auth";
import { notFound, redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { data, error } = await supabase.from("user").select("id, user_name");
  const { user } = await validateRequest();

  if (!user) {
    redirect("/auth/signin");
  }
  if (user.role !== "admin") {
    notFound();
  }

  if (error) {
    console.error("Error fetching users:", error);
    return <div>Error loading users. Please try again later.</div>;
  }

  return <AdminSupportPage initialData={data || []} />;
}
