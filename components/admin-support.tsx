"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Link, MessageSquareTextIcon } from "lucide-react";
import { Button } from "./ui/button";

// Initialize the Supabase client
const supabase = createClient("YOUR_SUPABASE_URL", "YOUR_SUPABASE_ANON_KEY");

export default function AdminSupport() {
  const [hasNotifications, setNotifications] = useState(false);

  useEffect(() => {
    // Set up the real-time listener
    const channel = supabase
      .channel("table_db_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat",
        },
        (payload) => {
          setNotifications(true);
          alert(payload);
        },
      )
      .subscribe();

    // Cleanup function to remove the listener
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
          <MessageSquareTextIcon className="h-6 w-6" />
          {hasNotifications && (
            <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-destructive" />
          )}
        </Link>
      </Button>
    </div>
  );
}
