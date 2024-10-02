import { redirect } from "next/navigation";
import { validateRequest } from "@/utils/auth";
import { Introduction } from "@/components/landing/introduction";
import Freight from "@/components/landing/freight";
import { Shops } from "@/components/landing/shops";
import { Products } from "@/components/landing/products";
import HomePage from "@/components/homepage";

export default async function Home() {
  // const user = await validateRequest();
  // if (!user) {
  //   redirect("/auth/signin");
  // }
  return (
    <div className="mx-auto max-w-[200rem]">
      {/* <Introduction />
      <Freight />
      <Products /> */}
      <HomePage />
    </div>
  );
}
