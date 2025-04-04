import { openai } from "@ai-sdk/openai"
import { streamObject } from "ai"
import { z } from "zod"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { prompt, count = 6 } = body

    const result = streamObject({
      model: openai("gpt-4o-mini"),
      schema: z.object({
        strings: z.array(z.string()).describe("Array of generated strings based on the prompt"),
      }),
      prompt: `${prompt}\n\nGenerate exactly ${count} responses. Return them in a JSON object with a "strings" array property.`,
    })

    console.log("Generate strings API streaming response started")
    return result.toTextStreamResponse()
  } catch (error) {
    console.error("Error in generate strings route:", error)
    return new Response(JSON.stringify({ error: "Failed to generate strings" }), { status: 500 })
  }
}
