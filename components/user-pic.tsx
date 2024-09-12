"use server";

import { auth } from "@/auth";
import Image from "next/image";

export async function GetUserProfilePicture() {
  const data = await auth();
  return (
    <Image
      src={data?.user?.image as string}
      alt={data?.user?.name as string}
      className="border"
    />
  );
}
