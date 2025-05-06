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
    You are a financial advisor. Based on the following context, generate a detailed financial report. The report should include a summary of the session, key observations, smart suggestions, forecasts and projections, and a financial health score. Please respond using a JSON object that strictly follows this Zod schema. Omit optional fields if not relevant to the session. If there is not enough data, just add an empty string ${context}`,
  });

  if (!result.object) {
    return null;
  }

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

    if (!object) {
      return null;
    }

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

    if (!updatedData) {
      return null;
    }

    return updatedData;
  }

  return data;
}
