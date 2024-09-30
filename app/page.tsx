import { redirect } from "next/navigation";
import { validateRequest } from "@/utils/auth";
import { Introduction } from "@/components/landing/introduction";

export default async function Home() {
  // const user = await validateRequest();
  // if (!user) {
  //   redirect("/auth/signin");
  // }
  return (
    <div>
      <Introduction />
    </div>
  );
}
