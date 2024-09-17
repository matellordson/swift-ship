"use server";

import { supabase } from "@/src/db/supabase";
import { validateRequest } from "@/utils/auth";

export async function handleSentMessage(formData: FormData) {
  const userId = await validateRequest();
  const getMessage = formData.get("message");

  await supabase
    .from("chat")
    .insert({ user_id: userId.user?.id, message: getMessage });
}
