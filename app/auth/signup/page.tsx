"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import SignupAction from "@/app/_action/signup";
import { CheckCircle2Icon, CircleX } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const SignupSchema = z.object({
  username: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
});

export type SignupSchemaTypes = z.infer<typeof SignupSchema>;

export default function Signin() {
  const router = useRouter();
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      username: "",
      password: "",
      agreeTerms: false,
    },
  });

  async function onSubmit(data: z.infer<typeof SignupSchema>) {
    if (!data.agreeTerms) {
      toast(
        <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
          <CircleX className="size-4 text-red-500" />
          You must agree to the terms and conditions.
        </p>,
      );
      return;
    }

    const res = await SignupAction(data);

    if (res.error) {
      toast(
        <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
          <CircleX className="size-4 text-red-500" />
          {res.error}
        </p>,
      );
    } else {
      toast(
        <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
          <CheckCircle2Icon className="size-4 text-green-500" />
          Account created successfully
        </p>,
      );
      router.push("/dashboard");
    }
  }

  return (
    <div className="mx-auto max-w-sm px-3 lg:px-0">
      <Card>
        <CardHeader className="">
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input className="" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="agreeTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to the{" "}
                        <Link
                          href="/terms-and-conditions"
                          className="text-primary hover:underline"
                        >
                          terms and conditions
                        </Link>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full font-semibold tracking-wide"
              >
                Create account
              </Button>
            </form>
          </Form>
          <p className="texr-xs mt-3 text-center text-muted-foreground">
            already have an account?
            <Link className="pl-2 text-primary" href={"/auth/signin"}>
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
