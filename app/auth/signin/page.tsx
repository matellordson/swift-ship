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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SigninAction from "@/app/_action/signin";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { CheckCircle2Icon, CircleX } from "lucide-react";

const SigninSchema = z.object({
  username: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export type SigninSchemaTypes = z.infer<typeof SigninSchema>;

export default function Signin() {
  const router = useRouter();
  const form = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof SigninSchema>) {
    const res = await SigninAction(data);

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
          Logged in Successfully
        </p>,
      );
      router.push("/dashboard");
    }
  }

  
  return (
    <div className="mx-auto max-w-sm px-3 lg:px-0">
      <Card>
        <CardHeader className="">
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your username below to login to your account.
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
                      <Input {...field} />
                    </FormControl>
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
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full font-semibold capitalize tracking-wide"
              >
                Continue
              </Button>
            </form>
          </Form>
          <p className="texr-xs mt-3 text-center text-muted-foreground">
            don't have an account?
            <Link className="pl-2 text-primary" href={"/auth/signup"}>
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
