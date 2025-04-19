"use client"
import { useChat } from "@ai-sdk/react"

export function useGenerateText() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/ai/generate/text",
  })

  const streamText = async (prompt: string, onUpdate: (output: string) => void) => {
    
    const response = await fetch("/api/ai/generate/text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: prompt + " - Use smart quotes and avoid using backslashes" }),
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const data = response.body
    if (!data) {
      return
    }

    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false
    let accumulatedResponse = ""

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)

      // Handle chunks with "0:" prefix
      const chunks = chunkValue.split(/(?=\d+:"|[ed]:"|f:)/).filter(Boolean)

      for (const chunk of chunks) {
        // Skip metadata chunks (including messageId)
        if (chunk.startsWith("f:") || chunk.startsWith("e:") || chunk.startsWith("d:")) {
          continue
        }

        if (chunk.startsWith('0:"')) {
          // Extract content between quotes for "0:" prefixed chunks
          const content = chunk.match(/0:"([^"]*)"/)
          if (content) {
            // Replace literal \n\n with actual newlines and clean up backslashed quotes
            accumulatedResponse += content[1]
              .replace(/\\n\\n/g, "\n\n")
              .replace(/\\"/g, '"')
              .replace(/\\\\/g, "\\")
          }
        } else {
          // Fallback: try to extract any quoted content
          const content = chunk.match(/"([^"]*)"/)
          if (content) {
            // Replace literal \n\n with actual newlines and clean up backslashed quotes
            accumulatedResponse += content[1]
              .replace(/\\n\\n/g, "\n\n")
              .replace(/\\"/g, '"')
              .replace(/\\\\/g, "\\")
          } else {
            // Replace literal \n\n with actual newlines and clean up backslashed quotes
            accumulatedResponse += chunk
              .replace(/\\n\\n/g, "\n\n")
              .replace(/\\"/g, '"')
              .replace(/\\\\/g, "\\")
          }
        }
      }
      onUpdate(accumulatedResponse)
    }

    return accumulatedResponse
  }

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    streamText,
  }
}