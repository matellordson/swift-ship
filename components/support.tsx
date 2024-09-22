"use client";

import * as React from "react";
import { HeadsetIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { supabase } from "@/src/db/supabase";

export function Support({ userId }: { userId: string }) {
  const [hasNotification, setHasNotification] = React.useState(false);

  React.useEffect(() => {
    const channel = supabase
      .channel("support_notifications")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chat",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          console.log("Change received!", payload);
          setHasNotification(true);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return (
    <Link
      href={`support/${userId}`}
      className={buttonVariants({
        variant: "default",
        size: "icon",
        className:
          "fixed bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-2xl shadow-lg backdrop-blur transition-shadow duration-300 hover:shadow-xl",
      })}
    >
      <HeadsetIcon className="h-6 w-6" />
      {hasNotification && (
        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-500" />
      )}
    </Link>
  );
}
