"use server";

import { SignupSchemaTypes } from "../auth/signup/page";
import { z } from "zod";
import * as bcrypt from "bcrypt";
import { generateId } from "lucia";
import { db } from "@/src/db";
import { roleEnums, userTable } from "@/src/db/schema";
import { lucia } from "@/utils/auth";
import { cookies } from "next/headers";
import { supabase } from "@/src/db/supabase";
import { validateRequest } from "@/utils/auth";

export default async function SignupAction(values: SignupSchemaTypes) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(values.password, saltRounds);
  const userId = generateId(15);
  const userRole = await validateRequest();

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

    await supabase.from("user").insert({
      id: userId,
      user_name: values.username,
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
