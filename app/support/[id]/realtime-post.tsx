"use client";

import { supabase } from "@/src/db/supabase";
import { useEffect } from "react";

interface chatTypes {
  id: string;
  user_id: string;
  customer_message: string | null;
  admin_message: string | null;
}

export default function RealtimePosts({
  serverPosts,
}: {
  serverPosts: chatTypes[];
}) {
  useEffect(() => {
    const channel = supabase
      .channel("realtime posts")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat",
        },
        (payload) => {
          console.log({ payload });
        },
      )
      .unsubscribe();

    // return () => {
    //   supabase.removeChannel(channel);
    // };
  }, [supabase]);
  return <pre>{JSON.stringify(serverPosts, null, 2)}</pre>;
}
