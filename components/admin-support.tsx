"use client";

import * as React from "react";
import { Headset, HeadsetIcon, MessageSquareText } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { supabase } from "@/src/db/supabase";

export function AdminSupport() {
  const [hasNotification, setHasNotification] = React.useState(false);

  React.useEffect(() => {
    const channel = supabase
      .channel("admin_notifications")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chat",
          filter: `admin_id=eq.${process.env.ADMIN_ID}`,
        },
        (payload) => {
          console.log("Admin notification received!", payload);
          setHasNotification(true);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        asChild
        variant="outline"
        size="icon"
        className="h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm transition-all hover:bg-background/90 hover:shadow-lg"
      >
        <Link href={`admin-support`}>
          <span className="sr-only">Contact Support</span>
          <MessageSquareText className="h-6 w-6" />
          {hasNotification && (
            <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-destructive" />
          )}
        </Link>
      </Button>
    </div>
  );
}
