"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/src/db/supabase";

export default async function AdminSuppoortPAge() {
  // const [searchTerm, setSearchTerm] = useState("");

  const { data } = await supabase.from("user").select();

  return (
    <div className="mx-auto flex h-screen max-w-sm flex-col">
      <div className="border-b p-4">
        <h1 className="mb-4 text-2xl font-bold">Customers</h1>
        {/* <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 transform text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search customers..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div> */}
      </div>
      <ScrollArea className="flex-grow">
        <div className="space-y-4 p-4">
          {data?.map((customer) => (
            <Link href={`/admin-support/${customer.id}`} key={customer.id}>
              <div className="flex items-center space-x-4 rounded-lg p-2 hover:bg-accent hover:text-foreground">
                <Avatar>
                  <AvatarFallback className="bg-gradient-to-r from-neutral-200 to-neutral-300 text-foreground dark:from-neutral-500 dark:to-neutral-700">
                    {customer.user_name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <h2 className="font-semibold">{customer.user_name}</h2>
                  <p className="text-sm text-muted-foreground">
                    active is hy wwe were born to this world
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
