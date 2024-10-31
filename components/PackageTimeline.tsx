"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { CheckCircle2, Circle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"

const formSchema = z.object({
  trackingNumber: z.string().min(1, "Tracking number is required"),
})

type Stage = {
  name: string;
  isCompleted: boolean;
  location: string | null;
  time: string | null;
};

type PackageData = {
  id: string;
  tracking_number: string;
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
};

const stageNames = [
  "Shipping label created, SSL awaiting item",
  "Accepted by SSL regional destination facility",
  "Arrived at SSL regional destination facility",
  "Departed SSL regional destination facility",
  "In transit",
  "Arrived at SSL regional destination facility",
  "Delivered"
];

export default function PackageTimeline() {
  const [packageData, setPackageData] = useState<PackageData | null>(null)
  const [loading, setLoading] = useState(false)
  const [currentStage, setCurrentStage] = useState(0)
  const [isUpdateStageOpen, setIsUpdateStageOpen] = useState(false)
  const [newStageLocation, setNewStageLocation] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      trackingNumber: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/package?trackingNumber=${values.trackingNumber}`)
      if (response.ok) {
        const data: PackageData = await response.json()
        setPackageData(data)
        const stages: Stage[] = stageNames.map((name, index) => ({
          name,
          isCompleted: data[`stage${index + 1}IsCompleted` as keyof PackageData] as boolean,
          location: data[`stage${index + 1}Location` as keyof PackageData] as string | null,
          time: data[`stage${index + 1}Time` as keyof PackageData] as string | null,
        }))
        setCurrentStage(stages.findIndex(stage => !stage.isCompleted))
        toast.success("Package found!")
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || "Failed to fetch package information")
      }
    } catch (error) {
      console.error("Error fetching package:", error)
      toast.error("An error occurred while fetching the package information.")
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Package Timeline</h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-8">
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
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Tracking Number: {packageData.tracking_number}</h2>
          <div className="space-y-4">
            {stageNames.map((name, index) => (
              <div key={index} className="flex items-start space-x-4 ">
                <div className="flex-shrink-0">
                  {packageData[`stage${index + 1}IsCompleted` as keyof PackageData] ? (
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  ) : (
                    <Circle className="h-6 w-6 text-gray-300" />
                  )}
                </div>
                <div className="flex-grow">
                  <p className="font-medium">{name}</p>
                  {packageData[`stage${index + 1}IsCompleted` as keyof PackageData] && (
                    <p className="text-sm text-gray-500">
                      {packageData[`stage${index + 1}Location` as keyof PackageData]} - {
                        packageData[`stage${index + 1}Time` as keyof PackageData] &&
                        format(new Date(packageData[`stage${index + 1}Time` as keyof PackageData] as string), "PPpp")
                      }
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

   
        </div>
      )}
    </div>
  )
}

