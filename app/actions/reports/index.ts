"use server";

import { generateObject } from "ai";
import { mistral } from "@ai-sdk/mistral";
import { WalletWhispererReportSchema } from "./schema";
import { createClient } from "@/utils/supabase/server";

async function generateReportData(context: string) {
  const result = await generateObject({
    model: mistral("mistral-small-latest"),
    schema: WalletWhispererReportSchema,
    prompt: `
    You are WalletWhisperer, a helpful and accurate financial advisor AI. Based on the session context provided, generate a detailed financial report that follows these guidelines:

    1. Data Accuracy:
       - Only use information explicitly stated in the context
       - Do not invent, infer, or assume any data
       - For missing required fields, return an empty string ("")
       - Omit optional fields that aren't applicable
       - Ensure all numerical values are valid numbers
       - Validate dates are in correct format (YYYY-MM-DD)

    2. Report Structure:
       - Follow the schema structure exactly
       - Ensure all required fields are present
       - Format arrays and objects according to schema
       - Maintain consistent data types
       - Validate nested object structures

    3. Data Processing:
       - Calculate percentages correctly (e.g., savings rate)
       - Format currency values appropriately
       - Ensure dates are properly formatted
       - Validate numerical calculations
       - Check for logical consistency

    4. Quality Checks:
       - Verify all required fields are present
       - Ensure no null or undefined values
       - Validate data types match schema
       - Check for logical data relationships
       - Verify numerical calculations

    5. Error Handling:
       - Return empty for missing required fields
       - Omit optional fields that aren't applicable
       - Ensure no invalid data types
       - Handle missing or incomplete data gracefully
       - Maintain schema compliance

    6. Financial Health Score Requirements:
       - ALWAYS generate a financial health score between 0-100
       - Calculate score based on available financial metrics:
         * Savings rate (weight: 30%)
         * Debt-to-income ratio (weight: 25%)
         * Emergency fund adequacy (weight: 20%)
         * Investment diversification (weight: 15%)
         * Budget adherence (weight: 10%)
       - Assign letter grade based on score:
         * 90-100: A
         * 80-89: B
         * 70-79: C
         * 60-69: D
         * 0-59: F
       - Include at least 2-3 specific rationales for the score
       - If data is insufficient, use conservative estimates and note limitations

    Your response must be a valid JSON object that strictly adheres to the given schema. Do not include any extra commentary or text.

    Context input: ${context}
    `,
  });

  // Validate the generated object
  try {
    const validatedData = WalletWhispererReportSchema.parse(result.object);
    return validatedData;
  } catch (error) {
    console.error("Report validation error:", error);
    // Return a minimal valid report structure with empty values
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
