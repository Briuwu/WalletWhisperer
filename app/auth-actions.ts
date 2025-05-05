"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

type Auth = {
  email: string;
  password: string;
};

export async function login(data: Auth) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    throw new Error("Login failed");
  }

  revalidatePath("/", "layout");
  redirect("/home");
}

export async function signup(data: Auth) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    throw new Error("Sign up failed");
  }

  revalidatePath("/", "layout");
  redirect("/login");
}
