"use server";

import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { WalletWhispererReportSchema } from "./schema";
import { createClient } from "@/utils/supabase/server";

async function generateReportData(context: string) {
  const result = await generateObject({
    model: openai("gpt-4o-mini"),
    schema: WalletWhispererReportSchema,
    prompt: `
    You are a helpful and accurate financial advisor AI. Based on the session context provided, generate a detailed financial report. Only use information directly available in the context. Do not invent or infer data that isn't explicitly stated. If any required field is missing from the context, return an empty string ("") instead of null, undefined, or fabricated values. Omit optional fields that do not apply to this session or are unsupported by the context. Your response must be a valid JSON object that adheres to the given schema. Do not include any extra commentary or text. Context input: ${context}
    `,
  });

  return result.object;
}

export async function generateReport(sessionId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const { data, error } = await supabase
    .from("sessions")
    .select("*")
    .eq("user_id", user.id)
    .eq("session_id", sessionId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    return null;
  }

  if (!data.has_generated_reports) {
    const object = await generateReportData(JSON.stringify(data.history));

    const { data: updatedData, error: updateError } = await supabase
      .from("sessions")
      .update({
        reports: object,
        has_generated_reports: true,
        session_goal: object.sessionGoal,
      })
      .eq("user_id", user.id)
      .eq("session_id", sessionId)
      .select("*")
      .single();

    if (updateError) {
      throw new Error(updateError.message);
    }

    if (updatedData.session_goal === "") {
      return null;
    }

    return updatedData;
  }

  return data;
}
