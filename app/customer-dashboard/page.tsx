import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { CheckCircle2Icon, Package, Ship } from "lucide-react";

export default function CustomerDashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-5 scroll-m-20 text-xl font-semibold tracking-tight">
        Your Shipping Packages
      </h1>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <Card className="">
          <CardHeader>
            <CardTitle className="max-w-[250px] truncate">
              Macbook Air For Mom
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold">Package ID:</p>
                <p className="text-sm">SwIFT J75H84G</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Estimated Delivery:</p>
                <p className="text-sm">2023-06-15</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Origin:</p>
                <p className="text-sm">San Francisco, CA</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Destination:</p>
                <p className="text-sm">New York, NY</p>
              </div>
            </div>
            <div>
              <div className="mt-5 flex w-full items-center justify-center rounded-full text-xs text-secondary-foreground">
                <Package size={20} />
                <div className="h-1 w-28 rounded-full bg-muted"></div>
                <Ship size={20} className="text-muted" />
                <div className="h-1 w-28 rounded-full bg-muted"></div>
                <CheckCircle2Icon size={20} className="text-muted" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="">
          <CardHeader>
            <CardTitle className="max-w-[250px] truncate">
              Macbook Air For Mom
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold">Package ID:</p>
                <p className="text-sm">SwIFT J75H84G</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Estimated Delivery:</p>
                <p className="text-sm">2023-06-15</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Origin:</p>
                <p className="text-sm">San Francisco, CA</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Destination:</p>
                <p className="text-sm">New York, NY</p>
              </div>
            </div>
            <div>
              <div className="mt-5 flex w-full items-center justify-center rounded-full text-xs text-secondary-foreground">
                <Package size={20} />
                <div className="h-1 w-28 rounded-full bg-muted"></div>
                <Ship size={20} className="text-muted" />
                <div className="h-1 w-28 rounded-full bg-muted"></div>
                <CheckCircle2Icon size={20} className="text-muted" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="">
          <CardHeader>
            <CardTitle className="max-w-[250px] truncate">
              Macbook Air For Mom
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold">Package ID:</p>
                <p className="text-sm">SwIFT J75H84G</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Estimated Delivery:</p>
                <p className="text-sm">2023-06-15</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Origin:</p>
                <p className="text-sm">San Francisco, CA</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Destination:</p>
                <p className="text-sm">New York, NY</p>
              </div>
            </div>
            <div>
              <div className="mt-5 flex w-full items-center justify-center rounded-full text-xs text-secondary-foreground">
                <Package size={20} />
                <div className="h-1 w-28 rounded-full bg-muted"></div>
                <Ship size={20} className="text-muted" />
                <div className="h-1 w-28 rounded-full bg-muted"></div>
                <CheckCircle2Icon size={20} className="text-muted" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="">
          <CardHeader>
            <CardTitle className="max-w-[250px] truncate">
              Macbook Air For Mom
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold">Package ID:</p>
                <p className="text-sm">SwIFT J75H84G</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Estimated Delivery:</p>
                <p className="text-sm">2023-06-15</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Origin:</p>
                <p className="text-sm">San Francisco, CA</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Destination:</p>
                <p className="text-sm">New York, NY</p>
              </div>
            </div>
            <div>
              <div className="mt-5 flex w-full items-center justify-center rounded-full text-xs text-secondary-foreground">
                <Package size={20} />
                <div className="h-1 w-28 rounded-full bg-muted"></div>
                <Ship size={20} className="text-muted" />
                <div className="h-1 w-28 rounded-full bg-muted"></div>
                <CheckCircle2Icon size={20} className="text-muted" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
