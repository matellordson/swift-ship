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
import { getPackageByTrackingNumber, updatePackageStage } from "./queries"

const formSchema = z.object({
  trackingNumber: z.string().min(1, "Tracking number is required"),
})

type Stage = {
  name: string;
  isCompleted: boolean;
  location: string | null;
  time: string | null;
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
  const [packageData, setPackageData] = useState<{trackingNumber: string, stages: Stage[]} | null>(null)
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
      const packageInfo = await getPackageByTrackingNumber(values.trackingNumber)
      if (packageInfo) {
        const stages: Stage[] = stageNames.map((name, index) => ({
          name,
          isCompleted: packageInfo[`stage${index + 1}IsCompleted` as keyof typeof packageInfo] as boolean,
          location: packageInfo[`stage${index + 1}Location` as keyof typeof packageInfo] as string | null,
          time: packageInfo[`stage${index + 1}Time` as keyof typeof packageInfo] as string | null,
        }))
        setPackageData({ trackingNumber: values.trackingNumber, stages })
        setCurrentStage(stages.findIndex(stage => !stage.isCompleted))
        toast.success("Package found!")
      } else {
        toast.error("Package not found. Please check the tracking number.")
      }
    } catch (error) {
      console.error("Error fetching package:", error)
      toast.error("An error occurred while fetching the package information.")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStage = async () => {
    if (!packageData || currentStage >= packageData.stages.length) {
      toast.error("All stages are completed")
      return
    }

    setLoading(true)
    try {
      await updatePackageStage(packageData.trackingNumber, currentStage + 1, newStageLocation)
      
      const updatedStages = [...packageData.stages]
      updatedStages[currentStage] = {
        ...updatedStages[currentStage],
        isCompleted: true,
        location: newStageLocation,
        time: new Date().toISOString(),
      }

      setPackageData({ ...packageData, stages: updatedStages })
      setCurrentStage(currentStage + 1)
      setNewStageLocation("")
      setIsUpdateStageOpen(false)
      toast.success("Package stage updated successfully")
    } catch (error) {
      console.error("Error updating package stage:", error)
      toast.error("An error occurred while updating the package stage.")
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
          <h2 className="text-xl font-semibold">Tracking Number: {packageData.trackingNumber}</h2>
          <div className="space-y-4">
            {packageData.stages.map((stage, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {stage.isCompleted ? (
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  ) : (
                    <Circle className="h-6 w-6 text-gray-300" />
                  )}
                </div>
                <div className="flex-grow">
                  <p className="font-medium">{stage.name}</p>
                  {stage.isCompleted && stage.location && stage.time && (
                    <p className="text-sm text-gray-500">
                      {stage.location} - {format(new Date(stage.time), "PPpp")}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {currentStage < packageData.stages.length && (
            <Dialog open={isUpdateStageOpen} onOpenChange={setIsUpdateStageOpen}>
              <DialogTrigger asChild>
                <Button className="mt-4">Update Current Stage</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Update Package Stage</DialogTitle>
                  <DialogDescription>
                    Enter the new location to update the package's current stage.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right">
                      Location
                    </Label>
                    <Input
                      id="location"
                      placeholder="Enter new location"
                      value={newStageLocation}
                      onChange={(e) => setNewStageLocation(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="col-span-4">
                    <h3 className="font-semibold mb-2">Current Stage:</h3>
                    <p>{packageData.stages[currentStage].name}</p>
                  </div>
                  {currentStage < packageData.stages.length - 1 && (
                    <div className="col-span-4">
                      <h3 className="font-semibold mb-2">Next Stage:</h3>
                      <p>{packageData.stages[currentStage + 1].name}</p>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button onClick={handleUpdateStage} disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {currentStage === packageData.stages.length - 1 ? "Mark as Delivered" : "Update Stage"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      )}
    </div>
  )
}