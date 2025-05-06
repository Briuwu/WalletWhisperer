import { z } from "zod";

export const WalletWhispererReportSchema = z.object({
  sessionGoal: z.string(),

  sessionSummary: z.object({
    topicsDiscussed: z.array(z.string()),
    userIntent: z.string(),
  }),

  financialSnapshot: z.object({
    monthlyIncome: z.number(),
    fixedExpenses: z.number(),
    variableExpenses: z.number(),
    currentSavingsRatePercent: z
      .number()
      .describe("Percentage (e.g., 7 for 7%)"),
    notableDebts: z
      .array(
        z.object({
          type: z.string(),
          amount: z.number(),
          interestRate: z.number().describe("Percentage APR (e.g., 19.9)"),
        }),
      )
      .optional(),
  }),

  keyObservations: z.array(z.string()),

  smartSuggestions: z.array(z.string()),

  forecastsAndProjections: z.object({
    vacationSavingsGoal: z
      .object({
        amount: z.number(),
        targetDate: z.string().datetime(),
        onTrack: z.boolean(),
        projectedCompletionDate: z.string().datetime(),
      })
      .optional(),

    debtPayoffProjection: z
      .object({
        currentPlan: z.string(),
        acceleratedPlan: z.object({
          extraPayment: z.number(),
          newDuration: z.string(),
          interestSaved: z.number(),
        }),
      })
      .optional(),
  }),

  financialHealthScore: z
    .object({
      score: z.number().min(0).max(100),
      grade: z.string(), // Could be "A", "B-", etc.
      rationale: z.array(z.string()),
    })
    .optional(),

  nextStepsPrompt: z.string(),
});
