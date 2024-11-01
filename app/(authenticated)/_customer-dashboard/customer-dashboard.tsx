// // "use client";

// // import { useState, useCallback } from "react";
// // import { debounce } from "lodash";
// // import { PackageForm } from "@/components/new-package";
// // import { Card } from "@/components/ui/card";
// // import { Input } from "@/components/ui/input";
// // import { NoPackage } from "@/components/no-package";
// // import { filterPackages } from "../../_action/filter-package";
// // import { Loader } from "lucide-react";
// // import Link from "next/link";

// // interface Package {
// //   userId: string;
// //   created_at: Date | null;
// //   id: string;
// //   sender_full_name: string | null;
// //   sender_email: string | null;
// //   sender_phone_number: string | null;
// //   sender_country: string | null;
// //   sender_city: string | null;
// //   receiver_full_name: string | null;
// //   receiver_email: string | null;
// //   receiver_phone_number: string | null;
// //   receiver_country: string | null;
// //   receiver_city: string | null;
// //   tracking_number: string;
// //   package_type: string | null;
// //   weight: string | null;
// //   dimension: string | null;
// //   status: string | null;
// //   delivery_date: string | null;
// // }

// // interface CustomerDashboardProps {
// //   initialData: Package[];
// //   userId: string;
// // }

// // export default function CustomerDashboard({
// //   initialData,
// //   userId,
// // }: CustomerDashboardProps) {
// //   const [packages, setPackages] = useState<Package[]>(initialData);
// //   const [trackingFilter, setTrackingFilter] = useState("");
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [error, setError] = useState<string | null>(null);

// //   const debouncedFilterPackages = useCallback(
// //     debounce(async (userId: string, filterValue: string) => {
// //       setIsLoading(true);
// //       setError(null);
// //       try {
// //         const filteredData: Package[] = await filterPackages(
// //           userId,
// //           filterValue,
// //         );
// //         setPackages(filteredData);
// //       } catch (err) {
// //         setError(
// //           "An error occurred while filtering packages. Please try again.",
// //         );
// //         console.error(err);
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     }, 300),
// //     [],
// //   );

// //   const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const filterValue = e.target.value;
// //     setTrackingFilter(filterValue);
// //     debouncedFilterPackages(userId, filterValue);
// //   };

// //   if (packages.length === 0 && !trackingFilter) {
// //     return <NoPackage />;
// //   }

// //   return (
// //     <div className="container mx-auto px-4">
// //       <div className="flex w-full items-center justify-between">
// //         <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">
// //           Your Packages
// //         </h1>
// //         <PackageForm />
// //       </div>
// //       <Input
// //         className="mt-3 max-w-sm"
// //         placeholder="Filter tracking ID..."
// //         value={trackingFilter}
// //         onChange={handleFilterChange}
// //       />
// //       {isLoading && (
// //         <div className="mt-5 flex w-fit items-center justify-center gap-2">
// //           <Loader className="h-6 animate-spin" />
// //           <p>Filtering...</p>
// //         </div>
// //       )}
// //       {error && <p className="mt-4 text-red-500">{error}</p>}
// //       <div className="mb-14 mt-3 grid grid-cols-1 gap-3 lg:grid-cols-3">
// //       <Link href={"/track-shipment"} className="text-primary text-sm font-semibold lg:hidden">Track package</Link>
// //         {packages.map((pkg: Package) => (
// //           <Card className="p-4" key={pkg.id}>
// //             <div className="mb-4 grid grid-cols-2 gap-4">
// //               <div>
// //                 <p className="text-sm font-semibold">Tracking ID:</p>
// //                 <p className="text-sm text-muted-foreground">
// //                   {pkg.tracking_number}
// //                 </p>
// //               </div>
// //               <div>
// //                 <p className="text-sm font-semibold">Estimated Delivery:</p>
// //                 <p className="text-sm text-muted-foreground">
// //                   {pkg.delivery_date || "TBD"}
// //                 </p>
// //               </div>
// //               <div>
// //                 <p className="text-sm font-semibold">Origin:</p>
// //                 <p className="text-sm text-muted-foreground">
// //                   {pkg.sender_country || "N/A"}
// //                 </p>
// //               </div>
// //               <div>
// //                 <p className="text-sm font-semibold">Destination:</p>
// //                 <p className="text-sm text-muted-foreground">
// //                   {pkg.receiver_country || "N/A"}
// //                 </p>
// //               </div>
// //               <div>
// //                 <p className="text-sm font-semibold">Status:</p>
// //                 {pkg.status === "pending" ? (
// //                   <div className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
// //                     <div className="h-2 w-2 rounded-full bg-muted-foreground"></div>
// //                     Pending
// //                   </div>
// //                 ): pkg.status === "in progress" ? (
// //                   <div className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
// //                     <div className="h-2 w-2 rounded-full bg-orange-600"></div>
// //                     In Progress
// //                   </div>
// //                 ) : pkg.status === "in transit" ? (
// //                   <div className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
// //                     <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
// //                     In Transit
// //                   </div>
// //                 ) : pkg.status === "delivered" ? (
// //                   <div className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
// //                     <div className="h-2 w-2 rounded-full bg-green-300"></div>
// //                     Delivered
// //                   </div>
// //                 ) : (
// //                   ""
// //                 )}
// //               </div>
// //               <div>
// //                 <p className="text-sm font-semibold">Package Type:</p>
// //                 <p className="text-sm text-muted-foreground">
// //                   {pkg.package_type || "N/A"}
// //                 </p>
// //               </div>
// //             </div>
// //           </Card>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }


// "use client"

// import { useState, useCallback, useMemo } from "react"
// import { debounce } from "lodash"
// import { PackageForm } from "@/components/new-package"
// import { Card } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { NoPackage } from "@/components/no-package"
// import { filterPackages } from "../../_action/filter-package"
// import { Loader } from "lucide-react"
// import Link from "next/link"

// interface Package {
//   userId: string
//   created_at: Date | null
//   id: string
//   sender_full_name: string | null
//   sender_email: string | null
//   sender_phone_number: string | null
//   sender_country: string | null
//   sender_city: string | null
//   receiver_full_name: string | null
//   receiver_email: string | null
//   receiver_phone_number: string | null
//   receiver_country: string | null
//   receiver_city: string | null
//   tracking_number: string
//   package_type: string | null
//   weight: string | null
//   dimension: string | null
//   status: string | null
//   delivery_date: string | null
// }

// interface CustomerDashboardProps {
//   initialData: Package[]
//   userId: string
// }

// export default function CustomerDashboard({
//   initialData,
//   userId,
// }: CustomerDashboardProps) {
//   const [packages, setPackages] = useState<Package[]>(initialData)
//   const [trackingFilter, setTrackingFilter] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   const debouncedFilterPackages = useCallback(
//     debounce(async (userId: string, filterValue: string) => {
//       setIsLoading(true)
//       setError(null)
//       try {
//         const filteredData: Package[] = await filterPackages(
//           userId,
//           filterValue,
//         )
//         setPackages(filteredData)
//       } catch (err) {
//         setError(
//           "An error occurred while filtering packages. Please try again.",
//         )
//         console.error(err)
//       } finally {
//         setIsLoading(false)
//       }
//     }, 300),
//     [],
//   )

//   const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const filterValue = e.target.value
//     setTrackingFilter(filterValue)
//     debouncedFilterPackages(userId, filterValue)
//   }

//   const sortedPackages = useMemo(() => {
//     return [...packages].sort((a, b) => {
//       if (!a.created_at || !b.created_at) return 0
//       return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
//     })
//   }, [packages])

//   if (sortedPackages.length === 0 && !trackingFilter) {
//     return <NoPackage />
//   }

//   return (
//     <div className="container mx-auto px-4">
//       <div className="flex w-full items-center justify-between">
//         <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">
//           Your Packages
//         </h1>
//         <PackageForm />
//       </div>
//       <Input
//         className="mt-3 max-w-sm"
//         placeholder="Filter tracking ID..."
//         value={trackingFilter}
//         onChange={handleFilterChange}
//         aria-label="Filter packages by tracking ID"
//       />
//       {isLoading && (
//         <div className="mt-5 flex w-fit items-center justify-center gap-2" aria-live="polite">
//           <Loader className="h-6 animate-spin" aria-hidden="true" />
//           <p>Filtering...</p>
//         </div>
//       )}
//       {error && <p className="mt-4 text-red-500" aria-live="assertive">{error}</p>}
//       <div className="mb-14 mt-3 grid grid-cols-1 gap-3 lg:grid-cols-3">
//         <Link href="/track-shipment" className="text-primary text-sm font-semibold lg:hidden">
//           Track package
//         </Link>
//         {sortedPackages.map((pkg: Package) => (
//           <Card className="p-4" key={pkg.id}>
//             <div className="mb-4 grid grid-cols-2 gap-4">
//               <div>
//                 <p className="text-sm font-semibold">Tracking ID:</p>
//                 <p className="text-sm text-muted-foreground">
//                   {pkg.tracking_number}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm font-semibold">Estimated Delivery:</p>
//                 <p className="text-sm text-muted-foreground">
//                   {pkg.delivery_date || "TBD"}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm font-semibold">Origin:</p>
//                 <p className="text-sm text-muted-foreground">
//                   {pkg.sender_country || "N/A"}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm font-semibold">Destination:</p>
//                 <p className="text-sm text-muted-foreground">
//                   {pkg.receiver_country || "N/A"}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm font-semibold">Status:</p>
//                 {pkg.status === "pending" ? (
//                   <div className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
//                     <div className="h-2 w-2 rounded-full bg-muted-foreground" aria-hidden="true"></div>
//                     Pending
//                   </div>
//                 ) : pkg.status === "in progress" ? (
//                   <div className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
//                     <div className="h-2 w-2 rounded-full bg-orange-600" aria-hidden="true"></div>
//                     In Progress
//                   </div>
//                 ) : pkg.status === "in transit" ? (
//                   <div className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
//                     <div className="h-2 w-2 rounded-full bg-yellow-400" aria-hidden="true"></div>
//                     In Transit
//                   </div>
//                 ) : pkg.status === "delivered" ? (
//                   <div className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
//                     <div className="h-2 w-2 rounded-full bg-green-300" aria-hidden="true"></div>
//                     Delivered
//                   </div>
//                 ) : (
//                   ""
//                 )}
//               </div>
//               <div>
//                 <p className="text-sm font-semibold">Package Type:</p>
//                 <p className="text-sm text-muted-foreground">
//                   {pkg.package_type || "N/A"}
//                 </p>
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }

"use client"

import { useState, useCallback, useMemo } from "react"
import { debounce } from "lodash"
import { PackageForm } from "@/components/new-package"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { NoPackage } from "@/components/no-package"
import { filterPackages } from "../../_action/filter-package"
import { Loader } from "lucide-react"
import Link from "next/link"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Package {
  userId: string
  created_at: Date | null
  id: string
  sender_full_name: string | null
  sender_email: string | null
  sender_phone_number: string | null
  sender_country: string | null
  sender_city: string | null
  receiver_full_name: string | null
  receiver_email: string | null
  receiver_phone_number: string | null
  receiver_country: string | null
  receiver_city: string | null
  tracking_number: string
  package_type: string | null
  weight: string | null
  dimension: string | null
  status: string | null
  delivery_date: string | null
}

interface CustomerDashboardProps {
  initialData: Package[]
  userId: string
}

export default function CustomerDashboard({
  initialData,
  userId,
}: CustomerDashboardProps) {
  const [packages, setPackages] = useState<Package[]>(initialData)
  const [trackingFilter, setTrackingFilter] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const debouncedFilterPackages = useCallback(
    debounce(async (userId: string, filterValue: string) => {
      setIsLoading(true)
      setError(null)
      try {
        const filteredData: Package[] = await filterPackages(
          userId,
          filterValue,
        )
        setPackages(filteredData)
      } catch (err) {
        setError(
          "An error occurred while filtering packages. Please try again.",
        )
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }, 300),
    [],
  )

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = e.target.value
    setTrackingFilter(filterValue)
    debouncedFilterPackages(userId, filterValue)
  }

  const handleSortChange = (value: string) => {
    setSortOrder(value as "asc" | "desc")
  }

  const sortedPackages = useMemo(() => {
    return [...packages].sort((a, b) => {
      if (!a.created_at || !b.created_at) return 0
      const aTime = new Date(a.created_at).getTime()
      const bTime = new Date(b.created_at).getTime()
      return sortOrder === "asc" ? aTime - bTime : bTime - aTime
    })
  }, [packages, sortOrder])

  if (sortedPackages.length === 0 && !trackingFilter) {
    return <NoPackage />
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex w-full items-center justify-between">
        <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Your Packages
        </h1>
        <PackageForm />
      </div>
      <div className="mt-3 flex items-center gap-4">
        <Input
          className="max-w-sm"
          placeholder="Filter tracking ID..."
          value={trackingFilter}
          onChange={handleFilterChange}
          aria-label="Filter packages by tracking ID"
        />
        <Select onValueChange={handleSortChange} defaultValue={sortOrder}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Newest first</SelectItem>
            <SelectItem value="asc">Oldest first</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {isLoading && (
        <div className="mt-5 flex w-fit items-center justify-center gap-2" aria-live="polite">
          <Loader className="h-6 animate-spin" aria-hidden="true" />
          <p>Filtering...</p>
        </div>
      )}
      {error && <p className="mt-4 text-red-500" aria-live="assertive">{error}</p>}
      <div className="mb-14 mt-3 grid grid-cols-1 gap-3 lg:grid-cols-3">
        <Link href="/track-shipment" className="text-primary text-sm font-semibold lg:hidden">
          Track package
        </Link>
        {sortedPackages.map((pkg: Package) => (
          <Card className="p-4" key={pkg.id}>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold">Tracking ID:</p>
                <p className="text-sm text-muted-foreground">
                  {pkg.tracking_number}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold">Created At:</p>
                <p className="text-sm text-muted-foreground">
                  {pkg.created_at ? new Date(pkg.created_at).toLocaleDateString() : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold">Estimated Delivery:</p>
                <p className="text-sm text-muted-foreground">
                  {pkg.delivery_date || "TBD"}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold">Origin:</p>
                <p className="text-sm text-muted-foreground">
                  {pkg.sender_country || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold">Destination:</p>
                <p className="text-sm text-muted-foreground">
                  {pkg.receiver_country || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold">Status:</p>
                {pkg.status === "pending" ? (
                  <div className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground" aria-hidden="true"></div>
                    Pending
                  </div>
                ) : pkg.status === "in progress" ? (
                  <div className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-orange-600" aria-hidden="true"></div>
                    In Progress
                  </div>
                ) : pkg.status === "in transit" ? (
                  <div className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-yellow-400" aria-hidden="true"></div>
                    In Transit
                  </div>
                ) : pkg.status === "delivered" ? (
                  <div className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-green-300" aria-hidden="true"></div>
                    Delivered
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div>
                <p className="text-sm font-semibold">Package Type:</p>
                <p className="text-sm text-muted-foreground">
                  {pkg.package_type || "N/A"}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}