"use server";

import { validateRequest } from "@/utils/auth";
import { supabase } from "@/src/db/supabase";

export default async function handleCustomerSend(formData: FormData) {
  const userId = await validateRequest();
  const value = formData.get("message") as string;

  await supabase
    .from("chat")
    .insert({ user_id: userId.user?.id as string, customer_message: value });
}
