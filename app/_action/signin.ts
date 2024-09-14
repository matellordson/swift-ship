"use server";

import { SigninSchemaTypes } from "../auth/signin/page";
import { z } from "zod";
import * as argon2 from "argon2";
import { db } from "@/src/db";
import { lucia } from "@/utils/auth";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";

export default async function SigninAction(values: SigninSchemaTypes) {
  const existingUser = await db.query.userTable.findFirst({
    where: (table) => eq(table.username, values.username),
  });

  if (!existingUser?.username) {
    return {
      error: "User not found",
    };
  }

  if (!existingUser.password_hash) {
    return {
      error: "User not found",
    };
  }

  const isValidPassword = await argon2.verify(
    existingUser.password_hash as string,
    values.password_hash,
  );

  if (!isValidPassword) {
    return {
      error: "Incorrect username or password",
    };
  }

  const session = await lucia.createSession(existingUser.id, {
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
      existingUser,
    },
  };
}
