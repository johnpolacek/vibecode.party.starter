import { experimental_useObject as useObject } from '@ai-sdk/react';
import { z } from "zod"
import { useState, useEffect, useRef } from "react"

const responseSchema = z.object({
  strings: z.array(z.string()),
})

type ResponseType = z.infer<typeof responseSchema>

export function useGenerateStrings() {
  const [strings, setStrings] = useState<string[]>([])
  const [error, setError] = useState<string>("")
  const promiseRef = useRef<{
    resolve: (value: string[]) => void;
    reject: (reason?: Error | unknown) => void;
  } | null>(null);

  const {
    object: response,
    isLoading,
    submit,
    error: objectError,
  } = useObject<ResponseType>({
    api: "/api/ai/generate/strings",
    schema: responseSchema,
  })

  useEffect(() => {
    if (objectError) {
      console.error("useGenerateStrings error:", objectError)
      setError("An error occurred while generating strings.")
      if (promiseRef.current) {
        promiseRef.current.reject(objectError);
        promiseRef.current = null;
      }
    }
  }, [objectError])

  useEffect(() => {
    if (response?.strings) {
      const validStrings = response.strings.filter((s): s is string => typeof s === "string")
      setStrings(validStrings)
    }
  }, [response])

  // Effect to resolve the promise when loading completes
  useEffect(() => {
    // If we were loading and now we're not, and we have a promise to resolve
    if (!isLoading && promiseRef.current && response?.strings) {
      const validStrings = response.strings.filter((s): s is string => typeof s === "string")
      promiseRef.current.resolve(validStrings);
      promiseRef.current = null;
    }
  }, [isLoading, response]);

  const generate = async (prompt: string, count: number = 6) => {
    setError("")
    setStrings([])
    
    return new Promise<string[]>((resolve, reject) => {
      try {
        // Store the promise callbacks
        promiseRef.current = { resolve, reject };
        
        // Submit the request
        submit({
          prompt,
          count,
        })
        
        // Set a timeout of 30 seconds
        const timeoutId = setTimeout(() => {
          if (promiseRef.current) {
            promiseRef.current.reject(new Error("Timed out waiting for string generation"));
            promiseRef.current = null;
          }
        }, 30000);
        
        // Clean up timeout if component unmounts
        return () => clearTimeout(timeoutId);
      } catch (error) {
        console.error("Error submitting string generation:", error)
        setError("An error occurred while generating strings.")
        reject(error);
        promiseRef.current = null;
      }
    })
  }

  return {
    strings,
    isLoading,
    error,
    generate,
  }
}
