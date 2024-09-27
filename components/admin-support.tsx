"use client";

import * as React from "react";
import { HeadsetIcon, MessageSquareText } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { supabase } from "@/src/db/supabase";

export function AdminSupport() {
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
          filter: `admin_id=eq.${process.env.ADMIN_ID}`,
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
  }, []);

  return (
    <div className="fixed bottom-4 right-4 flex items-center justify-center rounded-full shadow-lg backdrop-blur transition-shadow duration-300 hover:shadow-xl">
      <Link
        href={`admin-support`}
        className={buttonVariants({
          variant: "ghost",
          size: "icon",
          className: "border",
        })}
      >
        <MessageSquareText className="h-6 w-6" />
        {hasNotification && (
          <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-500" />
        )}
      </Link>
    </div>
  );
}
