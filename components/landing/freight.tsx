import Image from "next/image";
import truck from "@/app/public/truck.jpg";

export default function Freight() {
  return (
    <div className="items-start justify-between lg:flex">
      <div className="pt-4 lg:pt-10">
        <p className="scroll-m-20 px-3 pb-1 text-2xl font-semibold tracking-tight first:mt-0 lg:px-6 lg:text-4xl">
          Redefined logistics, ensuring timely delivery whether by Land, Air, or
          Sea.
        </p>
        <p className="mb-3 px-3 leading-6 text-muted-foreground lg:mt-2 lg:px-6 lg:pr-20 lg:text-lg [&:not(:first-child)]:mt-1">
          At Swift Ship, timely delivery is our priority. Whether by land, air,
          or sea, we use advanced logistics and trusted partnerships to ensure
          your orders arrive on schedule. Your satisfaction is our commitment!.
        </p>
      </div>
      <div className="h-fit rounded-lg px-3 lg:rounded-none lg:px-0">
        <Image
          src={truck}
          alt="truck"
          className="h-[330px] w-[1800px] rounded-lg object-cover dark:opacity-70 lg:h-[310px] lg:rounded-none"
        />
      </div>
    </div>
  );
}
