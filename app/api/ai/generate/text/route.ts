import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"
import { NextRequest } from "next/server"
import { requireAuthMiddleware } from "../../_auth"

export async function POST(request: NextRequest) {
  // Check authentication
  const authError = await requireAuthMiddleware()
  if (authError) return authError

  const { input, messages, system } = await request.json()

  let chatMessages = []

  if (messages) {
    chatMessages = messages
  } else if (input) {
    chatMessages = [{ role: "user", content: input }]
  }

  const result = streamText({
    model: openai("gpt-4.1-nano"),
    messages: chatMessages,
    ...(system && { system }),
  })

  return result.toDataStreamResponse()
}
