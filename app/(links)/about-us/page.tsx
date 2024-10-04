import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="flex min-h-screen flex-col">
      <nav className="mb-10 border-b bg-background">
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
      <main className="container mx-auto flex-grow px-4 py-8">
        <section className="mb-12 text-center">
          <Badge className="mb-4">About Us</Badge>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100 lg:text-4xl">
            Experience unmatched speed and efficiency.
          </h1>
          <p className="mx-auto max-w-2xl text-[16px] text-muted-foreground lg:text-[18px]">
            At Swift Ship, we deliver your packages quickly and reliably, using
            advanced technology and a dedicated team to ensure on-time,
            hassle-free shipping that keeps your business moving forward.
          </p>
        </section>

        <section className="mb-16">
          <p className="mb-5 scroll-m-20 pt-5 text-center text-xs font-semibold uppercase tracking-tight text-muted-foreground lg:text-sm">
            our core values
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="mb-[-10px] flex items-center space-x-2">
                  <span className="scroll-m-20 text-xl font-semibold tracking-tight">
                    Speed & Efficiency
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We're dedicated to fast, reliable delivery, with every step
                  focused on getting your packages to you quickly.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="mb-[-10px] flex items-center space-x-2">
                  <span className="scroll-m-20 text-xl font-semibold tracking-tight">
                    Customer First
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We prioritize our customers, offering clear communication,
                  personalized solutions, and exceptional support to exceed
                  expectations.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="mb-[-10px] flex items-center space-x-2">
                  <span className="scroll-m-20 text-xl font-semibold tracking-tight">
                    Integrity & Reliability
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We build trust through transparency, ensuring every delivery
                  is honest, consistent, and seamless.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <p className="mb-5 scroll-m-20 pt-5 text-center text-xs font-semibold uppercase tracking-tight text-muted-foreground lg:text-sm">
            our journey
          </p>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="founding">
              <AccordionTrigger>The Founding (2010)</AccordionTrigger>
              <AccordionContent className="leading-6 text-muted-foreground">
                Founded in 2010, Swift Ship started with a simple mission: to
                revolutionize fast, reliable delivery. What began as a small
                operation focused on meeting urgent shipping needs quickly grew
                into a trusted service for businesses and individuals alike. By
                prioritizing speed, transparency, and customer satisfaction,
                we’ve built a reputation for getting packages to their
                destination on time, every time.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="growth">
              <AccordionTrigger>Rapid Growth (2015-2020)</AccordionTrigger>
              <AccordionContent className="leading-6 text-muted-foreground">
                From 2015 to 2020, Swift Ship experienced rapid growth as demand
                for fast, reliable delivery surged. During this period, we
                expanded our network, upgraded our technology, and built a
                larger, more efficient team to keep pace with the growing
                market. Our commitment to speed and customer satisfaction
                allowed us to scale quickly, earning the trust of businesses
                across industries and establishing us as a leader in fast
                delivery services.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="present">
              <AccordionTrigger>Present Day</AccordionTrigger>
              <AccordionContent className="leading-6 text-muted-foreground">
                Today, Swift Ship stands at the forefront of the delivery
                industry, combining cutting-edge technology with a
                customer-first approach. We've expanded our reach globally,
                offering fast, reliable shipping solutions to businesses and
                individuals worldwide. With a focus on innovation, efficiency,
                and personalized service, we continue to lead the way in fast
                delivery, ensuring that every package arrives on time—no matter
                where it's headed.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section className="text-center">
          <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-gray-100">
            Get in Touch
          </h2>
          <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-x-8 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Mail className="text-primary" size={20} />
              <span className="text-gray-600 dark:text-gray-300">
                support@swiftship.com
              </span>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} SwiftShip. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            Terms and Conditions
          </Link>
        </nav>
      </footer>
    </div>
  );
}
