"use client";

import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { RealtimeChannel, SupabaseClient } from "@supabase/supabase-js";

// Assuming you have a type for your Supabase client
import { supabase } from "@/src/db/supabase";

type User = {
  id: string;
  user_name: string;
};

type AdminSupportPageProps = {
  initialData: User[];
};

type ChatPayload = {
  new: {
    user_id: string;
  };
  [key: string]: any;
};

export default function AdminSupportPage({
  initialData,
}: AdminSupportPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState<User[]>(initialData);
  const [hasNotification, setHasNotification] = useState<
    Record<string, boolean>
  >({});

  const filteredCustomers = customers.filter((customer) =>
    customer.user_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    let subscription: RealtimeChannel;

    const subscribeToChanges = async () => {
      subscription = supabase
        .channel("chat_changes")
        .on<ChatPayload>(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "chat",
          },
          (payload) => {
            console.log("Change received!", payload);
            if (payload.new && payload.new.user_id) {
              setHasNotification((prev) => ({
                ...prev,
                [payload.new.user_id]: true,
              }));
            }
          },
        )
        .subscribe();
    };

    subscribeToChanges();

    return () => {
      if (subscription) {
        supabase.removeChannel(subscription);
      }
    };
  }, []);

  return (
    <div className="mx-auto flex h-screen max-w-sm flex-col">
      <div className="border-b p-4">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Customers</h1>
          <div className="flex items-center justify-center hover:underline">
            <ArrowLeft size={15} />
            <Link href="/dashboard" className="text-xs text-primary">
              Dashboard
            </Link>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 transform text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search customers..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="flex-grow">
        <div className="space-y-4 p-4">
          {filteredCustomers.map((customer) => (
            <Link href={`/admin-support/${customer.id}`} key={customer.id}>
              <div className="flex items-center space-x-4 rounded-lg p-2 hover:bg-accent hover:text-foreground">
                <Avatar>
                  <AvatarFallback className="bg-gradient-to-r from-neutral-200 to-neutral-300 text-xl font-semibold uppercase text-foreground shadow-sm dark:from-neutral-500 dark:to-neutral-700">
                    {customer.user_name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <div className="flex w-full items-center justify-between">
                    <h2 className="font-semibold capitalize">
                      {customer.user_name}
                    </h2>
                    <div className="relative">
                      {hasNotification[customer.id] && (
                        <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-destructive" />
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Active customer
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
