"use server";

import { lucia, validateRequest } from "@/utils/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Signout() {
  try {
    const { session } = await validateRequest();

    if (!session) {
      return {
        error: "unauthorized",
      };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
}
