import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { WalletWhispererReportSchema } from "./schema";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const context = await req.json();

  const result = streamObject({
    model: openai("gpt-4o-mini"),
    schema: WalletWhispererReportSchema,
    prompt: `
      You are a financial advisor. Based on the following context, generate a detailed financial report. The report should include a summary of the session, key observations, smart suggestions, forecasts and projections, and a financial health score. ${context}`,
  });

  return result.toTextStreamResponse();
}
