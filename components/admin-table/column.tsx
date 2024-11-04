"use client";

import { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  CheckCircle2Icon,
  CircleX,
  MoreHorizontal,
  Trash2,
  Bell,
} from "lucide-react";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateShipmentStatus } from "@/app/_action/update-package";
import { updateDeliveryDate } from "@/app/_action/upade-delivery-date";
import { deletePackage } from "@/app/_action/delete-package";
import { updatePackageStage } from "@/app/_action/update-stage";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";

import { format, parseISO, isValid } from "date-fns";
import { Textarea } from "../ui/textarea";

export type Shipment = {
  id: string;
  user_id: string;
  created_at: Date | null;
  tracking_id: string;
  sender: string | null;
  receiver: string | null;
  package_type: string | null;
  status: string | null;
  origin: string | null;
  destination: string | null;
  delivery_date: string | null;
};

export const columns: ColumnDef<Shipment>[] = [
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Creation Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdAt = row.getValue("created_at") as Date | null;
      if (createdAt) {
        return format(createdAt, "yyyy-MM-dd");
      }
      return "N/A";
    },
  },
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
    accessorKey: "delivery_date",
    header: "Delivery Date",
    cell: ({ row }) => {
      const shipment = row.original;
      if (shipment.delivery_date) {
        const date = parseISO(shipment.delivery_date);
        if (isValid(date)) {
          return format(date, "yyyy-MM-dd");
        }
      }
      return "TBD";
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "package_type",
    header: "Package Type",
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
      const [isUpdateStageOpen, setIsUpdateStageOpen] = useState(false);
      const [newStageLocation, setNewStageLocation] = useState("");
      const [isStatusOpen, setIsStatusOpen] = useState(false);
      const [isDateOpen, setIsDateOpen] = useState(false);
      const [isDeleteOpen, setIsDeleteOpen] = useState(false);
      const [newStatus, setNewStatus] = useState(shipment.status || "");
      const [newDate, setNewDate] = useState<Date | undefined>(() => {
        if (shipment.delivery_date) {
          const date = parseISO(shipment.delivery_date);
          return isValid(date) ? date : undefined;
        }
        return undefined;
      });
      const [stages, setStages] = useState([
        {
          name: "Shipping label created, SSS awaiting item",
          isCompleted: false,
          location: "",
          time: "",
        },
        {
          name: "Accepted by SSS regional destination facility",
          isCompleted: false,
          location: "",
          time: "",
        },
        {
          name: "Arrived at SSS regional destination facility",
          isCompleted: false,
          location: "",
          time: "",
        },
        {
          name: "Departed SSS regional destination facility",
          isCompleted: false,
          location: "",
          time: "",
        },
        { name: "In transit", isCompleted: false, location: "", time: "" },
        {
          name: "Arrived at SSS regional destination facility",
          isCompleted: false,
          location: "",
          time: "",
        },
        { name: "Out for delivery", isCompleted: false, location: "", time: "" },
        { name: "Delivered", isCompleted: false, location: "", time: "" },
      ]);
      const [currentStage, setCurrentStage] = useState(0);
      const router = useRouter();

      // Load stages and currentStage from localStorage on component mount
      useEffect(() => {
        const storedStages = localStorage.getItem(
          `stages_${shipment.tracking_id}`,
        );
        const storedCurrentStage = localStorage.getItem(
          `currentStage_${shipment.tracking_id}`,
        );

        if (storedStages) {
          setStages(JSON.parse(storedStages));
        }
        if (storedCurrentStage) {
          setCurrentStage(parseInt(storedCurrentStage, 10));
        }
      }, [shipment.tracking_id]);

      // Save stages and currentStage to localStorage whenever they change
      useEffect(() => {
        localStorage.setItem(
          `stages_${shipment.tracking_id}`,
          JSON.stringify(stages),
        );
        localStorage.setItem(
          `currentStage_${shipment.tracking_id}`,
          currentStage.toString(),
        );
      }, [stages, currentStage, shipment.tracking_id]);

      const handleStatusUpdate = async () => {
        const result = await updateShipmentStatus(
          shipment.tracking_id,
          newStatus,
        );
        if (result.success) {
          toast(
            <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
              <CheckCircle2Icon className="size-4 text-green-500" />
              Package status updated successfully
            </p>,
          );
          setIsStatusOpen(false);
        } else {
          toast(
            <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
              <CircleX className="size-4 text-red-500" />
              Unsuccessful status update
            </p>,
          );
        }
        router.refresh();
      };

      const handleDateUpdate = async () => {
        if (newDate && isValid(newDate)) {
          const dateString = format(newDate, "yyyy-MM-dd");
          const result = await updateDeliveryDate(
            shipment.tracking_id,
            dateString,
          );
          if (result.success) {
            toast(
              <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
                <CheckCircle2Icon className="size-4 text-green-500" />
                Delivery date updated successfully
              </p>,
            );
            setIsDateOpen(false);
          } else {
            toast(
              <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
                <CircleX className="size-4 text-red-500" />
                Unsuccessful date update
              </p>,
            );
          }
        } else if (newDate === undefined) {
          const result = await updateDeliveryDate(shipment.tracking_id, "");
          if (result.success) {
            toast(
              <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
                <CheckCircle2Icon className="size-4 text-green-500" />
                Delivery date cleared successfully
              </p>,
            );
            setIsDateOpen(false);
          } else {
            toast(
              <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
                <CircleX className="size-4 text-red-500" />
                Unsuccessful date clear
              </p>,
            );
          }
        } else {
          toast(
            <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
              <CircleX className="size-4 text-red-500" />
              Invalid date selected
            </p>,
          );
        }
        router.refresh();
      };

      const handleDelete = async () => {
        const result = await deletePackage(shipment.tracking_id);
        if (result.success) {
          toast(
            <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
              <CheckCircle2Icon className="size-4 text-green-500" />
              Package deleted successfully
            </p>,
          );
          setIsDeleteOpen(false);
        } else {
          toast(
            <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
              <CircleX className="size-4 text-red-500" />
              Failed to delete package
            </p>,
          );
        }
        router.refresh();
      };

      const handleUpdateStage = async () => {
        if (currentStage >= stages.length - 1) {
          // We're at the last stage (Delivered)
          const updatedStages = [...stages];
          updatedStages[currentStage] = {
            ...updatedStages[currentStage],
            isCompleted: true,
            location: newStageLocation,
            time: new Date().toISOString(),
          };

          try {
            await updatePackageStage(shipment.tracking_id, newStageLocation);
            setStages(updatedStages);
            setNewStageLocation("");
            setIsUpdateStageOpen(false);
            toast(
              <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
                <CheckCircle2Icon className="size-4 text-green-500" />
                Package delivered successfully
              </p>,
            );
          } catch (error) {
            console.error("Failed to update package stage:", error);
            toast(
              <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
                <CircleX className="size-4 text-red-500" />
                Failed to update package stage
              </p>,
            );
          }
        } else {
          const updatedStages = [...stages];
          updatedStages[currentStage] = {
            ...updatedStages[currentStage],
            isCompleted: true,
            location: newStageLocation,
            time: new Date().toISOString(),
          };

          try {
            await updatePackageStage(shipment.tracking_id, newStageLocation);
            setStages(updatedStages);
            setCurrentStage(currentStage + 1);
            setNewStageLocation("");
            setIsUpdateStageOpen(false);
            toast(
              <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
                <CheckCircle2Icon className="size-4 text-green-500" />
                Package stage updated successfully
              </p>,
            );
          } catch (error) {
            console.error("Failed to update package stage:", error);
            toast(
              <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
                <CircleX className="size-4 text-red-500" />
                Failed to update package stage
              </p>,
            );
          }
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
            <Dialog open={isStatusOpen} onOpenChange={setIsStatusOpen}>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Update Status
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Update Shipment Status</DialogTitle>
                  <DialogDescription>
                    Change the current status of the shipment.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <Select value={newStatus} onValueChange={setNewStatus}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select new status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in progress">In Progress</SelectItem>
                        <SelectItem value="in transit">In Transit</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleStatusUpdate}>Update Status</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog open={isDateOpen} onOpenChange={setIsDateOpen}>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Update Delivery Date
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] lg:max-w-fit">
                <DialogHeader>
                  <DialogTitle>Update Delivery Date</DialogTitle>
                  <DialogDescription>
                    Set a new delivery date for the shipment.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Calendar
                    mode="single"
                    selected={newDate}
                    onSelect={(date) => setNewDate(date)}
                    className="rounded-md border"
                  />
                </div>
                <DialogFooter>
                  <Button onClick={handleDateUpdate}>
                    Update Delivery Date
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog
              open={isUpdateStageOpen}
              onOpenChange={setIsUpdateStageOpen}
            >
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Update Stage
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Update Package Stage</DialogTitle>
                  <DialogDescription>
                    {currentStage === stages.length - 1
                      ? "Enter the delivery location for the package."
                      : "Enter the new location to update the package's current stage."}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right">
                      Location
                    </Label>
                    <Textarea
                      id="location"
                      placeholder="Enter new location"
                      value={newStageLocation}
                      onChange={(e) => setNewStageLocation(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="col-span-4">
                    <h3 className="mb-2 font-semibold">Current Stage:</h3>
                    <p>{stages[currentStage].name}</p>
                  </div>
                  {currentStage < stages.length - 1 && (
                    <div className="col-span-4">
                      <h3 className="mb-2 font-semibold">Next Stage:</h3>
                      <p>{stages[currentStage + 1].name}</p>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button onClick={handleUpdateStage}>
                    {currentStage === stages.length - 1
                      ? "Mark as Delivered"
                      : "Update Stage"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Link href={`/track-shipment-admin`}>
              <DropdownMenuItem>Track Package</DropdownMenuItem>
            </Link>
            {/* <DropdownMenuSeparator />
            <Link href={`/admin-support/${shipment.user_id}`}>
              <DropdownMenuItem>Chat Customer</DropdownMenuItem>
            </Link> */}
            <DropdownMenuSeparator />
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <span className="flex items-center text-red-500">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Package
                  </span>
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Delete Package</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this package? This action
                    cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsDeleteOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleDelete}>
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
