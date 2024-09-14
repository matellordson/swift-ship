"use server";

import { SignupSchema } from "../auth/signup/page";
import { z } from "zod";
import * as argon2 from "argon2";
import { generateId } from "lucia";
import { db } from "@/src/db";
import { userTable } from "@/src/db/schema";
import { lucia } from "@/utils/auth";
import { cookies } from "next/headers";

export default async function SignupAction(
  values: z.infer<typeof SignupSchema>,
) {
  const hashedPassword = await argon2.hash(values.password_hash);
  const userId = generateId(15);

  try {
    await db
      .insert(userTable)
      .values({
        id: userId,
        username: values.username,
        password_hash: hashedPassword,
      })
      .returning({
        id: userTable.id,
        username: userTable.username,
      });

    const session = await lucia.createSession(userId, {
      expiresIn: 60 * 60 * 24 * 30,
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return {
      success: true,
      data: {
        userId,
      },
    };
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
}
