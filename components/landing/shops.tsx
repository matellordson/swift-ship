import amazon from "@/app/public/shops/amazon.svg";
import ebay from "@/app/public/shops/ebay.svg";
import alibaba from "@/app/public/shops/alibaba.svg";
import apple from "@/app/public/shops/apple.svg";
import nike from "@/app/public/shops/nike.svg";
import shopify from "@/app/public/shops/shopify.svg";
import adidas from "@/app/public/shops/adidas.svg";
import Image from "next/image";

export function Shops() {
  return (
    <div className="mt-5 flex flex-col items-center justify-center bg-slate-200 lg:mt-0">
      <p className="scroll-m-20 pt-5 text-center text-[15px] font-semibold tracking-tight text-secondary-foreground dark:text-secondary lg:text-lg">
        Ship from your favourite sites
      </p>
      <div className="flex w-fit items-center justify-center gap-x-5 px-3 lg:px-0">
        <Image src={amazon} alt="amazon" className="size-5 lg:size-6" />
        <Image src={ebay} alt="ebay" className="size-9 lg:size-9" />
        <Image src={alibaba} alt="alibaba" className="size-9 lg:size-9" />
        <Image src={shopify} alt="shopify" className="size-5" />
        <Image src={nike} alt="nike" className="size-9 lg:size-10" />
        <Image src={apple} alt="apple" className="size-5 lg:size-6" />
        <Image src={adidas} alt="shopify" className="size-5 lg:size-7" />
      </div>
    </div>
  );
}
