import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"
import { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  const { input, messages, system } = await request.json()

  let chatMessages = []

  if (messages) {
    chatMessages = messages
  } else if (input) {
    chatMessages = [{ role: "user", content: input }]
  }

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages: chatMessages,
    ...(system && { system }),
  })

  return result.toDataStreamResponse()
}
