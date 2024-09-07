"use client";

import { useState, useCallback } from "react";
import { countries } from "@/lib/countries";
import { cities } from "@/lib/cities";
import { productCategories } from "@/lib/package-category";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, TriangleAlert } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { submitPackage } from "@/app/_action/submit-package";

const formSchema = z.object({
  sender_full_name: z.string().min(1, "Full name is required"),
  sender_email: z.string().email("Invalid email address"),
  sender_phone_number: z
    .string()
    .min(10, "Phone number must be at least 10 digits"),
  sender_country: z.string().min(1, "Country is required"),
  sender_city: z.string(),
  sender_address: z.string().min(1, "Address is required"),
  receiver_full_name: z.string().min(1, "Full name is required"),
  receiver_email: z.string().email("Invalid email address"),
  receiver_phone_number: z
    .string()
    .min(10, "Phone number must be at least 10 digits"),
  receiver_country: z.string().min(1, "Country is required"),
  receiver_city: z.string(),
  receiver_address: z.string().min(1, "Address is required"),
  package_type: z.string().min(1, "Package type is required"),
  dimension: z.string().min(1, "Dimension is required"),
  weight: z.string().min(1, "Weight is required"),
  description: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export function PackageForm() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(50);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      sender_full_name: "",
      sender_email: "",
      sender_phone_number: "",
      sender_country: "",
      sender_city: "",
      sender_address: "",
      receiver_full_name: "",
      receiver_email: "",
      receiver_phone_number: "",
      receiver_country: "",
      receiver_city: "",
      receiver_address: "",
      package_type: "",
      dimension: "",
      weight: "",
      description: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    watch,
    clearErrors,
  } = form;

  const onSubmit = useCallback(async (data: FormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    await submitPackage(formData);
    setIsOpen(false);
  }, []);

  const nextStep = useCallback(async () => {
    const fields = getFieldsForStep(step);
    const isStepValid = await trigger(fields as any);
    if (isStepValid) {
      setStep((prevStep) => prevStep + 1);
      setProgress((prevProgress) => Math.min(prevProgress + 25, 100));
    }
  }, [step, trigger]);

  const prevStep = useCallback(() => {
    setStep((prevStep) => prevStep - 1);
    setProgress((prevProgress) => Math.max(prevProgress - 25, 25));
  }, []);

  const getFieldsForStep = useCallback((step: number) => {
    switch (step) {
      case 1:
        return [
          "sender_full_name",
          "sender_email",
          "sender_phone_number",
          "sender_country",
          "sender_city",
          "sender_address",
        ];
      case 2:
        return [
          "receiver_full_name",
          "receiver_email",
          "receiver_phone_number",
          "receiver_country",
          "receiver_city",
          "receiver_address",
        ];
      case 3:
        return ["package_type", "dimension", "weight", "description"];
      default:
        return [];
    }
  }, []);

  const validateField = useCallback(
    async (fieldName: keyof FormValues) => {
      const result = await trigger(fieldName);
      if (result) {
        clearErrors(fieldName);
      }
    },
    [trigger, clearErrors],
  );

  const renderField = useCallback(
    (
      fieldName: keyof FormValues,
      label: string,
      type: string = "text",
      placeholder: string = "",
    ) => {
      return (
        <div className="space-y-2">
          <Label htmlFor={fieldName}>{label}</Label>
          <Controller
            name={fieldName}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type={type}
                id={fieldName}
                placeholder={placeholder}
                className={errors[fieldName] ? "border-red-500" : ""}
                onChange={(e) => {
                  field.onChange(e);
                  validateField(fieldName);
                }}
              />
            )}
          />
          {errors[fieldName] && (
            <p className="text-sm text-red-500">{errors[fieldName]?.message}</p>
          )}
        </div>
      );
    },
    [control, errors, validateField],
  );

  const renderSelectField = useCallback(
    (fieldName: keyof FormValues, label: string, options: string[]) => {
      return (
        <div className="space-y-2">
          <Label htmlFor={fieldName}>{label}</Label>
          <Controller
            name={fieldName}
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  validateField(fieldName);
                }}
                defaultValue={field.value}
              >
                <SelectTrigger
                  id={fieldName}
                  className={errors[fieldName] ? "border-red-500" : ""}
                >
                  <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors[fieldName] && (
            <p className="text-sm text-red-500">{errors[fieldName]?.message}</p>
          )}
        </div>
      );
    },
    [control, errors, validateField],
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="flex items-center justify-center gap-1 text-xs"
          size={"sm"}
        >
          <Plus className="size-4" />
          New Package
        </Button>
      </DialogTrigger>
      <DialogContent className="h-full max-w-xl overflow-y-auto lg:h-[600px]">
        <DialogHeader>
          <DialogTitle>Package Submission - Step {step} of 3</DialogTitle>
        </DialogHeader>
        <div className="mb-4">
          <Progress value={progress} className="w-full" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>
                {step === 1
                  ? "Sender"
                  : step === 2
                    ? "Receiver"
                    : step === 3 && "Package"}{" "}
                Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {step === 1 && (
                <>
                  {renderField("sender_full_name", "Full Name")}
                  {renderField("sender_email", "Email", "email")}
                  {renderField("sender_phone_number", "Phone Number")}
                  {renderSelectField("sender_country", "Country", countries)}
                  {renderSelectField("sender_city", "City", cities)}
                  {renderField("sender_address", "Address")}
                  <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
                    <TriangleAlert className="size-4 text-orange-300" />
                    Provide City with your Address if not found
                  </p>
                </>
              )}
              {step === 2 && (
                <>
                  {renderField("receiver_full_name", "Full Name")}
                  {renderField("receiver_email", "Email", "email")}
                  {renderField("receiver_phone_number", "Phone Number")}
                  {renderSelectField("receiver_country", "Country", countries)}
                  {renderSelectField("receiver_city", "City", cities)}
                  {renderField("receiver_address", "Address")}
                  <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
                    <TriangleAlert className="size-4 text-orange-300" />
                    Provide City with your Address if not found
                  </p>
                </>
              )}
              {step === 3 && (
                <>
                  {renderSelectField(
                    "package_type",
                    "Package Category",
                    productCategories,
                  )}
                  {renderField(
                    "dimension",
                    "Dimension",
                    "text",
                    "Length x Width x Height (e.g., 10cm x 5cm x 3cm)",
                  )}
                  {renderField(
                    "weight",
                    "Weight",
                    "text",
                    "Weight in kg (e.g., 1.5 kg)",
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Controller
                      name="description"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          id="description"
                          placeholder="Briefly describe the contents of your package"
                          className={errors.description ? "border-red-500" : ""}
                          onChange={(e) => {
                            field.onChange(e);
                            validateField("description");
                          }}
                        />
                      )}
                    />
                    {errors.description && (
                      <p className="text-sm text-red-500">
                        {errors.description?.message}
                      </p>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          <div className="flex justify-between">
            {step > 1 && (
              <Button type="button" onClick={prevStep}>
                Previous
              </Button>
            )}
            {step < 3 ? (
              <Button type="button" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={!isValid}>
                Submit
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
