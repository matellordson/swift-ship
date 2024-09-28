// "use client";

// import * as React from "react";
// import { MessageSquareText } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { supabase } from "@/src/db/supabase";

// export function AdminSupport() {
//   const [hasNotification, setHasNotification] = React.useState(false);

//   React.useEffect(() => {
//     const channel = supabase
//       .channel("admin_notification")
//       .on(
//         "postgres_changes",
//         {
//           event: "INSERT",
//           schema: "public",
//           table: "chat",
//         },
//         (payload) => {
//           console.log("Change received!", payload);
//           setHasNotification(true);
//         },
//       )
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, []);

//   return (
//     <div className="fixed bottom-4 right-4 z-50">
//       <Button
//         asChild
//         variant="outline"
//         size="icon"
//         className="h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm transition-all hover:bg-background/90 hover:shadow-lg"
//       >
//         <Link href={`admin-support`}>
//           <span className="sr-only">Contact Support</span>
//           <MessageSquareText className="h-6 w-6" />
//           {hasNotification && (
//             <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-destructive" />
//           )}
//         </Link>
//       </Button>
//     </div>
//   );
// }

"use client";

import * as React from "react";
import { MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/src/db/supabase";

export default function AdminSupport() {
  const [hasNotification, setHasNotification] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    // Check localStorage on component mount
    const storedNotification = localStorage.getItem("adminNotification");
    if (storedNotification === "true") {
      setHasNotification(true);
    }

    const channel = supabase
      .channel("admin_notification")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat",
        },
        (payload) => {
          console.log("Change received!", payload);
          setHasNotification(true);
          localStorage.setItem("adminNotification", "true");
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  React.useEffect(() => {
    // Check if the current path is the admin-support page
    if (pathname === "/admin-support") {
      setHasNotification(false);
      localStorage.removeItem("adminNotification");
    }
  }, [pathname]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        asChild
        variant="outline"
        size="icon"
        className="h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm transition-all hover:bg-background/90 hover:shadow-lg"
      >
        <Link href="/admin-support">
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
