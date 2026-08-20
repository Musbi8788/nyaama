"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

export type AuthState = { error?: string } | undefined;

const signupSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("That doesn't look like an email address."),
  password: z.string().min(8, "Use at least 8 characters."),
});

const loginSchema = z.object({
  email: z.string().trim().email("That doesn't look like an email address."),
  password: z.string().min(1, "Please enter your password."),
});

/**
 * Supabase error messages are written for developers. Learners get plain
 * language instead — and we never confirm whether an email exists, which
 * would let anyone test addresses against our user list.
 */
function humanise(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("already registered") || m.includes("already been registered"))
    return "That email is already registered. Try logging in instead.";
  if (m.includes("invalid login credentials"))
    return "That email and password don't match. Please check both.";
  if (m.includes("email not confirmed"))
    return "Please confirm your email address, then log in.";
  if (m.includes("rate limit") || m.includes("too many"))
    return "Too many attempts. Please wait a moment and try again.";
  return "Something went wrong. Please try again.";
}

export async function signup(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = signupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    // Read by the handle_new_user trigger to populate profiles.name.
    options: { data: { name: parsed.data.name } },
  });

  if (error) return { error: humanise(error.message) };

  // With email confirmation on, signUp returns a user but no session.
  // Say so plainly rather than bouncing them to a page they can't load.
  if (!data.session) {
    return {
      error:
        "Account created. Check your email for a confirmation link, then log in.",
    };
  }

  revalidatePath("/", "layout");
  redirect("/welcome");
}

export async function login(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) return { error: humanise(error.message) };

  const next = String(formData.get("next") || "/app");
  revalidatePath("/", "layout");
  redirect(next.startsWith("/") ? next : "/app");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
