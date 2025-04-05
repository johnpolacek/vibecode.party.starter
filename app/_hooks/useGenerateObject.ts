import { experimental_useObject as useObject } from "@ai-sdk/react"
import { z } from "zod"
import { useState } from "react"

// Example schema for a person
const personSchema = z.object({
  name: z.string().describe("The person's full name"),
  age: z.number().describe("The person's age"),
  occupation: z.string().describe("The person's job or profession"),
  interests: z.array(z.string()).describe("List of the person's hobbies and interests"),
  contact: z.object({
    email: z.string().email().describe("The person's email address"),
    phone: z.string().describe("The person's phone number"),
  }).describe("Contact information"),
})

type Person = z.infer<typeof personSchema>

export function useGenerateObject() {
  const [error, setError] = useState<string>("")
  const { object, isLoading, submit } = useObject<Person>({
    api: "/api/ai/generate/object",
    schema: personSchema,
  })

  const generate = async (prompt: string) => {
    setError("")
    try {
      await submit({
        schema: {
          type: "object",
          properties: {
            name: { type: "string" },
            age: { type: "number" },
            occupation: { type: "string" },
            interests: { 
              type: "array",
              items: { type: "string" }
            },
            contact: {
              type: "object",
              properties: {
                email: { type: "string" },
                phone: { type: "string" }
              }
            }
          }
        },
        prompt,
      })
    } catch (err) {
      console.error("Error generating object:", err)
      setError("Failed to generate structured data")
    }
  }

  return {
    object,
    isLoading,
    error,
    generate,
  }
} 