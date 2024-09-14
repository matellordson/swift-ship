import { redirect } from "next/navigation";
import { validateRequest } from "@/utils/auth";

export default async function Home() {
  const user = await validateRequest();
  if (!user) {
    redirect("/auth/signin");
  }
  return <div>hello</div>;
}
