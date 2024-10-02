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
import Image from "next/image";
import { Button } from "./ui/button";
import {
  Building2,
  Handshake,
  Package,
  PlaneTakeoff,
  Ship,
  TimerResetIcon,
  Truck,
  UserCircle2Icon,
  UsersRound,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-3">
      <Banner />
      <Freight />
      <Record />
      <Products />
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
            className="h-[500px] w-full max-w-6xl rounded-t-xl object-cover opacity-90 dark:opacity-100 dark:mix-blend-overlay lg:relative"
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
      <p className="mx-auto max-w-xl scroll-m-20 px-4 text-center text-xl font-medium tracking-tight lg:px-0 lg:text-2xl lg:font-semibold">
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
                5200
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

  const slides = [
    {
      image: "/placeholder.svg",
      text: "Beautiful landscape with mountains and a lake",
    },
    {
      image: "/placeholder.svg",
      text: "Cityscape at night with bright lights",
    },
    {
      image: "/placeholder.svg",
      text: "Serene beach with crystal clear water",
    },
    {
      image: "/placeholder.svg",
      text: "Dense forest with tall trees",
    },
    {
      image: "/placeholder.svg",
      text: "Snowy peaks under a clear blue sky",
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
      <p className="mx-auto max-w-xl scroll-m-20 px-4 pb-5 text-center text-xl font-medium tracking-tight lg:px-0 lg:text-2xl lg:font-semibold">
        Whatever you need shipped, we handle it all—big or small, anywhere you
        are!
      </p>
      <Carousel setApi={setApi} className="mx-auto w-full max-w-4xl">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
              <div className="p-1">
                <Card className="w-full">
                  <CardContent className="flex h-80 flex-col p-0">
                    <div className="relative h-3/4 w-full">
                      <Image
                        src={slide.image}
                        alt={`Slide ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="flex h-1/4 items-center justify-center p-4 text-center">
                      <p>{slide.text}</p>
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
