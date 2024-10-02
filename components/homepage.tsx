import container from "@/app/public/container.jpg";
import Image from "next/image";
import { Button } from "./ui/button";

export default function HomePage() {
  return (
    <div className="px-3">
      <Banner />
    </div>
  );
}

function Banner() {
  return (
    <div className="mx-auto max-w-6xl rounded-t-xl border">
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
