"use client";

import container from "@/app/public/container.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import Image, { StaticImageData } from "next/image";
import { Button, buttonVariants } from "./ui/button";
import {
  Building2,
  CarFront,
  CircleDollarSign,
  Handshake,
  Headphones,
  Mail,
  Package,
  Phone,
  PlaneTakeoff,
  Ship,
  TimerResetIcon,
  Truck,
  User2,
  UsersRound,
} from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import React, { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import clothing from "@/app/public/products/clothing.jpg";
import machinery from "@/app/public/products/machinery.jpg";
import furniture from "@/app/public/products/furniture.jpg";
import grocery from "@/app/public/products/grocery.jpg";
import appliance from "@/app/public/products/houseappliance.jpg";
import deliveryman from "@/app/public/deliveryman.jpg";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import swiftShipLogo from "@/app/public/logo2.png";
import Logo from "./logo";
import SmartSupp from "@/app/(links)/track-shipment/smartsupp";
import roadFreight from "@/app/public/road-frieght.webp";
import airFreight from "@/app/public/air-frieght.png";
import seaFreight from "@/app/public/sea-freight.jpeg";
import createAccount from "@/app/public/create-account.jpg";
import quote from "@/app/public/quote.jpg";
import support from "@/app/public/support.avif";
import receive from "@/app/public/receive.avif";
import delivery from "@/app/public/delivery.jpg";
import shipping from "@/app/public/ship.jpg";
import dhl from "@/app/public/collab/dhl-2.svg";
import ever from "@/app/public/collab/ever.svg";
import fedex from "@/app/public/collab/fedex.svg";
import turk from "@/app/public/collab/turk.svg";
import ups from "@/app/public/collab/ups.svg";

export default function HomePage() {
  return (
    <>
      <Nav />
      <div className="mx-auto max-w-6xl px-3">
        <Banner />
        <Freight />
        <Record />
        <Process />
        <Products />
        <Collabs />
        <Benefits />
        <Testimony />
        <SmartSupp />
      </div>
      <Footer />
    </>
  );
}

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="mb-5 border-b bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="">
              <Logo />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/about-us"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  About us
                </Link>
                <Link
                  href="/contact-us"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  Contact us
                </Link>
                <Link
                  href="/track-shipment"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  Track shipment
                </Link>
                <Link
                  href="/terms-and-conditions"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  Terms and Conditions
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden space-x-2 md:block">
            <Link
              href={"/auth/signup"}
              className={buttonVariants({
                variant: "outline",
              })}
            >
              Signup
            </Link>
            <Link
              href={"auth/signin"}
              className={buttonVariants({
                variant: "default",
              })}
            >
              Login
            </Link>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <Link
              href="/about-us"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              About us
            </Link>
            <Link
              href="/contact-us"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Contact us
            </Link>
            <Link
              href="/track-shipment"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Track shipment
            </Link>
            <Link
              href="/terms-and-conditions"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Terms and Conditions
            </Link>
          </div>
          <div className="border-t border-muted pb-3 pt-4">
            <div className="flex items-center gap-2 px-5">
              <Link
                href={"/auth/signup"}
                className={buttonVariants({
                  variant: "outline",
                  className: "w-full",
                })}
              >
                Signup
              </Link>
              <Link
                href={"auth/signin"}
                className={buttonVariants({
                  variant: "default",
                  className: "w-full",
                })}
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function Banner() {
  return (
    <div className="rounded-t-xl border">
      <div className="flex flex-col items-center justify-start rounded-t-xl">
        <div className="h-[500px] w-full rounded-t dark:bg-gradient-to-tr lg:from-primary">
          <Image
            src={container}
            alt="container"
            priority={true}
            placeholder="blur"
            height={500}
            width={500}
            objectFit=""
            className="h-[500px] w-full max-w-7xl rounded-t-xl object-cover opacity-90 transition dark:opacity-100 dark:mix-blend-overlay lg:relative"
          />
        </div>
        <div className="absolute flex flex-col items-center justify-center px-6 lg:px-0">
          <p className="scroll-m-20 pb-2 pt-16 text-center text-3xl font-semibold tracking-tight text-slate-700 first:mt-0 dark:text-secondary-foreground lg:text-4xl">
            Experience unmatched speed and efficiency.
          </p>
          <p className="mt-1 max-w-[37rem] text-center text-[1.0rem] text-slate-500 dark:text-slate-300 lg:text-xl lg:leading-7 lg:[&:not(:first-child)]:mt-2">
            We excel in reliability, treating each shipment as a promise kept.
            By prioritizing sustainability and integrating all freight modes.
          </p>
          <div className="mt-3 flex w-full items-center justify-center space-x-5 lg:mt-5">
            <Link
              href={"/auth/signup"}
              className={buttonVariants({
                className: "shadow dark:bg-slate-100",
              })}
            >
              Get Started
            </Link>
            <Link
              href={"/about-us"}
              className={buttonVariants({
                className: "shadow dark:bg-secondary",
                variant: "outline",
              })}
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Freight() {
  const cards = [
    {
      id: 1,
      imageUrl: roadFreight,
      alt: "Card 1 image",
      content:
        "We excel in road freight, ensuring timely deliveries with reliable logistics and excellent customer service.",
    },
    {
      id: 2,
      imageUrl: airFreight,
      alt: "Card 2 image",
      content:
        "Our air freight services provide swift, reliable deliveries, utilizing global networks for unmatched efficiency and speed.",
    },
    {
      id: 3,
      imageUrl: seaFreight,
      alt: "Card 3 image",
      content:
        "Sea freight services provide reliable shipping solutions, ensuring timely transport of goods across global waters.",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl border-b border-l border-r px-4 py-8">
      <div className="mb-5">
        <p className="scroll-m-20 text-center text-xs font-semibold uppercase tracking-tight text-muted-foreground lg:text-sm">
          Flexible Shipping
        </p>
        <p className="mx-auto max-w-xl scroll-m-20 px-4 pt-2 text-center text-xl font-medium tracking-tight lg:px-0 lg:text-2xl lg:font-semibold">
          Multiple carriers ensure your package is delivered with precision,
          every time.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Card key={card.id} className="overflow-hidden">
            <CardContent className="p-0">
              <Image
                src={card.imageUrl}
                alt={card.alt}
                width={300}
                height={200}
                className="h-48 w-full object-cover opacity-80 dark:opacity-70"
              />
            </CardContent>
            <CardFooter className="p-4">
              <p>{card.content}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Record() {
  return (
    <div className="border-b border-l border-r">
      <p className="scroll-m-20 pt-5 text-center text-xs font-semibold uppercase tracking-tight text-muted-foreground lg:text-sm">
        our numbers
      </p>
      <p className="mx-auto max-w-xl scroll-m-20 px-4 pt-2 text-center text-xl font-medium tracking-tight lg:px-0 lg:text-2xl lg:font-semibold">
        The numbers are on our side, ensuring every package is handled with
        precision!
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 px-3 py-5">
        <div className="w-full rounded-lg border p-5 lg:w-52">
          <div className="flex flex-col items-center justify-center">
            <UsersRound className="size-12 rounded-full bg-muted p-2 text-slate-700 dark:text-secondary-foreground" />
            <div className="flex flex-col items-center justify-center">
              <p className="pt-3 text-xl font-bold text-slate-700 dark:text-secondary-foreground">
                100%
              </p>
              <p className="text-sm text-muted-foreground">
                Customer Satisfaction
              </p>
            </div>
          </div>
        </div>

        <div className="w-full rounded-lg border p-5 lg:w-52">
          <div className="flex flex-col items-center justify-center">
            <TimerResetIcon className="size-12 rounded-full bg-muted p-2 text-slate-700 dark:text-secondary-foreground" />
            <div className="flex flex-col items-center justify-center">
              <p className="pt-3 text-xl font-bold text-slate-700 dark:text-secondary-foreground">
                24/7
              </p>
              <p className="text-sm text-muted-foreground">Reliability</p>
            </div>
          </div>
        </div>

        <div className="w-full rounded-lg border p-5 lg:w-52">
          <div className="flex flex-col items-center justify-center">
            <Building2 className="size-12 rounded-full bg-muted p-2 text-slate-700 dark:text-secondary-foreground" />
            <div className="flex flex-col items-center justify-center">
              <p className="pt-3 text-xl font-bold text-slate-700 dark:text-secondary-foreground">
                80+
              </p>
              <p className="text-sm text-muted-foreground">
                Branches Worldwide
              </p>
            </div>
          </div>
        </div>

        <div className="w-full rounded-lg border p-5 lg:w-52">
          <div className="flex flex-col items-center justify-center">
            <Package className="size-12 rounded-full bg-muted p-2 text-slate-700 dark:text-secondary-foreground" />
            <div className="flex flex-col items-center justify-center">
              <p className="pt-3 text-xl font-bold text-slate-700 dark:text-secondary-foreground">
                12045
              </p>
              <p className="text-sm text-muted-foreground">
                Delivered Packages
              </p>
            </div>
          </div>
        </div>

        <div className="w-full rounded-lg border p-5 lg:w-52">
          <div className="flex flex-col items-center justify-center">
            <Handshake className="size-12 rounded-full bg-muted p-2 text-slate-700 dark:text-secondary-foreground" />
            <div className="flex flex-col items-center justify-center">
              <p className="pt-3 text-xl font-bold text-slate-700 dark:text-secondary-foreground">
                3200
              </p>
              <p className="text-sm text-muted-foreground">Employees</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Products() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  type Slide = {
    image: StaticImageData;
    heading: string;
    text: string;
  };

  const slides: Slide[] = [
    {
      image: furniture,
      heading: "Furniture",
      text: "We ship furniture with care, ensuring safe, timely delivery and secure handling from start to finish.",
    },
    {
      image: machinery,
      heading: "Machinery",
      text: "We transport machinery with precision, ensuring safe handling, secure packaging, and on-time delivery to any location.",
    },
    {
      image: clothing,
      heading: "Clothing",
      text: "We deliver clothing worldwide, ensuring it arrives in perfect condition, on schedule, and ready to wear.",
    },

    {
      image: grocery,
      heading: "Grocery",
      text: "We handle grocery deliveries with care, ensuring fresh products reach you quickly, safely, and on time.",
    },
    {
      image: appliance,
      heading: "Household appliances",
      text: "We deliver home appliances with precision, ensuring safe transport, timely arrival, and secure installation when needed.",
    },
  ];

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="border-b border-l border-r px-3 py-5">
      <p className="scroll-m-20 pt-5 text-center text-xs font-semibold uppercase tracking-tight text-muted-foreground lg:text-sm">
        we ship anything
      </p>
      <p className="mx-auto max-w-xl scroll-m-20 px-4 pb-5 pt-2 text-center text-xl font-medium tracking-tight lg:px-0 lg:text-2xl lg:font-semibold">
        Whatever you need shipped, we handle it all—big or small, anywhere you
        are!
      </p>
      <Carousel setApi={setApi} className="mx-auto w-full max-w-4xl">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
              <div className="p-1">
                <Card className="w-full">
                  <CardContent className="flex h-96 flex-col p-0">
                    <div className="relative h-2/3 w-full overflow-hidden">
                      <Image
                        src={slide.image}
                        alt={slide.heading}
                        layout="fill"
                        priority={true}
                        objectFit="cover"
                        className="rounded-t-lg opacity-80 transition dark:opacity-70"
                      />
                    </div>
                    <div className="flex h-32 flex-col justify-start px-3 py-3">
                      <h3 className="scroll-m-20 text-lg font-semibold tracking-tight lg:text-xl">
                        {slide.heading}
                      </h3>
                      <p className="text-sm leading-6 text-muted-foreground lg:text-[17px] [&:not(:first-child)]:mt-1">
                        {slide.text}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {isDesktop ? (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        ) : (
          ""
        )}
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
    </div>
  );
}

function Benefits() {
  return (
    <div className="border-b border-l border-r px-3 py-5">
      <p className="scroll-m-20 pt-5 text-center text-xs font-semibold uppercase tracking-tight text-muted-foreground lg:text-sm">
        why choose us
      </p>
      <p className="mx-auto max-w-xl scroll-m-20 px-4 pb-5 pt-2 text-center text-xl font-medium tracking-tight lg:px-0 lg:text-2xl lg:font-semibold">
        Effortless shipping solutions for seamless deliveries
      </p>
      <div className="w-full items-center justify-center px-2 lg:flex">
        <div className="flex h-fit w-full flex-col items-start justify-center gap-y-3 lg:h-80 lg:w-[40%] lg:gap-y-10 lg:pl-24">
          <div className="flex items-center justify-center gap-x-3">
            <div className="h-fit w-fit rounded-full bg-muted p-2">
              <CarFront className="text-slate-700 dark:text-secondary-foreground" />
            </div>
            <p className="scroll-m-20 text-xl font-normal tracking-tight text-muted-foreground lg:text-lg">
              Reliable and timely delivery
            </p>
          </div>

          <div className="flex items-center justify-center gap-x-3">
            <div className="h-fit w-fit rounded-full bg-muted p-2">
              <CircleDollarSign className="text-slate-700 dark:text-secondary-foreground" />
            </div>
            <p className="scroll-m-20 text-lg font-normal tracking-tight text-muted-foreground lg:text-xl">
              Cost-effective solutions
            </p>
          </div>

          <div className="flex items-center justify-center gap-x-3">
            <div className="h-fit w-fit rounded-full bg-muted p-2">
              <User2 className="text-slate-700 dark:text-secondary-foreground" />
            </div>
            <p className="scroll-m-20 text-lg font-normal tracking-tight text-muted-foreground lg:text-xl">
              Eco-friendly initiatives
            </p>
          </div>

          <div className="flex items-center justify-center gap-x-3">
            <div className="h-fit w-fit rounded-full bg-muted p-2">
              <Headphones className="text-slate-700 dark:text-secondary-foreground" />
            </div>
            <p className="scroll-m-20 text-lg font-normal tracking-tight text-muted-foreground lg:text-xl">
              Dedicated customer support
            </p>
          </div>
        </div>
        <div className="mt- hidden w-full lg:mt-0 lg:flex lg:w-[60%]">
          <Image
            src={deliveryman}
            alt="truck"
            height={384}
            width={700}
            priority={true}
            className="h-96 rounded object-cover opacity-80 dark:opacity-70"
          />
        </div>
      </div>
    </div>
  );
}

function Testimony() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      testimony:
        "I'm amazed at how quickly my packages arrive. This shipping company has never let me down with their express delivery service!",
    },
    {
      name: "Michael Chen",
      testimony:
        "Their package tracking system is top-notch. I always know exactly where my shipment is and when it will arrive.",
    },
    {
      name: "Emily Rodriguez",
      testimony:
        "I had a delicate item to ship internationally, and their careful handling ensured it arrived in perfect condition. Impressive service!",
    },
    {
      name: "David Patel",
      testimony:
        "The customer support team went above and beyond when I had an issue with customs. They handled everything promptly and professionally.",
    },
    {
      name: "Olivia Thompson",
      testimony:
        "As a small business owner, reliable shipping is crucial. This company's consistency and competitive rates have been a game-changer for my online store.",
    },
    {
      name: "Robert Tanaka",
      testimony:
        "I appreciate their eco-friendly packaging options. It's great to work with a shipping company that cares about environmental impact.",
    },
  ];

  return (
    <div className="mb-8 rounded-b-lg border-b border-l border-r px-3 py-3">
      <p className="scroll-m-20 pt-5 text-center text-xs font-semibold uppercase tracking-tight text-muted-foreground lg:text-sm">
        testimonials
      </p>
      <p className="mx-auto max-w-xl scroll-m-20 px-4 pb-5 pt-2 text-center text-xl font-medium tracking-tight lg:px-0 lg:text-2xl lg:font-semibold">
        Customer experiences that inspire trust
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="flex flex-col justify-between">
            <CardContent className="pt-6">
              <p className="italic text-muted-foreground">
                &ldquo;{testimonial.testimony}&rdquo;
              </p>
            </CardContent>
            <CardFooter className="text-right">
              <p className="font-semibold">- {testimonial.name}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo, About Us, and Theme Toggle */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 py-0">
                <Image
                  src={swiftShipLogo}
                  height={100}
                  priority
                  alt="Swift Ship logo"
                  className="m-0 h-28 w-fit p-0"
                />
                {/* <p className="font-semiboldt pt[-100px] text-xl">Swift Ship</p> */}
              </div>
            </div>
            <p className="pt-[-100px] text-sm text-gray-600 dark:text-gray-400">
              Swift Ship offers fast, reliable shipping with eco-friendly
              practices and 24/7 support. Your packages arrive on time, every
              time.
            </p>
          </div>

          {/* We Offer */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">We Offer</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>Road freight</li>
              <li>Air freight</li>
              <li>Ocean freight</li>
              <li>Warehousing and Storage</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Info</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <span>swiftshipservices@outlook.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+44 070 7540 0992</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 lg:h-7 lg:w-7" />
                <span>
                  7 Scarcroft Road, Porthcurno, United Kingdom, TR19 1YA
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Stay Updated</h3>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Subscribe to our newsletter for the latest news and exclusive
              offers.
            </p>
            <form className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white dark:bg-gray-800"
              />
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-600 dark:border-gray-800 dark:text-gray-400">
          © {new Date().getFullYear()} SwiftShip. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function Process() {
  const stages = [
    {
      number: 1,
      title: "Create an account",
      description:
        "Sign up by providing your name and password to create an account. This will give you access to all shipping features and tools.",
      image: createAccount,
    },
    {
      number: 2,
      title: "Request a quote",
      description:
        "Enter your shipment details, such as size, weight, and destination, to get an instant quote for your shipment.",
      image: quote,
    },
    {
      number: 3,
      title: "Contact support",
      description:
        "Get in touch with customer support to discuss the details of your package and receive personalized assistance with your shipping options and fees.",
      image: support,
    },
    {
      number: 4,
      title: "receive packages",
      description:
        "After finalizing the details with customer support, we’ll arrange to receive your package based on the sender information you provided.",
      image: receive,
    },
    {
      number: 5,
      title: "Ship package",
      description:
        "Once we’ve received your package, it will be carefully shipped to the destination using the agreed-upon method and timeline.",
      image: shipping,
    },
    {
      number: 6,
      title: "Deliver package",
      description:
        "Your package will be delivered to the specified destination, ensuring it arrives safely and on time as per the agreed terms.",
      image: delivery,
    },
  ];

  return (
    <div className="container mx-auto max-w-7xl border-b border-l border-r p-4">
      <p className="scroll-m-20 pt-5 text-center text-xs font-semibold uppercase tracking-tight text-muted-foreground lg:text-sm">
        our delivery process
      </p>
      <p className="mx-auto max-w-xl scroll-m-20 px-4 pb-5 pt-2 text-center text-xl font-medium tracking-tight lg:px-0 lg:text-2xl lg:font-semibold">
        Our delivery is fast, secure, and reliable, with full transparency to
        ensure your order arrives safely.
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stages.map((stage) => (
          <Card key={stage.number} className="overflow-hidden">
            <div className="relative">
              <Image
                src={stage.image}
                alt={`Stage ${stage.number}: ${stage.title}`}
                width={300}
                height={200}
                className="h-48 w-full object-cover opacity-80 dark:opacity-60"
              />
              <div className="absolute left-0 top-0 rounded-br-lg bg-gradient-to-br from-primary to-primary-foreground p-2">
                <span className="text-2xl font-bold text-white">
                  {stage.number}
                </span>
              </div>
            </div>
            <CardContent className="p-4">
              <h2 className="mb-2 font-semibold uppercase">{stage.title}</h2>
              <p className="text-muted-foreground">{stage.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Collabs() {
  const [api, setApi] = useState<any>();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const images = [
    { src: dhl, alt: "DHL" },
    { src: ever, alt: "Ever" },
    { src: fedex, alt: "FedEx" },
    { src: turk, alt: "Turk" },
    { src: ups, alt: "UPS" },
  ];

  useEffect(() => {
    if (!api) return;

    const scrollNext = () => {
      api.scrollNext();
      if (api.selectedScrollSnap() === api.scrollSnapList().length - 1) {
        setTimeout(() => {
          api.scrollTo(0, { duration: 0 });
        }, 50);
      }
    };

    intervalRef.current = setInterval(scrollNext, 3000); // Increased interval for better visibility

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [api]);

  return (
    <div className="mx-auto w-full max-w-7xl border-b border-l border-r px-4 py-8">
      <p className="scroll-m-20 pt-5 text-center text-xs font-semibold uppercase tracking-tight text-muted-foreground lg:text-sm">
        our shipping partners
      </p>
      <p className="mx-auto max-w-xl scroll-m-20 px-4 pb-5 pt-2 text-center text-xl font-medium tracking-tight lg:px-0 lg:text-2xl lg:font-semibold">
        We work with trusted shipping partners to ensure fast, reliable
        delivery.
      </p>
      {/* Increased max-width */}
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {[...images, ...images].map((image, index) => (
            <CarouselItem key={index} className="md:basis-1/5 lg:basis-1/5">
              <div className="flex h-24 w-full items-center justify-center p-2">
                <div className="relative h-full w-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-contain opacity-80 dark:opacity-70"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
