// // "use client";

// // import { ColumnDef } from "@tanstack/react-table";
// // import {
// //   ArrowUpDown,
// //   CheckCircle2Icon,
// //   CircleX,
// //   MoreHorizontal,
// //   Trash2,
// // } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import {
// //   DropdownMenu,
// //   DropdownMenuContent,
// //   DropdownMenuItem,
// //   DropdownMenuLabel,
// //   DropdownMenuSeparator,
// //   DropdownMenuTrigger,
// // } from "@/components/ui/dropdown-menu";
// // import Link from "next/link";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogTrigger,
// // } from "@/components/ui/dialog";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import { updateShipmentStatus } from "@/app/_action/update-package";
// // import { updateDeliveryDate } from "@/app/_action/upade-delivery-date";
// // import { deletePackage } from "@/app/_action/delete-package";
// // import { useState } from "react";
// // import { toast } from "sonner";
// // import { useRouter } from "next/navigation";
// // import { Calendar } from "@/components/ui/calendar";
// // import { updatePackageStage } from "@/app/_action/update-stage";

// // import { format, parseISO, isValid } from "date-fns";

// // export type Shipment = {
// //   id: string;
// //   user_id: string;
// //   tracking_id: string;
// //   sender: string | null;
// //   receiver: string | null;
// //   package_type: string | null;
// //   status: string | null;
// //   origin: string | null;
// //   destination: string | null;
// //   delivery_date: string | null;
// // };

// // export const columns: ColumnDef<Shipment>[] = [
// //   {
// //     accessorKey: "tracking_id",
// //     header: "Tracking Id",
// //   },
// //   {
// //     accessorKey: "sender",
// //     header: "Sender",
// //   },
// //   {
// //     accessorKey: "receiver",
// //     header: "Receiver",
// //   },
// //   {
// //     accessorKey: "delivery_date",
// //     header: "Delivery Date",
// //     cell: ({ row }) => {
// //       const shipment = row.original;
// //       if (shipment.delivery_date) {
// //         const date = parseISO(shipment.delivery_date);
// //         if (isValid(date)) {
// //           return format(date, "yyyy-MM-dd");
// //         }
// //       }
// //       return "TBD";
// //     },
// //   },
// //   {
// //     accessorKey: "status",
// //     header: "Status",
// //   },
// //   {
// //     accessorKey: "package_type",
// //     header: "Package Type",
// //   },
// //   {
// //     accessorKey: "origin",
// //     header: "Origin",
// //   },
// //   {
// //     accessorKey: "destination",
// //     header: "Destination",
// //   },
// //   {
// //     id: "actions",
// //     cell: ({ row }) => {
// //       const shipment = row.original;
// //        const [isUpdateStageOpen, setIsUpdateStageOpen] = useState(false)
// //       const [newStageLocation, setNewStageLocation] = useState("")
// //       const [isStatusOpen, setIsStatusOpen] = useState(false);
// //       const [isDateOpen, setIsDateOpen] = useState(false);
// //       const [isDeleteOpen, setIsDeleteOpen] = useState(false);
// //       const [newStatus, setNewStatus] = useState(shipment.status || "");
// //       const [newDate, setNewDate] = useState<Date | undefined>(() => {
// //         if (shipment.delivery_date) {
// //           const date = parseISO(shipment.delivery_date);
// //           return isValid(date) ? date : undefined;
// //         }
// //         return undefined;
// //       });
// //       const router = useRouter();

// //       const handleStatusUpdate = async () => {
// //         const result = await updateShipmentStatus(
// //           shipment.tracking_id,
// //           newStatus,
// //         );
// //         if (result.success) {
// //           toast(
// //             <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
// //               <CheckCircle2Icon className="size-4 text-green-500" />
// //               Package status updated successfully
// //             </p>,
// //           );
// //           setIsStatusOpen(false);
// //         } else {
// //           toast(
// //             <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
// //               <CircleX className="size-4 text-red-500" />
// //               Unsuccessful status update
// //             </p>,
// //           );
// //         }
// //         router.refresh();
// //       };

// //       const handleDateUpdate = async () => {
// //         if (newDate && isValid(newDate)) {
// //           const dateString = format(newDate, "yyyy-MM-dd");
// //           const result = await updateDeliveryDate(
// //             shipment.tracking_id,
// //             dateString,
// //           );
// //           if (result.success) {
// //             toast(
// //               <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
// //                 <CheckCircle2Icon className="size-4 text-green-500" />
// //                 Delivery date updated successfully
// //               </p>,
// //             );
// //             setIsDateOpen(false);
// //           } else {
// //             toast(
// //               <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
// //                 <CircleX className="size-4 text-red-500" />
// //                 Unsuccessful date update
// //               </p>,
// //             );
// //           }
// //         } else if (newDate === undefined) {
// //           const result = await updateDeliveryDate(shipment.tracking_id, "");
// //           if (result.success) {
// //             toast(
// //               <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
// //                 <CheckCircle2Icon className="size-4 text-green-500" />
// //                 Delivery date cleared successfully
// //               </p>,
// //             );
// //             setIsDateOpen(false);
// //           } else {
// //             toast(
// //               <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
// //                 <CircleX className="size-4 text-red-500" />
// //                 Unsuccessful date clear
// //               </p>,
// //             );
// //           }
// //         } else {
// //           toast(
// //             <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
// //               <CircleX className="size-4 text-red-500" />
// //               Invalid date selected
// //             </p>,
// //           );
// //         }
// //         router.refresh();
// //       };

// //       const handleDelete = async () => {
// //         const result = await deletePackage(shipment.tracking_id);
// //         if (result.success) {
// //           toast(
// //             <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
// //               <CheckCircle2Icon className="size-4 text-green-500" />
// //               Package deleted successfully
// //             </p>,
// //           );
// //           setIsDeleteOpen(false);
// //         } else {
// //           toast(
// //             <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
// //               <CircleX className="size-4 text-red-500" />
// //               Failed to delete package
// //             </p>,
// //           );
// //         }
// //         router.refresh();
// //       };

       
// // const handleUpdateStage = async () => {
// //   try {
// //     await updatePackageStage(shipment.tracking_id, newStageLocation)
// //     setIsUpdateStageOpen(false)
// //     toast(
// //       <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
// //         <CheckCircle2Icon className="size-4 text-green-500" />
// //         Package stage updated successfully
// //       </p>,
// //     )
// //   } catch (error) {
// //     console.error("Failed to update package stage:", error)
// //     toast(
// //       <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
// //         <CircleX className="size-4 text-red-500" />
// //         Failed to update package stage
// //       </p>,
// //     )
// //   }
// //   router.refresh()
// // }

// //       return (
// //         <DropdownMenu>
// //           <DropdownMenuTrigger asChild>
// //             <Button variant="ghost" className="h-8 w-8 p-0">
// //               <span className="sr-only">Open menu</span>
// //               <MoreHorizontal className="h-4 w-4" />
// //             </Button>
// //           </DropdownMenuTrigger>
// //           <DropdownMenuContent align="end">
// //             <DropdownMenuLabel>Actions</DropdownMenuLabel>
// //             <DropdownMenuItem
// //               onClick={() =>
// //                 navigator.clipboard.writeText(shipment.tracking_id)
// //               }
// //             >
// //               Copy tracking ID
// //             </DropdownMenuItem>
// //             <DropdownMenuSeparator />
// //             <Link href={`/admin-dashboard/${shipment.tracking_id}`}>
// //               <DropdownMenuItem>View Package</DropdownMenuItem>
// //             </Link>
// //             <Dialog open={isStatusOpen} onOpenChange={setIsStatusOpen}>
// //               <DialogTrigger asChild>
// //                 <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
// //                   Update Status
// //                 </DropdownMenuItem>
// //               </DialogTrigger>
// //               <DialogContent className="max-w-sm">
// //                 <DialogHeader>
// //                   <DialogTitle>Update Shipment Status</DialogTitle>
// //                 </DialogHeader>
// //                 <Select value={newStatus} onValueChange={setNewStatus}>
// //                   <SelectTrigger>
// //                     <SelectValue placeholder="Select new status" />
// //                   </SelectTrigger>
// //                   <SelectContent>
// //                     <SelectItem value="pending">Pending</SelectItem>
// //                     <SelectItem value="in transit">In Transit</SelectItem>
// //                     <SelectItem value="delivered">Delivered</SelectItem>
// //                   </SelectContent>
// //                 </Select>
// //                 <Button onClick={handleStatusUpdate}>Update Status</Button>
// //               </DialogContent>
// //             </Dialog>
// //             <Dialog open={isDateOpen} onOpenChange={setIsDateOpen}>
// //               <DialogTrigger asChild>
// //                 <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
// //                   Update Delivery Date
// //                 </DropdownMenuItem>
// //               </DialogTrigger>
// //               <DialogContent className="w-fit">
// //                 <DialogHeader>
// //                   <DialogTitle>Update Delivery Date</DialogTitle>
// //                 </DialogHeader>
// //                 <Calendar
// //                   mode="single"
// //                   selected={newDate}
// //                   onSelect={(date) => setNewDate(date)}
// //                   className="rounded-md border"
// //                 />
// //                 <div className="flex justify-between">
// //                   <Button onClick={handleDateUpdate} className="w-full">
// //                     Update Delivery Date
// //                   </Button>
// //                 </div>
// //               </DialogContent>
// //             </Dialog>
// //             <DropdownMenuSeparator />
// //             <Link href={`/admin-support/${shipment.user_id}`}>
// //               <DropdownMenuItem>Chat Customer</DropdownMenuItem>
// //             </Link>
// //             <DropdownMenuSeparator />
// //             <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
// //               <DialogTrigger asChild>
// //                 <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
// //                   <span className="flex items-center text-red-500">
// //                     <Trash2 className="mr-2 h-4 w-4" />
// //                     Delete Package
// //                   </span>
// //                 </DropdownMenuItem>
// //               </DialogTrigger>
// //               <DialogContent className="max-w-sm">
// //                 <DialogHeader>
// //                   <DialogTitle>Delete Package</DialogTitle>
// //                 </DialogHeader>
// //                 <p>
// //                   Are you sure you want to delete this package? This action
// //                   cannot be undone.
// //                 </p>
// //                 <div className="flex justify-end gap-2">
// //                   <Button
// //                     variant="outline"
// //                     onClick={() => setIsDeleteOpen(false)}
// //                   >
// //                     Cancel
// //                   </Button>
// //                   <Button variant="destructive" onClick={handleDelete}>
// //                     Delete
// //                   </Button>
// //                 </div>
// //               </DialogContent>
// //             </Dialog>
// //           </DropdownMenuContent>
// //         </DropdownMenu>
        
// //       );
// //     },
// //   },
// // ];

// "use client";

// import { useState } from "react";
// import { ColumnDef } from "@tanstack/react-table";
// import { ArrowUpDown, CheckCircle2Icon, CircleX, MoreHorizontal, Trash2, MapPin } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import Link from "next/link";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { updateShipmentStatus } from "@/app/_action/update-package";
// import { updateDeliveryDate } from "@/app/_action/upade-delivery-date";
// import { deletePackage } from "@/app/_action/delete-package";
// import { updatePackageStage } from "@/app/_action/update-stage";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { Calendar } from "@/components/ui/calendar";

// import { format, parseISO, isValid } from "date-fns";

// export type Shipment = {
//   id: string;
//   user_id: string;
//   tracking_id: string;
//   sender: string | null;
//   receiver: string | null;
//   package_type: string | null;
//   status: string | null;
//   origin: string | null;
//   destination: string | null;
//   delivery_date: string | null;
// };

// export const columns: ColumnDef<Shipment>[] = [
//   {
//     accessorKey: "tracking_id",
//     header: "Tracking Id",
//   },
//   {
//     accessorKey: "sender",
//     header: "Sender",
//   },
//   {
//     accessorKey: "receiver",
//     header: "Receiver",
//   },
//   {
//     accessorKey: "delivery_date",
//     header: "Delivery Date",
//     cell: ({ row }) => {
//       const shipment = row.original;
//       if (shipment.delivery_date) {
//         const date = parseISO(shipment.delivery_date);
//         if (isValid(date)) {
//           return format(date, "yyyy-MM-dd");
//         }
//       }
//       return "TBD";
//     },
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//   },
//   {
//     accessorKey: "package_type",
//     header: "Package Type",
//   },
//   {
//     accessorKey: "origin",
//     header: "Origin",
//   },
//   {
//     accessorKey: "destination",
//     header: "Destination",
//   },
//   {
//     id: "actions",
//     cell: ({ row }) => {
//       const shipment = row.original;
//       const [isUpdateStageOpen, setIsUpdateStageOpen] = useState(false);
//       const [newStageLocation, setNewStageLocation] = useState("");
//       const [isStatusOpen, setIsStatusOpen] = useState(false);
//       const [isDateOpen, setIsDateOpen] = useState(false);
//       const [isDeleteOpen, setIsDeleteOpen] = useState(false);
//       const [newStatus, setNewStatus] = useState(shipment.status || "");
//       const [newDate, setNewDate] = useState<Date | undefined>(() => {
//         if (shipment.delivery_date) {
//           const date = parseISO(shipment.delivery_date);
//           return isValid(date) ? date : undefined;
//         }
//         return undefined;
//       });
//       const router = useRouter();

//       const handleStatusUpdate = async () => {
//         const result = await updateShipmentStatus(shipment.tracking_id, newStatus);
//         if (result.success) {
//           toast(
//             <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
//               <CheckCircle2Icon className="size-4 text-green-500" />
//               Package status updated successfully
//             </p>
//           );
//           setIsStatusOpen(false);
//         } else {
//           toast(
//             <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
//               <CircleX className="size-4 text-red-500" />
//               Unsuccessful status update
//             </p>
//           );
//         }
//         router.refresh();
//       };

//       const handleDateUpdate = async () => {
//         if (newDate && isValid(newDate)) {
//           const dateString = format(newDate, "yyyy-MM-dd");
//           const result = await updateDeliveryDate(shipment.tracking_id, dateString);
//           if (result.success) {
//             toast(
//               <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
//                 <CheckCircle2Icon className="size-4 text-green-500" />
//                 Delivery date updated successfully
//               </p>
//             );
//             setIsDateOpen(false);
//           } else {
//             toast(
//               <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
//                 <CircleX className="size-4 text-red-500" />
//                 Unsuccessful date update
//               </p>
//             );
//           }
//         } else if (newDate === undefined) {
//           const result = await updateDeliveryDate(shipment.tracking_id, "");
//           if (result.success) {
//             toast(
//               <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
//                 <CheckCircle2Icon className="size-4 text-green-500" />
//                 Delivery date cleared successfully
//               </p>
//             );
//             setIsDateOpen(false);
//           } else {
//             toast(
//               <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
//                 <CircleX className="size-4 text-red-500" />
//                 Unsuccessful date clear
//               </p>
//             );
//           }
//         } else {
//           toast(
//             <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
//               <CircleX className="size-4 text-red-500" />
//               Invalid date selected
//             </p>
//           );
//         }
//         router.refresh();
//       };

//       const handleDelete = async () => {
//         const result = await deletePackage(shipment.tracking_id);
//         if (result.success) {
//           toast(
//             <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
//               <CheckCircle2Icon className="size-4 text-green-500" />
//               Package deleted successfully
//             </p>
//           );
//           setIsDeleteOpen(false);
//         } else {
//           toast(
//             <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
//               <CircleX className="size-4 text-red-500" />
//               Failed to delete package
//             </p>
//           );
//         }
//         router.refresh();
//       };

//       const handleUpdateStage = async () => {
//         try {
//           await updatePackageStage(shipment.tracking_id, newStageLocation);
//           setIsUpdateStageOpen(false);
//           toast(
//             <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
//               <CheckCircle2Icon className="size-4 text-green-500" />
//               Package stage updated successfully
//             </p>
//           );
//         } catch (error) {
//           console.error("Failed to update package stage:", error);
//           toast(
//             <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
//               <CircleX className="size-4 text-red-500" />
//               Failed to update package stage
//             </p>
//           );
//         }
//         router.refresh();
//       };

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuItem
//               onClick={() => navigator.clipboard.writeText(shipment.tracking_id)}
//             >
//               Copy tracking ID
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <Link href={`/admin-dashboard/${shipment.tracking_id}`}>
//               <DropdownMenuItem>View Package</DropdownMenuItem>
//             </Link>
//             <Dialog open={isStatusOpen} onOpenChange={setIsStatusOpen}>
//               <DialogTrigger asChild>
//                 <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
//                   Update Status
//                 </DropdownMenuItem>
//               </DialogTrigger>
//               <DialogContent className="sm:max-w-[425px]">
//                 <DialogHeader>
//                   <DialogTitle>Update Shipment Status</DialogTitle>
//                   <DialogDescription>
//                     Change the current status of the shipment.
//                   </DialogDescription>
//                 </DialogHeader>
//                 <div className="grid gap-4 py-4">
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="status" className="text-right">
//                       Status
//                     </Label>
//                     <Select value={newStatus} onValueChange={setNewStatus}>
//                       <SelectTrigger className="col-span-3">
//                         <SelectValue placeholder="Select new status" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="pending">Pending</SelectItem>
//                         <SelectItem value="in transit">In Transit</SelectItem>
//                         <SelectItem value="delivered">Delivered</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>
//                 <DialogFooter>
//                   <Button onClick={handleStatusUpdate}>Update Status</Button>
//                 </DialogFooter>
//               </DialogContent>
//             </Dialog>
//             <Dialog open={isDateOpen} onOpenChange={setIsDateOpen}>
//               <DialogTrigger asChild>
//                 <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
//                   Update Delivery Date
//                 </DropdownMenuItem>
//               </DialogTrigger>
//               <DialogContent className="sm:max-w-[425px]">
//                 <DialogHeader>
//                   <DialogTitle>Update Delivery Date</DialogTitle>
//                   <DialogDescription>
//                     Set a new delivery date for the shipment.
//                   </DialogDescription>
//                 </DialogHeader>
//                 <div className="grid gap-4 py-4">
//                   <Calendar
//                     mode="single"
//                     selected={newDate}
//                     onSelect={(date) => setNewDate(date)}
//                     className="rounded-md border"
//                   />
//                 </div>
//                 <DialogFooter>
//                   <Button onClick={handleDateUpdate}>Update Delivery Date</Button>
//                 </DialogFooter>
//               </DialogContent>
//             </Dialog>
//             <Dialog open={isUpdateStageOpen} onOpenChange={setIsUpdateStageOpen}>
//               <DialogTrigger asChild>
//                 <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
//                   Update Stage
//                 </DropdownMenuItem>
//               </DialogTrigger>
//               <DialogContent className="sm:max-w-[425px]">
//                 <DialogHeader>
//                   <DialogTitle>Update Package Stage</DialogTitle>
//                   <DialogDescription>
//                     Enter the new location to update the package's current stage.
//                   </DialogDescription>
//                 </DialogHeader>
//                 <div className="grid gap-4 py-4">
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="location" className="text-right">
//                       Location
//                     </Label>
//                     <Input
//                       id="location"
//                       placeholder="Enter new location"
//                       value={newStageLocation}
//                       onChange={(e) => setNewStageLocation(e.target.value)}
//                       className="col-span-3"
//                     />
//                   </div>
//                 </div>
//                 <DialogFooter>
//                   <Button onClick={handleUpdateStage}>Update Stage</Button>
//                 </DialogFooter>
//               </DialogContent>
//             </Dialog>
//             <DropdownMenuSeparator />
//             <Link href={`/admin-support/${shipment.user_id}`}>
//               <DropdownMenuItem>Chat Customer</DropdownMenuItem>
//             </Link>
//             <DropdownMenuSeparator />
//             <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
//               <DialogTrigger asChild>
//                 <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
//                   <span className="flex items-center text-red-500">
//                     <Trash2 className="mr-2 h-4 w-4" />
//                     Delete Package
//                   </span>
//                 </DropdownMenuItem>
//               </DialogTrigger>
//               <DialogContent className="sm:max-w-[425px]">
//                 <DialogHeader>
//                   <DialogTitle>Delete Package</DialogTitle>
//                   <DialogDescription>
//                     Are you sure you want to delete this package? This action cannot be undone.
//                   </DialogDescription>
//                 </DialogHeader>
//                 <DialogFooter>
//                   <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
//                     Cancel
//                   </Button>
//                   <Button variant="destructive" onClick={handleDelete}>
//                     Delete
//                   </Button>
//                 </DialogFooter>
//               </DialogContent>
//             </Dialog>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
// ];

// "use client";

// import { useState, useEffect } from "react";
// import { ColumnDef } from "@tanstack/react-table";
// import { ArrowUpDown, CheckCircle2Icon, CircleX, MoreHorizontal, Trash2, MapPin } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import Link from "next/link";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { updateShipmentStatus } from "@/app/_action/update-package";
// import { updateDeliveryDate } from "@/app/_action/upade-delivery-date";
// import { deletePackage } from "@/app/_action/delete-package";
// import { updatePackageStage } from "@/app/_action/update-stage";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { Calendar } from "@/components/ui/calendar";
// import { format, parseISO, isValid } from "date-fns";
// import { stageEnums } from "@/src/db/schema";

// export type Shipment = {
//   id: string;
//   user_id: string;
//   tracking_id: string;
//   sender: string | null;
//   receiver: string | null;
//   package_type: string | null;
//   status: string | null;
//   origin: string | null;
//   destination: string | null;
//   delivery_date: string | null;
//   stage1IsCompleted: boolean | null;
//   stage2IsCompleted: boolean | null;
//   stage3IsCompleted: boolean | null;
//   stage4IsCompleted: boolean | null;
//   stage5IsCompleted: boolean | null;
//   stage6IsCompleted: boolean | null;

// };

// export const columns: ColumnDef<Shipment>[] = [
//   {
//     accessorKey: "tracking_id",
//     header: "Tracking Id",
//   },
//   {
//     accessorKey: "sender",
//     header: "Sender",
//   },
//   {
//     accessorKey: "receiver",
//     header: "Receiver",
//   },
//   {
//     accessorKey: "delivery_date",
//     header: "Delivery Date",
//     cell: ({ row }) => {
//       const shipment = row.original;
//       if (shipment.delivery_date) {
//         const date = parseISO(shipment.delivery_date);
//         if (isValid(date)) {
//           return format(date, "yyyy-MM-dd");
//         }
//       }
//       return "TBD";
//     },
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//   },
//   {
//     accessorKey: "package_type",
//     header: "Package Type",
//   },
//   {
//     accessorKey: "origin",
//     header: "Origin",
//   },
//   {
//     accessorKey: "destination",
//     header: "Destination",
//   },
//   {
//     id: "actions",
//     cell: ({ row }) => {
//       const shipment = row.original;
//       const [isUpdateStageOpen, setIsUpdateStageOpen] = useState(false);
//       const [newStageLocation, setNewStageLocation] = useState("");
//       const [isStatusOpen, setIsStatusOpen] = useState(false);
//       const [isDateOpen, setIsDateOpen] = useState(false);
//       const [isDeleteOpen, setIsDeleteOpen] = useState(false);
//       const [newStatus, setNewStatus] = useState(shipment.status || "");
//       const [newDate, setNewDate] = useState<Date | undefined>(() => {
//         if (shipment.delivery_date) {
//           const date = parseISO(shipment.delivery_date);
//           return isValid(date) ? date : undefined;
//         }
//         return undefined;
//       });
//       const [currentStage, setCurrentStage] = useState<string | null>(null);
//       const router = useRouter();

//       useEffect(() => {
//         const stages = ['stage1', 'stage2', 'stage3', 'stage4', 'stage5', 'stage6'];
//         const currentStage = stages.find(stage => !shipment[`${stage}IsCompleted`]);
//         setCurrentStage(currentStage || 'stage6');
//       }, [shipment]);

//       const handleStatusUpdate = async () => {
//         const result = await updateShipmentStatus(shipment.tracking_id, newStatus);
//         if (result.success) {
//           toast(
//             <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
//               <CheckCircle2Icon className="size-4 text-green-500" />
//               Package status updated successfully
//             </p>
//           );
//           setIsStatusOpen(false);
//         } else {
//           toast(
//             <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
//               <CircleX className="size-4 text-red-500" />
//               Unsuccessful status update
//             </p>
//           );
//         }
//         router.refresh();
//       };

//       const handleDateUpdate = async () => {
//         if (newDate && isValid(newDate)) {
//           const dateString = format(newDate, "yyyy-MM-dd");
//           const result = await updateDeliveryDate(shipment.tracking_id, dateString);
//           if (result.success) {
//             toast(
//               <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
//                 <CheckCircle2Icon className="size-4 text-green-500" />
//                 Delivery date updated successfully
//               </p>
//             );
//             setIsDateOpen(false);
//           } else {
//             toast(
//               <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
//                 <CircleX className="size-4 text-red-500" />
//                 Unsuccessful date update
//               </p>
//             );
//           }
//         } else if (newDate === undefined) {
//           const result = await updateDeliveryDate(shipment.tracking_id, "");
//           if (result.success) {
//             toast(
//               <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
//                 <CheckCircle2Icon className="size-4 text-green-500" />
//                 Delivery date cleared successfully
//               </p>
//             );
//             setIsDateOpen(false);
//           } else {
//             toast(
//               <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
//                 <CircleX className="size-4 text-red-500" />
//                 Unsuccessful date clear
//               </p>
//             );
//           }
//         } else {
//           toast(
//             <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
//               <CircleX className="size-4 text-red-500" />
//               Invalid date selected
//             </p>
//           );
//         }
//         router.refresh();
//       };

//       const handleDelete = async () => {
//         const result = await deletePackage(shipment.tracking_id);
//         if (result.success) {
//           toast(
//             <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
//               <CheckCircle2Icon className="size-4 text-green-500" />
//               Package deleted successfully
//             </p>
//           );
//           setIsDeleteOpen(false);
//         } else {
//           toast(
//             <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
//               <CircleX className="size-4 text-red-500" />
//               Failed to delete package
//             </p>
//           );
//         }
//         router.refresh();
//       };

//       const handleUpdateStage = async () => {
//         try {
//           await updatePackageStage(shipment.tracking_id, newStageLocation);
//           setIsUpdateStageOpen(false);
//           toast(
//             <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
//               <CheckCircle2Icon className="size-4 text-green-500" />
//               Package stage updated successfully
//             </p>
//           );
//         } catch (error) {
//           console.error("Failed to update package stage:", error);
//           toast(
//             <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
//               <CircleX className="size-4 text-red-500" />
//               Failed to update package stage
//             </p>
//           );
//         }
//         router.refresh();
//       };

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuItem
//               onClick={() => navigator.clipboard.writeText(shipment.tracking_id)}
//             >
//               Copy tracking ID
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <Link href={`/admin-dashboard/${shipment.tracking_id}`}>
//               <DropdownMenuItem>View Package</DropdownMenuItem>
//             </Link>
//             <Dialog open={isStatusOpen} onOpenChange={setIsStatusOpen}>
//               <DialogTrigger asChild>
//                 <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
//                   Update Status
//                 </DropdownMenuItem>
//               </DialogTrigger>
//               <DialogContent className="sm:max-w-[425px]">
//                 <DialogHeader>
//                   <DialogTitle>Update Shipment Status</DialogTitle>
//                   <DialogDescription>
//                     Change the current status of the shipment.
//                   </DialogDescription>
//                 </DialogHeader>
//                 <div className="grid gap-4 py-4">
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="status" className="text-right">
//                       Status
//                     </Label>
//                     <Select value={newStatus} onValueChange={setNewStatus}>
//                       <SelectTrigger className="col-span-3">
//                         <SelectValue placeholder="Select new status" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="pending">Pending</SelectItem>
//                         <SelectItem value="in transit">In Transit</SelectItem>
//                         <SelectItem value="delivered">Delivered</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>
//                 <DialogFooter>
//                   <Button onClick={handleStatusUpdate}>Update Status</Button>
//                 </DialogFooter>
//               </DialogContent>
//             </Dialog>
//             <Dialog open={isDateOpen} onOpenChange={setIsDateOpen}>
//               <DialogTrigger asChild>
//                 <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
//                   Update Delivery Date
//                 </DropdownMenuItem>
//               </DialogTrigger>
//               <DialogContent className="sm:max-w-[425px]">
//                 <DialogHeader>
//                   <DialogTitle>Update Delivery Date</DialogTitle>
//                   <DialogDescription>
//                     Set a new delivery date for the shipment.
//                   </DialogDescription>
//                 </DialogHeader>
//                 <div className="grid gap-4 py-4">
//                   <Calendar
//                     mode="single"
//                     selected={newDate}
//                     onSelect={(date) => setNewDate(date)}
//                     className="rounded-md border"
//                   />
//                 </div>
//                 <DialogFooter>
//                   <Button onClick={handleDateUpdate}>Update Delivery Date</Button>
//                 </DialogFooter>
//               </DialogContent>
//             </Dialog>
//             <Dialog open={isUpdateStageOpen} onOpenChange={setIsUpdateStageOpen}>
//               <DialogTrigger asChild>
//                 <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
//                   Update Stage
//                 </DropdownMenuItem>
//               </DialogTrigger>
//               <DialogContent className="sm:max-w-[425px]">
//                 <DialogHeader>
//                   <DialogTitle>Update Package Stage</DialogTitle>
//                   <DialogDescription>
//                     Current stage: {currentStage && stageEnums[currentStage as keyof typeof stageEnums]}
//                   </DialogDescription>
//                 </DialogHeader>
//                 <div className="grid gap-4 py-4">
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="location" className="text-right">
//                       New Location
//                     </Label>
//                     <Input
//                       id="location"
//                       placeholder="Enter new location"
//                       value={newStageLocation}
//                       onChange={(e) => setNewStageLocation(e.target.value)}
//                       className="col-span-3"
//                     />
//                   </div>
//                 </div>
//                 <DialogFooter>
//                   <Button onClick={handleUpdateStage}>Update Stage</Button>
//                 </DialogFooter>
//               </DialogContent>
//             </Dialog>
//             <DropdownMenuSeparator />
//             <Link href={`/admin-support/${shipment.user_id}`}>
//               <DropdownMenuItem>Chat Customer</DropdownMenuItem>
//             </Link>
//             <DropdownMenuSeparator />
//             <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
//               <DialogTrigger asChild>
//                 <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
//                   <span className="flex items-center text-red-500">
//                     <Trash2 className="mr-2 h-4 w-4" />
//                     Delete Package
//                   </span>
//                 </DropdownMenuItem>
//               </DialogTrigger>
//               <DialogContent className="sm:max-w-[425px]">
//                 <DialogHeader>
//                   <DialogTitle>Delete Package</DialogTitle>
//                   <DialogDescription>
//                     Are you sure you want to delete this package? This action cannot be undone.
//                   </DialogDescription>
//                 </DialogHeader>
//                 <DialogFooter>
//                   <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
//                     Cancel
//                   </Button>
//                   <Button variant="destructive" onClick={handleDelete}>
//                     Delete
//                   </Button>
//                 </DialogFooter>
//               </DialogContent>
//             </Dialog>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
// ];




"use client";

import { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CheckCircle2Icon, CircleX, MoreHorizontal, Trash2, MapPin } from "lucide-react";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
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
import { stageEnums } from "@/src/db/schema";

export type Shipment = {
  id: string;
  user_id: string;
  tracking_id: string;
  sender: string | null;
  receiver: string | null;
  package_type: string | null;
  status: string | null;
  origin: string | null;
  destination: string | null;
  delivery_date: string | null;
  stage1IsCompleted: boolean | null;
  stage2IsCompleted: boolean | null;
  stage3IsCompleted: boolean | null;
  stage4IsCompleted: boolean | null;
  stage5IsCompleted: boolean | null;
  stage6IsCompleted: boolean | null;
};

type StageKey = 'stage1IsCompleted' | 'stage2IsCompleted' | 'stage3IsCompleted' | 
                'stage4IsCompleted' | 'stage5IsCompleted' | 'stage6IsCompleted';

const getCurrentStage = (shipment: Shipment): string => {
  const stages: StageKey[] = [
    'stage1IsCompleted',
    'stage2IsCompleted',
    'stage3IsCompleted',
    'stage4IsCompleted',
    'stage5IsCompleted',
    'stage6IsCompleted'
  ];
  
  const currentStageKey = stages.find(stage => !shipment[stage]) || 'stage6IsCompleted';
  return currentStageKey.replace('IsCompleted', '');
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
      const [currentStage, setCurrentStage] = useState<string>('stage1');
      const router = useRouter();

      useEffect(() => {
        setCurrentStage(getCurrentStage(shipment));
      }, [shipment]);

      const handleStatusUpdate = async () => {
        const result = await updateShipmentStatus(shipment.tracking_id, newStatus);
        if (result.success) {
          toast(
            <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
              <CheckCircle2Icon className="size-4 text-green-500" />
              Package status updated successfully
            </p>
          );
          setIsStatusOpen(false);
        } else {
          toast(
            <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
              <CircleX className="size-4 text-red-500" />
              Unsuccessful status update
            </p>
          );
        }
        router.refresh();
      };

      const handleDateUpdate = async () => {
        if (newDate && isValid(newDate)) {
          const dateString = format(newDate, "yyyy-MM-dd");
          const result = await updateDeliveryDate(shipment.tracking_id, dateString);
          if (result.success) {
            toast(
              <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
                <CheckCircle2Icon className="size-4 text-green-500" />
                Delivery date updated successfully
              </p>
            );
            setIsDateOpen(false);
          } else {
            toast(
              <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
                <CircleX className="size-4 text-red-500" />
                Unsuccessful date update
              </p>
            );
          }
        } else if (newDate === undefined) {
          const result = await updateDeliveryDate(shipment.tracking_id, "");
          if (result.success) {
            toast(
              <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
                <CheckCircle2Icon className="size-4 text-green-500" />
                Delivery date cleared successfully
              </p>
            );
            setIsDateOpen(false);
          } else {
            toast(
              <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
                <CircleX className="size-4 text-red-500" />
                Unsuccessful date clear
              </p>
            );
          }
        } else {
          toast(
            <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
              <CircleX className="size-4 text-red-500" />
              Invalid date selected
            </p>
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
            </p>
          );
          setIsDeleteOpen(false);
        } else {
          toast(
            <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
              <CircleX className="size-4 text-red-500" />
              Failed to delete package
            </p>
          );
        }
        router.refresh();
      };

      const handleUpdateStage = async () => {
        try {
          await updatePackageStage(shipment.tracking_id, newStageLocation);
          setIsUpdateStageOpen(false);
          toast(
            <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
              <CheckCircle2Icon className="size-4 text-green-500" />
              Package stage updated successfully
            </p>
          );
        } catch (error) {
          console.error("Failed to update package stage:", error);
          toast(
            <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
              <CircleX className="size-4 text-red-500" />
              Failed to update package stage
            </p>
          );
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
              onClick={() => navigator.clipboard.writeText(shipment.tracking_id)}
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
              <DialogContent className="sm:max-w-[425px]">
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
                  <Button onClick={handleDateUpdate}>Update Delivery Date</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog open={isUpdateStageOpen} onOpenChange={setIsUpdateStageOpen}>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Update Stage
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Update Package Stage</DialogTitle>
                  <DialogDescription>
                    Current stage: {stageEnums[currentStage as keyof typeof stageEnums]}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right">
                      New Location
                    </Label>
                    <Input
                      id="location"
                      placeholder="Enter new location"
                      value={newStageLocation}
                      onChange={(e) => setNewStageLocation(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleUpdateStage}>Update Stage</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <DropdownMenuSeparator />
            <Link href={`/admin-support/${shipment.user_id}`}>
              <DropdownMenuItem>Chat Customer</DropdownMenuItem>
            </Link>
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
                    Are you sure you want to delete this package? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
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