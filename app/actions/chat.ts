"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function endSession(
  sessionId: string,
  messages: {
    role: "assistant" | "system" | "user" | "data";
    content: string;
  }[],
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const { error } = await supabase.from("sessions").insert({
    session_id: sessionId,
    user_id: user.id,
    history: JSON.stringify(messages),
    has_generated_reports: false,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/home/chat");
}

export async function getSessions() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const { data, error } = await supabase
    .from("sessions")
    .select("session_id, session_goal, created_at")
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
