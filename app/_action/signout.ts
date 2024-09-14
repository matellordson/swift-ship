import { lucia, sessionId } from "@/utils/auth";
import { cookies } from "next/headers";

export default async function Signout() {
  try {
    const session = await sessionId;

    if (!session) {
      return {
        error: "unauthorized",
      };
    }

    await lucia.invalidateSession(session.name);

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
