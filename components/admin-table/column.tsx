"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { updateShipmentStatus } from "@/app/_action/update-package";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Shipment = {
  id: string;
  tracking_id: string;
  sender: string | null;
  receiver: string | null;
  package_type: string | null;
  status: string | null;
  origin: string | null;
  destination: string | null;
};

export const columns: ColumnDef<Shipment>[] = [
  {
    accessorKey: "tracking_id",
    header: "Tracking Id",
  },
  {
    accessorKey: "sender",
    header: "Sender",
  },
  {
    accessorKey: "receiver",
    header: "Receiver",
  },
  {
    accessorKey: "package_type",
    header: "Package Type",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "origin",
    header: "Origin",
  },
  {
    accessorKey: "destination",
    header: "Destination",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const shipment = row.original;
      const [isOpen, setIsOpen] = useState(false);
      const [newStatus, setNewStatus] = useState(shipment.status || "");
      const router = useRouter();

      const handleStatusUpdate = async () => {
        const result = await updateShipmentStatus(
          shipment.tracking_id,
          newStatus,
        );
        if (result.success) {
          toast("Package updated successfully");
          setIsOpen(false);
        } else {
          toast("Unsuccessful");
        }
        router.refresh();
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(shipment.tracking_id)
              }
            >
              Copy tracking ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href={`/admin-dashboard/${shipment.tracking_id}`}>
              <DropdownMenuItem>View Package</DropdownMenuItem>
            </Link>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Update Status
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="max-w-sm">
                <DialogHeader>
                  <DialogTitle>Update Shipment Status</DialogTitle>
                </DialogHeader>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select new status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="in transit">In Transit</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleStatusUpdate}>Update Status</Button>
              </DialogContent>
            </Dialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
