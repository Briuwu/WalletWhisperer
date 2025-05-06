import { z } from "zod";

export const WalletWhispererReportSchema = z.object({
  sessionGoal: z
    .string()
    .describe("The primary financial objective discussed during the session."),

  sessionSummary: z
    .object({
      topicsDiscussed: z
        .array(z.string())
        .describe("List of major financial topics covered."),
      userIntent: z
        .string()
        .describe(
          "Summary of the user's main goal or financial concern in their own words.",
        ),
    })
    .describe(
      "A summary of the session's main topics and the user's financial intent.",
    ),

  financialSnapshot: z
    .object({
      monthlyIncome: z
        .number()
        .describe("The user's reported monthly income in dollars."),
      fixedExpenses: z.number().describe("Total fixed monthly expenses."),
      variableExpenses: z.number().describe("Total variable monthly expenses"),
      currentSavingsRatePercent: z
        .number()
        .describe(
          "Current savings rate as a percentage of monthly income (e.g., 7 for 7%).",
        ),
      notableDebts: z
        .array(
          z.object({
            type: z
              .string()
              .describe(
                "Type of debt (e.g., credit card, student loan, car loan).",
              ),
            amount: z
              .number()
              .describe("Outstanding balance of this debt in dollars."),
            interestRate: z
              .number()
              .describe(
                "Annual interest rate percentage (e.g., 19.9 for 19.9%).",
              ),
          }),
        )
        .describe("A list of significant debts the user currently has."),
    })
    .describe(
      "Snapshot of the user's income, expenses, and debt at the time of the session.",
    ),

  keyObservations: z
    .array(z.string())
    .describe(
      "Important findings or patterns from the session, such as overspending or missing savings goals.",
    ),

  smartSuggestions: z
    .array(z.string())
    .describe(
      "Actionable advice tailored to the user's situation, such as reducing specific expenses or changing saving strategies.",
    ),

  forecastsAndProjections: z
    .object({
      vacationSavingsGoal: z
        .object({
          amount: z
            .number()
            .describe("Total target amount for the savings goal."),
          targetDate: z
            .string()
            .describe(
              "The user’s desired completion date (e.g., '2025-12-01').",
            ),
          onTrack: z
            .boolean()
            .describe(
              "Whether the user is currently on track to meet the savings goal.",
            ),
          projectedCompletionDate: z
            .string()
            .describe(
              "The estimated date the goal will be reached based on current savings behavior.",
            ),
        })
        .describe(
          "Details about a user-defined savings goal, such as a vacation or large purchase.",
        ),

      debtPayoffProjection: z
        .object({
          currentPlan: z
            .string()
            .describe(
              "How long it will take to pay off debt under the current strategy.",
            ),
          acceleratedPlan: z
            .object({
              extraPayment: z
                .number()
                .describe(
                  "Suggested extra monthly payment to accelerate debt payoff.",
                ),
              newDuration: z
                .string()
                .describe(
                  "New projected payoff time with extra payments (e.g., '13 months').",
                ),
              interestSaved: z
                .number()
                .describe(
                  "Estimated interest saved by following the accelerated plan.",
                ),
            })
            .describe(
              "Improved debt repayment plan based on additional contributions.",
            ),
        })
        .describe(
          "Projections for debt payoff under current and improved strategies.",
        ),
    })
    .describe("Forecasts related to goals and debt repayment timelines."),

  financialHealthScore: z
    .object({
      score: z
        .number()
        .min(0)
        .max(100)
        .describe(
          "A score between 0 and 100 indicating the user’s overall financial health.",
        ),
      grade: z
        .string()
        .describe(
          "A letter grade representation of financial health (e.g., 'A', 'B-', etc.).",
        ),
      rationale: z
        .array(z.string())
        .describe(
          "A list of reasons or factors that contributed to the financial health score.",
        ),
    })
    .describe(
      "Evaluation of the user's financial well-being based on session data.",
    ),

  nextStepsPrompt: z
    .string()
    .describe(
      "Final message prompting the user to take a next step, such as reviewing the report or setting reminders.",
    ),
});
