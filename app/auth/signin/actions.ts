"use server";

import type { ActionError } from "@/lib/actions";
import { redirect } from "next/navigation";
import { setSessionCookie } from "@/lib/auth";
import { authenticateUser } from "@/lib/users";

export async function signInAction(
  formData: FormData
): Promise<undefined | ActionError> {
  // console.log("[signInAction]", formData);
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const user = await authenticateUser(email, password);
  if (!user) {
    return { isError: true, message: "Invalid credentials" };
  }
  await setSessionCookie(user);
  if (user.role == "ADMIN") {
    redirect("/dashboard");
  } else {
    redirect("/vrtour");
  }
}
