import { Shops } from "./shops";

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
            <p className="mb-3 px-3 leading-6 text-secondary-foreground dark:text-secondary lg:mt-2 lg:px-6 lg:pr-20 lg:text-lg [&:not(:first-child)]:mt-1">
              No package is too big or small! Whether it's a heartfelt gift or a
              vintage motorcycle, our experts ensure secure packing and prompt
              delivery. With flexible options and exceptional customer service,
              we make shipping a breeze.
            </p>
          </div>
          <div className="h-[310px] w-full bg-red-500"></div>
        </div>
      </div>
    </div>
  );
}
