"use server";

import { revalidatePath } from "next/cache";

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
}

export async function signup(data: Auth) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    throw new Error("Sign up failed");
  }

  revalidatePath("/", "layout");
}

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error("Logout failed");
  }

  revalidatePath("/", "layout");
}
