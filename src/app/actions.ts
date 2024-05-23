"use server";

import { openai } from "@ai-sdk/openai";

import { generateText } from "ai";

//with streaming
import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";

export async function getAnswer(question: string) {
  const { text, finishReason, usage } = await generateText({
    model: openai("gpt-4o"),
    prompt: question,
  });

  return { text, finishReason, usage };
}

//with streaming

export async function generate(input: string) {
  "use server";

  const stream = createStreamableValue("");

  (async () => {
    const { textStream } = await streamText({
      model: openai("gpt-3.5-turbo"),
      prompt: input,
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return { output: stream.value };
}
