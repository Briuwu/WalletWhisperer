import { SYSTEM_PROMPT } from "@/lib/constant";
// import { openai } from "@ai-sdk/openai";
import { mistral } from "@ai-sdk/mistral";
import { streamText } from "ai";

const model = mistral("mistral-small-latest");

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model,
    system: SYSTEM_PROMPT,
    messages,
  });

  return result.toDataStreamResponse();
}
