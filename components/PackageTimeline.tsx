"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import {
  CheckCircle2,
  Circle,
  Loader2,
  Package,
  User,
  Truck,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const formSchema = z.object({
  trackingNumber: z.string().min(1, "Tracking number is required"),
});

type Stage = {
  name: string;
  isCompleted: boolean;
  location: string | null;
  time: string | null;
};

type PackageData = {
  id: string;
  tracking_number: string;
  sender_full_name: string | null;
  sender_email: string | null;
  sender_phone_number: string | null;
  sender_country: string | null;
  sender_city: string | null;
  sender_address: string | null;
  receiver_full_name: string | null;
  receiver_email: string | null;
  receiver_phone_number: string | null;
  receiver_country: string | null;
  receiver_city: string | null;
  receiver_address: string | null;
  package_type: string | null;
  dimension: string | null;
  weight: string | null;
  description: string | null;
  status: string;
  delivery_date: string;
  stage1: string;
  stage1Location: string | null;
  stage1Time: string | null;
  stage1IsCompleted: boolean;
  stage2: string;
  stage2Location: string | null;
  stage2Time: string | null;
  stage2IsCompleted: boolean;
  stage3: string;
  stage3Location: string | null;
  stage3Time: string | null;
  stage3IsCompleted: boolean;
  stage4: string;
  stage4Location: string | null;
  stage4Time: string | null;
  stage4IsCompleted: boolean;
  stage5: string;
  stage5Location: string | null;
  stage5Time: string | null;
  stage5IsCompleted: boolean;
  stage6: string;
  stage6Location: string | null;
  stage6Time: string | null;
  stage6IsCompleted: boolean;
  stage7: string;
  stage7Location: string | null;
  stage7Time: string | null;
  stage7IsCompleted: boolean;
  stage8: string;
  stage8Location: string | null;
  stage8Time: string | null;
  stage8IsCompleted: boolean;
};

const stageNames = [
  "Shipping label created, SSS awaiting item",
  "Accepted by SSS regional destination facility",
  "Arrived at SSS regional destination facility",
  "Departed SSS regional destination facility",
  "In transit",
  "Arrived at SSS regional destination facility",
  "Out of delivery",
  "Delivered",
];

export default function PackageTimeline() {
  const [packageData, setPackageData] = useState<PackageData | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      trackingNumber: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/package?trackingNumber=${values.trackingNumber}`,
      );
      if (response.ok) {
        const data: PackageData = await response.json();
        setPackageData(data);
        const stages: Stage[] = stageNames.map((name, index) => ({
          name,
          isCompleted: data[
            `stage${index + 1}IsCompleted` as keyof PackageData
          ] as boolean,
          location: data[`stage${index + 1}Location` as keyof PackageData] as
            | string
            | null,
          time: data[`stage${index + 1}Time` as keyof PackageData] as
            | string
            | null,
        }));
        setCurrentStage(stages.findIndex((stage) => !stage.isCompleted));
        toast.success("Package found!");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to fetch package information");
      }
    } catch (error) {
      console.error("Error fetching package:", error);
      toast.error("An error occurred while fetching the package information.");
    } finally {
      setLoading(false);
    }
  };

  const formatValue = (value: string | null | undefined): string => {
    return value && value.trim() !== "" ? value : "N/A";
  };

  return (
    <div className="container mx-auto mb-5 max-w-3xl p-4">
      <h1 className="mb-6 text-2xl font-bold lg:text-3xl">Track Package</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8 space-y-4">
          <FormField
            control={form.control}
            name="trackingNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tracking Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter tracking number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Searching..." : "Track Package"}
          </Button>
        </form>
      </Form>

      {packageData && (
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="mr-2" />
                Package Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stageNames.map((name, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {packageData[
                        `stage${index + 1}IsCompleted` as keyof PackageData
                      ] ? (
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                      ) : (
                        <Circle className="h-6 w-6 text-gray-300" />
                      )}
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium">{name}</p>
                      {packageData[
                        `stage${index + 1}IsCompleted` as keyof PackageData
                      ] && (
                        <p className="text-sm text-muted-foreground">
                          {formatValue(
                            packageData[
                              `stage${index + 1}Location` as keyof PackageData
                            ] as string | null,
                          )}{" "}
                          -{" "}
                          {packageData[
                            `stage${index + 1}Time` as keyof PackageData
                          ]
                            ? format(
                                new Date(
                                  packageData[
                                    `stage${index + 1}Time` as keyof PackageData
                                  ] as string,
                                ),
                                "PPP",
                              )
                            : "N/A"}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2" />
                  Sender Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>
                    <strong>Name:</strong>{" "}
                    {formatValue(packageData.sender_full_name)}
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    {formatValue(packageData.sender_email)}
                  </p>
                  <p>
                    <strong>Phone:</strong>{" "}
                    {formatValue(packageData.sender_phone_number)}
                  </p>
                  <p>
                    <strong>Address:</strong>{" "}
                    {formatValue(packageData.sender_address)}
                  </p>
                  <p>
                    <strong>City:</strong>{" "}
                    {formatValue(packageData.sender_city)}
                  </p>
                  <p>
                    <strong>Country:</strong>{" "}
                    {formatValue(packageData.sender_country)}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2" />
                  Receiver Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>
                    <strong>Name:</strong>{" "}
                    {formatValue(packageData.receiver_full_name)}
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    {formatValue(packageData.receiver_email)}
                  </p>
                  <p>
                    <strong>Phone:</strong>{" "}
                    {formatValue(packageData.receiver_phone_number)}
                  </p>
                  <p>
                    <strong>Address:</strong>{" "}
                    {formatValue(packageData.receiver_address)}
                  </p>
                  <p>
                    <strong>City:</strong>{" "}
                    {formatValue(packageData.receiver_city)}
                  </p>
                  <p>
                    <strong>Country:</strong>{" "}
                    {formatValue(packageData.receiver_country)}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="mr-2" />
                  Package Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>
                    <strong>Type:</strong>{" "}
                    {formatValue(packageData.package_type)}
                  </p>
                  <p>
                    <strong>Dimensions:</strong>{" "}
                    {formatValue(packageData.dimension)}
                  </p>
                  <p>
                    <strong>Weight:</strong> {formatValue(packageData.weight)}
                  </p>
                  <p>
                    <strong>Description:</strong>{" "}
                    {formatValue(packageData.description)}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="mr-2" />
                  Shipping Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>
                    <strong>Status:</strong> {packageData.status}
                  </p>
                  <p>
                    <strong>Delivery Date:</strong> {packageData.delivery_date}
                  </p>
                  <p>
                    <strong>Tracking Number:</strong>{" "}
                    {packageData.tracking_number}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
