"use server";

import { generateObject } from "ai";
import { mistral } from "@ai-sdk/mistral";
import { WalletWhispererReportSchema } from "./schema";
import { createClient } from "@/utils/supabase/server";
import { REPORT_GENERATION_SYSTEM_PROMPT } from "@/lib/constant";

async function generateReportData(context: string) {
  const MAX_RETRIES = 3;
  let attempts = 0;
  let lastError = null;

  while (attempts < MAX_RETRIES) {
    try {
      const result = await generateObject({
        model: mistral("mistral-small-latest"),
        schema: WalletWhispererReportSchema,
        system: REPORT_GENERATION_SYSTEM_PROMPT,
        prompt: `Context input: ${context}`,
        maxRetries: 3,
      });

      // Validate the generated object
      const validatedData = WalletWhispererReportSchema.parse(result.object);
      return validatedData;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      lastError = error;
      attempts++;
      console.error(`Report generation attempt ${attempts} failed:`, error);

      if (attempts === MAX_RETRIES) {
        console.error(
          "Maximum retry attempts reached. Using fallback report structure.",
        );
        break;
      }

      // Add a small delay before retrying to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  // Return a minimal valid report structure with empty values as fallback
  return {
    sessionGoal: "",
    sessionSummary: {
      topicsDiscussed: [],
      userIntent: "",
    },
    financialSnapshot: {
      currency: "USD",
      monthlyIncome: 0,
      fixedExpenses: 0,
      variableExpenses: 0,
      currentSavingsRatePercent: 0,
      notableDebts: [],
    },
    recentAchievements: [],
    netWorth: {
      total: 0,
      changeSinceLast: 0,
      assetBreakdown: [],
      liabilityBreakdown: [],
    },
    keyObservations: [],
    smartSuggestions: [],
    forecastsAndProjections: {
      currency: "USD",
      vacationSavingsGoal: {
        amount: 0,
        targetDate: "",
        onTrack: false,
        projectedCompletionDate: "",
      },
      debtPayoffProjection: {
        currentPlan: "",
        acceleratedPlan: {
          extraPayment: 0,
          newDuration: "",
          interestSaved: 0,
        },
      },
    },
    financialHealthScore: {
      score: 0,
      grade: "N/A",
      rationale: [],
    },
    nextStepsPrompt: "",
  };
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
