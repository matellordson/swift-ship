import { Calendar, CheckCircle, CheckCircle2, Circle } from "lucide-react";
import SmartSupp from "./smartsupp";
import Link from "next/link";

export default function TrackShipemt() {
  return (
    <div className="">
       <nav className="mb-14 border-b bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center">
                  <svg
                    className="h-8 w-8 text-black dark:text-white"
                    viewBox="0 0 76 65"
                    fill="currentColor"
                  >
                    <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                  </svg>
                  <span className="ml-2 text-xl font-bold">Vercel</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="mx-auto max-w-5xl gap-x-20 lg:flex">
        <Timeline />
        <Details />
        <SmartSupp />
      </div>
        <footer className="border-t">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SwiftShip. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

type TrackingEvent = {
  title: string;
  location: string;
  timestamp: string;
  isCompleted: boolean;
};

function Timeline() {
  const trackingEvents: TrackingEvent[] = [
    {
      title: "Delivered, In/At Mailbox",
      location: "BRIDGETON, NJ 08302",
      timestamp: "September 28, 2024, 5:13 pm",
      isCompleted: true,
    },
    {
      title: "Out for Delivery",
      location: "BRIDGETON, NJ 08302",
      timestamp: "September 28, 2024, 8:10 am",
      isCompleted: true,
    },
    {
      title: "Arrived at Post Office",
      location: "BRIDGETON, NJ 08302",
      timestamp: "September 28, 2024, 5:31 am",
      isCompleted: true,
    },
    {
      title: "Arrived at USPS Facility",
      location: "BRIDGETON, NJ 08302",
      timestamp: "September 28, 2024, 4:12 am",
      isCompleted: true,
    },
    {
      title: "Departed USPS Regional Facility",
      location: "SOUTH JERSEY NJ DISTRIBUTION CENTER",
      timestamp: "September 28, 2024, 2:34 am",
      isCompleted: true,
    },
    {
      title: "Arrived at USPS Regional Destination Facility",
      location: "SOUTH JERSEY NJ DISTRIBUTION CENTER",
      timestamp: "September 27, 2024, 4:05 pm",
      isCompleted: false,
    },
    {
      title: "Accepted at USPS Regional Destination Facility",
      location: "SOUTH JERSEY NJ DISTRIBUTION CENTER",
      timestamp: "September 27, 2024, 3:47 pm",
      isCompleted: false,
    },
    {
      title: "Shipping Label Created, USPS Awaiting Item",
      location: "SPRINGFIELD GARDENS, NY 11413",
      timestamp: "September 20, 2024, 11:30 pm",
      isCompleted: false,
    },
  ];

  return (
    <div className="mx-auto max-w-md rounded-xl bg-background p-6">
      <div className="relative space-y-4">
        <div className="absolute bottom-2 left-[9px] top-2 z-0 w-0.5 bg-border"></div>
        {trackingEvents.map((event, index) => (
          <div key={index} className="relative z-20 flex items-start">
            <div className="mr-4 flex flex-col items-center">
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full ${
                  event.isCompleted
                    ? "bg-green-500"
                    : "border-2 border-border bg-background"
                }`}
              >
                {event.isCompleted ? (
                  <CheckCircle className="h-4 w-4 text-background" />
                ) : (
                  <Circle className="h-3 w-3 text-border" />
                )}
              </div>
            </div>
            <div className="flex-1">
              <h3
                className={`font-medium ${event.isCompleted ? "text-green-500" : "text-foreground"}`}
              >
                {event.title}
              </h3>
              <p className="text-sm text-muted-foreground">{event.location}</p>
              <p className="text-xs text-muted-foreground/70">
                {event.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Details() {
  type PackageInfo = {
    sender_full_name: string;
    sender_email: string;
    sender_phone_number: string;
    sender_country: string;
    sender_city: string;
    sender_address: string;
    receiver_full_name: string;
    receiver_email: string;
    receiver_phone_number: string;
    receiver_country: string;
    receiver_city: string;
    receiver_address: string;
    package_type: string;
    dimension: string;
    weight: string;
    description: string;
    tracking_number: string;
    status: string;
    delivery_date: string;
  };

  // This would typically come from an API or props
  const packageInfo: PackageInfo = {
    sender_full_name: "John Doe",
    sender_email: "john@example.com",
    sender_phone_number: "+1234567890",
    sender_country: "United States",
    sender_city: "New York",
    sender_address: "123 Sender St, NY 10001",
    receiver_full_name: "Jane Smith",
    receiver_email: "jane@example.com",
    receiver_phone_number: "+0987654321",
    receiver_country: "United States",
    receiver_city: "Los Angeles",
    receiver_address: "456 Receiver Ave, LA 90001",
    package_type: "Electronics",
    dimension: "12x10x8 inches",
    weight: "2.5 kg",
    description: "Fragile electronic equipment",
    tracking_number: "TRACK123456789",
    status: "In Transit",
    delivery_date: "2023-07-15",
  };

  return (
    <div className="mx-auto max-w-7xl bg-background p-6">
      <div className="mb-6 rounded-lg border bg-card p-6">
        <div className="mb-4">
          <h2 className="pb-2 text-xl font-semibold text-foreground">
            Tracking Number:{" "}
            <span className="text-muted-foreground">
              {packageInfo.tracking_number}
            </span>
          </h2>
          <span className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
            {packageInfo.status}
          </span>
        </div>
        <div className="flex items-center text-muted-foreground">
          <Calendar className="mr-2" />
          Expected Delivery: {packageInfo.delivery_date}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Package Details
          </h2>
          <ul className="text-sm leading-7 [&:not(:first-child)]:mt-1">
            <li>
              <strong>Type:</strong>{" "}
              <span className="text-sm text-muted-foreground">
                {packageInfo.package_type}
              </span>
            </li>
            <li>
              <strong>Dimensions:</strong>{" "}
              <span className="text-sm text-muted-foreground">
                {packageInfo.dimension}
              </span>
            </li>
            <li>
              <strong>Weight:</strong>
              <span className="text-sm text-muted-foreground">
                {packageInfo.weight}
              </span>
            </li>
            <li>
              <strong>Description:</strong>{" "}
              <span className="text-sm text-muted-foreground">
                {packageInfo.description}
              </span>
            </li>
          </ul>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Sender Information
          </h2>
          <ul className="leading-7 [&:not(:first-child)]:mt-1">
            <li>
              <strong>Name:</strong>{" "}
              <span className="text-sm text-muted-foreground">
                {packageInfo.sender_full_name}
              </span>
            </li>
            <li>
              <strong>Email:</strong>{" "}
              <span className="text-sm text-muted-foreground">
                {packageInfo.sender_email}
              </span>
            </li>
            <li>
              <strong>Phone:</strong>{" "}
              <span className="text-sm text-muted-foreground">
                {packageInfo.sender_phone_number}
              </span>
            </li>
            <li>
              <strong>Address:</strong>
              <span className="text-sm text-muted-foreground">
                {" "}
                {packageInfo.sender_address}, {packageInfo.sender_city},{" "}
                {packageInfo.sender_country}
              </span>
            </li>
          </ul>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Receiver Information
          </h2>
          <ul className="leading-7 [&:not(:first-child)]:mt-1">
            <li>
              <strong>Name:</strong>{" "}
              <span className="text-sm text-muted-foreground">
                {packageInfo.receiver_full_name}
              </span>
            </li>
            <li>
              <strong>Email:</strong>{" "}
              <span className="text-sm text-muted-foreground">
                {packageInfo.receiver_email}
              </span>
            </li>
            <li>
              <strong>Phone:</strong>{" "}
              <span className="text-sm text-muted-foreground">
                {packageInfo.receiver_phone_number}
              </span>
            </li>
            <li>
              <strong>Address:</strong>
              <span className="text-sm text-muted-foreground">
                {" "}
                {packageInfo.receiver_address}, {packageInfo.sender_city},{" "}
                {packageInfo.sender_country}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
