import { cookies } from "next/headers";
import { supabase } from "@/src/db/supabase";
import AdminSupportPage from "./admin-support-page";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { data, error } = await supabase.from("user").select("id, user_name");

  if (error) {
    console.error("Error fetching users:", error);
    return <div>Error loading users. Please try again later.</div>;
  }

  return <AdminSupportPage initialData={data || []} />;
}
