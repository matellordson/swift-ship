"use server";

import { SigninSchemaTypes } from "../auth/signin/page";
import * as bcrypt from "bcrypt";
import { db } from "@/src/db";
import { lucia } from "@/utils/auth";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import argon from "argon2";

export default async function SigninAction(values: SigninSchemaTypes) {
  const existingUser = await db.query.userTable.findFirst({
    where: (table) => eq(table.username, values.username),
  });

  if (!existingUser?.username || !existingUser.password_hash) {
    return {
      error: "User not found",
    };
  }

  const isValidPassword = await bcrypt.compare(
    values.password,
    existingUser.password_hash,
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
