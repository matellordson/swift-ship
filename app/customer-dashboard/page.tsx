import { Card } from "@/components/ui/card";

export default function CustomerDashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-5 scroll-m-20 text-xl font-semibold tracking-tight">
        Your Shipping Packages
      </h1>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <Card className="p-4">
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold">Package ID:</p>
              <p className="text-sm text-muted-foreground">SwIFT J75H84G</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Estimated Delivery:</p>
              <p className="text-sm text-muted-foreground">2023-06-15</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Origin:</p>
              <p className="text-sm text-muted-foreground">San Francisco, CA</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Destination:</p>
              <p className="text-sm text-muted-foreground">New York, NY</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Status:</p>
              <div className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-orange-300"></div>
                Processing
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold">Package Type:</p>
              <p className="text-sm text-muted-foreground">Furniture</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
