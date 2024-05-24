"use server";

import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

//with streaming
import { createStreamableValue, getMutableAIState, streamUI } from "ai/rsc";
import { streamObject } from "ai";

export async function getNotifications(input: string) {
  "use server";

  const { object: notifications } = await generateObject({
    model: openai("gpt-4o"),
    system: "You generate three notifications for a messages app.",
    prompt: input,
    schema: z.object({
      notifications: z.array(
        z.object({
          name: z.string().describe("Name of a fictional person."),
          message: z.string().describe("Do not use emojis or links."),
          minutesAgo: z.number(),
        })
      ),
    }),
  });

  return { notifications };
}

//With streaming

export async function generate(input: string) {
  "use server";

  const stream = createStreamableValue();

  (async () => {
    const { partialObjectStream } = await streamObject({
      model: openai("gpt-4o"),
      system: "You generate three notifications for a messages app.",
      prompt: input,
      schema: z.object({
        notifications: z.array(
          z.object({
            name: z.string().describe("Name of a fictional person."),
            message: z.string().describe("Do not use emojis or links."),
            minutesAgo: z.number(),
          })
        ),
      }),
    });

    for await (const partialObject of partialObjectStream) {
      stream.update(partialObject);
    }

    stream.done();
  })();

  return { object: stream.value };
}

// With react server component

// export async function generateWithComponent(input: string) {
//   "use server";

//   const history = getMutableAIState();

//   const result = await streamUI({
//     model: openai("gpt-4o"),
//     system: "You generate three notifications for a messages app.",
//   });
// }
