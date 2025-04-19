import { openai } from "@ai-sdk/openai"
import { streamObject } from "ai"
import { z } from "zod"
import { requireAuthMiddleware } from "../../_auth"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

// Helper function to get a readable schema description
// function describeSchema(schema: z.ZodTypeAny): any {
//   if (schema instanceof z.ZodObject) {
//     const shape: Record<string, any> = {}
//     for (const [key, value] of Object.entries(schema.shape)) {
//       shape[key] = describeSchema(value as z.ZodTypeAny)
//     }
//     return { type: "object", shape }
//   } else if (schema instanceof z.ZodArray) {
//     return { type: "array", items: describeSchema(schema.element) }
//   } else if (schema instanceof z.ZodString) {
//     return { type: "string" }
//   } else if (schema instanceof z.ZodNumber) {
//     return { type: "number" }
//   } else if (schema instanceof z.ZodBoolean) {
//     return { type: "boolean" }
//   }
//   return { type: "unknown" }
// }

// Define schema field type interface
interface SchemaField {
  type: "string" | "number" | "boolean" | "array" | "object"
  optional?: boolean
  items?: SchemaField
  properties?: Record<string, SchemaField>
}

// Define the schema for field definitions
const fieldSchema: z.ZodType<SchemaField> = z.object({
  type: z.enum(["string", "number", "boolean", "array", "object"]),
  optional: z.boolean().optional(),
  properties: z.record(z.lazy(() => fieldSchema)).optional(),
  items: z.lazy(() => fieldSchema).optional(),
})

// Define the schema for the request body
const requestSchema = z.object({
  schema: fieldSchema,
  prompt: z.string(),
})

function createZodSchema(shape: SchemaField | Record<string, SchemaField>): z.ZodTypeAny {
  // If it's a record of fields (root schema), create an object schema
  if (!("type" in shape)) {
    const schema: Record<string, z.ZodTypeAny> = {}
    for (const [key, def] of Object.entries(shape)) {
      schema[key] = createZodSchema(def)
    }
    return z.object(schema)
  }

  // Handle individual field schemas
  if (shape.type === "object" && shape.properties) {
    const schema: Record<string, z.ZodTypeAny> = {}
    for (const [key, def] of Object.entries(shape.properties)) {
      schema[key] = createZodSchema(def)
    }
    return z.object(schema)
  }

  let fieldSchema: z.ZodTypeAny

  switch (shape.type) {
    case "string":
      fieldSchema = z.string()
      break
    case "number":
      fieldSchema = z.number()
      break
    case "boolean":
      fieldSchema = z.boolean()
      break
    case "array":
      fieldSchema = z.array(shape.items ? createZodSchema(shape.items) : z.any())
      break
    default:
      fieldSchema = z.any()
  }

  if (shape.optional) {
    fieldSchema = fieldSchema.optional()
  }

  return fieldSchema
}

export async function POST(req: Request) {
  // Check authentication
  const authError = await requireAuthMiddleware()
  if (authError) return authError

  try {
    const body = await req.json()
    const { schema: schemaShape, prompt } = requestSchema.parse(body)

    // Create a new schema from the shape
    const schema = createZodSchema(schemaShape)
    
    const result = streamObject({
      model: openai("gpt-4.1-nano"),
      schema,
      prompt,
    })
    
    return result.toTextStreamResponse()
  } catch (error) {
    console.error("Error in generate object route:", error)
    return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400 })
  }
}
