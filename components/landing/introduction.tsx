import Image from "next/image";
import introImg from "../../app/public/intro-img.jpg";
import { Button } from "../ui/button";

export function Introduction() {
  return (
    <div className="">
      <div className="flex h-[22rem] items-center justify-center bg-blue-600 lg:h-[23rem] lg:rounded-none">
        <Image
          src={introImg}
          alt="intro-img"
          width={0}
          height={0}
          priority
          className="h-full object-cover opacity-70 mix-blend-overlay lg:rounded-lg"
        />
        <div className="absolute px-7 lg:px-0">
          <p className="max-w-5xl scroll-m-20 text-center text-4xl font-extrabold capitalize tracking-tight text-primary-foreground dark:text-foreground lg:text-5xl">
            Experience unmatched speed and efficiency.
          </p>
          <p className="mx-auto max-w-xl text-center text-[1rem] leading-6 text-neutral-50 dark:text-neutral-100 lg:text-[1.2rem] [&:not(:first-child)]:mt-3">
            We excels in reliability, treating each shipment as a promise kept.
            By prioritizing sustainability and integrating all freight modes.
          </p>
          <div className="relative mx-auto mt-5 flex w-full items-center justify-center gap-3 lg:w-fit">
            <Button
              size={"lg"}
              className="w-full bg-white font-semibold text-blue-500 hover:bg-neutral-200"
            >
              Start Shipping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
