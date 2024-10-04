import { PackageOpenIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { PackageForm } from "./new-package";

export function NoPackage() {
  return (
    <div className="container mx-auto max-w-lg px-5 lg:px-0">
      <Card>
        <CardHeader className="flex items-center justify-center">
          <PackageOpenIcon size={150} />
          <CardTitle>No Packages</CardTitle>
          <CardDescription className="text-center">
            Start shipping by adding a package and allow us deliver it as swift
            as possible to your desired location
          </CardDescription>
        </CardHeader>
        <CardContent className="flex w-full items-center justify-center">
          <PackageForm />
        </CardContent>
      </Card>
    </div>
  );
}
