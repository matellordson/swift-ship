"use server";

import { lucia, validateRequest } from "@/utils/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signOut() {
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

    redirect("/login");
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
}
