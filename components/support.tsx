import * as React from "react";

import { HeadsetIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { validateRequest } from "@/utils/auth";

export async function Support() {
  const { user } = await validateRequest();

  return (
    <Link
      href={`support/${user?.id}`}
      className={buttonVariants({
        variant: "outline",
        size: "icon",
        className:
          "fixed bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-3xl bg-transparent shadow-lg backdrop-blur transition-shadow duration-300 hover:shadow-xl",
      })}
    >
      <HeadsetIcon className="h-6 w-6" />
    </Link>
  );
}

// import { Button } from "@/components/ui/button";
// import { HeadsetIcon } from "lucide-react";

// export function SupportButton() {
//   return (
//     <Button
//       variant={"outline"}
//       size={"icon"}
//       className="fixed bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-transparent shadow-lg backdrop-blur transition-shadow duration-300 hover:shadow-xl"
//     >
//       <HeadsetIcon className="h-6 w-6" />
//     </Button>
//   );
// }
