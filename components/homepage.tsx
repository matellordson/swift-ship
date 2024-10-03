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
import { Button } from "./ui/button";
import {
  Building2,
  CarFront,
  CircleDollarSign,
  Handshake,
  Headphones,
  Package,
  PlaneTakeoff,
  Ship,
  TimerResetIcon,
  Truck,
  User2,
  UserCircle2Icon,
  UsersRound,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import clothing from "@/app/public/products/clothing.jpg";
import machinery from "@/app/public/products/machinery.jpg";
import furniture from "@/app/public/products/furniture.jpg";
import grocery from "@/app/public/products/grocery.jpg";
import appliance from "@/app/public/products/houseappliance.jpg";
import deliveryman from "@/app/public/deliveryman.jpg";

export default function HomePage() {
  return (
    <>
      {/* <Nav /> */}
      <div className="mx-auto max-w-6xl px-3">
        <Banner />
        <Freight />
        <Record />
        <Products />
        <Benefits />
        <Testimony />
      </div>
    </>
  );
}

function Nav() {
  return (
    <div className="mx-auto my-3 mb-5 w-full max-w-7xl p-3 px-3">
      <div className="h-10 w-32 bg-muted-foreground"></div>
    </div>
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
            priority
            placeholder="blur"
            className="h-[500px] w-full max-w-6xl rounded-t-xl object-cover opacity-90 transition dark:opacity-100 dark:mix-blend-overlay lg:relative"
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
            <Button className="shadow dark:bg-slate-100">Get Started</Button>
            <Button className="shadow dark:bg-secondary" variant={"outline"}>
              About Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Freight() {
  return (
    <div className="border-b border-l border-r">
      <div className="grid grid-cols-1 gap-3 px-3 py-5 lg:grid-cols-3">
        <div className="rounded-lg border bg-gradient-to-b from-slate-50 to-gray-100 p-4 text-lg dark:from-muted">
          <Truck
            size={30}
            className="text-slate-700 dark:text-secondary-foreground"
          />
          <p className="text-[1.10rem] leading-6 text-muted-foreground lg:pr-5 [&:not(:first-child)]:mt-2">
            Swift Ship excels in road freight, ensuring timely deliveries with
            reliable logistics and excellent customer service.
          </p>
        </div>

        <div className="rounded-lg border bg-gradient-to-b from-slate-50 to-gray-100 p-4 text-lg dark:from-muted">
          <PlaneTakeoff
            size={30}
            className="text-slate-700 dark:text-secondary-foreground"
          />
          <p className="text-[1.10rem] leading-6 text-muted-foreground lg:pr-5 [&:not(:first-child)]:mt-2">
            Our air freight services provide swift, reliable deliveries,
            utilizing global networks for unmatched efficiency and speed.
          </p>
        </div>

        <div className="rounded-lg border bg-gradient-to-b from-slate-50 to-gray-100 p-4 text-lg dark:from-muted">
          <Ship
            size={30}
            className="text-slate-700 dark:text-secondary-foreground"
          />
          <p className="text-[1.10rem] leading-6 text-muted-foreground lg:pr-5 [&:not(:first-child)]:mt-2">
            Sea freight services provide reliable shipping solutions, ensuring
            timely transport of goods across global waters.
          </p>
        </div>
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
                        objectFit="cover"
                        className="rounded-t-lg opacity-90 transition dark:opacity-80"
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
        our benefits
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
            className="h-96 rounded object-cover opacity-90 dark:opacity-80"
          />
        </div>
      </div>
    </div>
  );
}

function Testimony() {
  return (
    <div className="border-b border-l border-r px-3 py-5">
      <p className="scroll-m-20 pt-5 text-center text-xs font-semibold uppercase tracking-tight text-muted-foreground lg:text-sm">
        testimonials
      </p>
      <p className="mx-auto max-w-xl scroll-m-20 px-4 pb-5 pt-2 text-center text-xl font-medium tracking-tight lg:px-0 lg:text-2xl lg:font-semibold">
        Customer experiences that inspire trust
      </p>
    </div>
  );
}
