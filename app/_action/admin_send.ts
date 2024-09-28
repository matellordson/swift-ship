"use server";

import { supabase } from "@/src/db/supabase";

export default async function handleAdminSend(formData: FormData, {
  params,
}: {
  params: { id: string }}) {
  const value = formData.get("message") as string;

 await supabase.from("chat").insert({
    user_id: params.id,
    admin_message: value,
  });
}
