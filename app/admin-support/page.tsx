"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Plus } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: string;
}

const initialContacts: Contact[] = [
  {
    id: "1",
    name: "Alice Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Online",
  },
  {
    id: "2",
    name: "Bob Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "In a meeting",
  },
  {
    id: "3",
    name: "Charlie Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Offline",
  },
  {
    id: "4",
    name: "Diana Prince",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Away",
  },
  {
    id: "5",
    name: "Ethan Hunt",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Do not disturb",
  },
];

export default function Component() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="mx-auto flex h-screen max-w-sm flex-col bg-background">
      <div className="border-b p-4">
        <h1 className="mb-4 text-2xl font-bold">Contacts</h1>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 transform text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search contacts..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="flex-grow">
        <div className="space-y-4 p-4">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center space-x-4 rounded-lg p-2 hover:bg-accent"
            >
              <Avatar>
                <AvatarImage src={contact.avatar} alt={contact.name} />
                <AvatarFallback>
                  {contact.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <h2 className="font-semibold">{contact.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {contact.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <Button className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Add New Contact
        </Button>
      </div>
    </div>
  );
}
