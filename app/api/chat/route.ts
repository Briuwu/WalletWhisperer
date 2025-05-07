import { SYSTEM_PROMPT } from "@/lib/constant";
// import { openai } from "@ai-sdk/openai";
import { mistral } from "@ai-sdk/mistral";
import { streamText, tool } from "ai";
import { z } from "zod";

const model = mistral("mistral-small-latest");

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model,
    system: SYSTEM_PROMPT,
    messages,
    tools: {
      getDateTime: tool({
        description: "Get the current date and time",
        parameters: z.object({}),
        execute: async () => {
          return new Date().toLocaleString();
        },
      }),
      calculateDate: tool({
        description: "Calculate the date of a given number of days from today",
        parameters: z.object({
          days: z.number().min(1, "Number of days must be positive"),
        }),
        execute: async ({ days }) => {
          const today = new Date();
          const resultDate = new Date(today);
          resultDate.setDate(today.getDate() + days);
          return resultDate.toLocaleDateString();
        },
      }),
    },
    maxRetries: 3,
  });

  return result.toDataStreamResponse();
}
