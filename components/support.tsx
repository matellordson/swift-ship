"use client";

import * as React from "react";
import { Headset } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { supabase } from "@/src/db/supabase";

export function Support({ userId }: { userId: string }) {
  const [hasNotification, setHasNotification] = React.useState(false);

  React.useEffect(() => {
    // Check localStorage when component mounts
    const storedNotification = localStorage.getItem(
      `support_notification_${userId}`,
    );
    if (storedNotification === "true") {
      setHasNotification(true);
    }

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
          // Store notification state in localStorage
          localStorage.setItem(`support_notification_${userId}`, "true");
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const handleClick = () => {
    setHasNotification(false);
    // Clear notification state from localStorage
    localStorage.removeItem(`support_notification_${userId}`);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 hidden">
      <Button
        asChild
        variant="outline"
        size="icon"
        className="h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm transition-all hover:bg-background/90 hover:shadow-lg"
      >
        <Link href={`support/${userId}`} onClick={handleClick}>
          <span className="sr-only">Contact Support</span>
          <Headset className="h-6 w-6" />
          {hasNotification && (
            <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-destructive" />
          )}
        </Link>
      </Button>
    </div>
  );
}
