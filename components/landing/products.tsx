import clothing from "@/app/public/products/clothing.jpg";
import toys from "@/app/public/products/toys.jpg";
import furniture from "@/app/public/products/furniture.jpg";
import skin from "@/app/public/products/skin.jpg";
import groceries from "@/app/public/products/groceries.jpg";
import { Shops } from "./shops";
import Image from "next/image";

export function Products() {
  return (
    <div className="bg-slate-200">
      <Shops />
      <div className="mx-auto mt-4 max-w-4xl">
        <div className="items-start justify-center lg:flex lg:flex-col">
          <div className="lg:text-center">
            <p className="scroll-m-20 px-3 pb-1 text-2xl font-semibold tracking-tight text-secondary-foreground first:mt-0 dark:text-secondary lg:px-6 lg:text-4xl">
              We ship anything
            </p>
            <p className="mb-3 px-3 leading-6 text-slate-500 lg:mt-2 lg:px-6 lg:pr-20 lg:text-lg [&:not(:first-child)]:mt-1">
              No package is too big or small! Whether it's a heartfelt gift or a
              vintage motorcycle, our experts ensure secure packing and prompt
              delivery. With flexible options and exceptional customer service,
              we make shipping a breeze.
            </p>
          </div>
          <div className="w-full">
            <div className="grid grid-flow-col grid-cols-3 grid-rows-2 gap-1 px-3 pb-7 lg:gap-3 lg:px-0">
              <div>
                <Image
                  src={clothing}
                  alt="clothing"
                  className="h-40 rounded object-cover shadow-sm dark:opacity-90 lg:h-64 lg:rounded-xl"
                />
              </div>
              <div className="col-start-3">
                <Image
                  src={toys}
                  alt="electronics"
                  className="h-40 rounded object-cover shadow-sm dark:opacity-90 lg:h-64 lg:rounded-xl"
                />
              </div>
              <div>
                <Image
                  src={groceries}
                  alt="furniture"
                  className="h-40 rounded object-cover shadow-sm dark:opacity-90 lg:h-64 lg:rounded-xl"
                />
              </div>
              <div>
                <Image
                  src={skin}
                  alt="skin"
                  className="h-40 rounded object-cover shadow dark:opacity-90 lg:h-64 lg:rounded-xl"
                />
              </div>
              <div className="col-span-2 col-start-2 row-start-1 h-40 rounded-xl shadow-sm dark:opacity-80">
                <Image
                  src={furniture}
                  alt="grocery"
                  className="h-40 rounded object-cover shadow-sm dark:opacity-100 lg:h-64 lg:rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
