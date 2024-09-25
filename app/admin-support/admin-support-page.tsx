"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import Link from "next/link";

type User = {
  id: string;
  user_name: string;
};

type AdminSupportPageProps = {
  initialData: User[];
};

export default function AdminSupportPage({
  initialData,
}: AdminSupportPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState<User[]>(initialData);

  const filteredCustomers = customers.filter((customer) =>
    customer.user_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="mx-auto flex h-screen max-w-sm flex-col">
      <div className="border-b p-4">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Customers</h1>
          <Link
            href={"/dashboard"}
            className="text-xs text-primary hover:underline"
          >
            Dashboard
          </Link>
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
                  <AvatarFallback className="bg-gradient-to-r from-neutral-200 to-neutral-300 font-bold uppercase text-foreground dark:from-neutral-500 dark:to-neutral-700">
                    {customer.user_name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <h2 className="font-semibold capitalize">
                    {customer.user_name}
                  </h2>
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
