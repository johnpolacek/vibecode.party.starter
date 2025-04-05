import { useState } from "react"

interface ImageResponse {
  imageUrl: string
  success: boolean
  error?: string
}

export function useGenerateImage() {
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>("")

  const generate = async (prompt: string) => {
    setError("")
    setIsLoading(true)
    try {
      const response = await fetch("/api/ai/generate/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: prompt,
          userId: "demo", // Using a demo folder for the AI demo
          deckId: "ai-demo" // Using a fixed demo deck ID
        }),
      })

      const data: ImageResponse = await response.json()

      if (!data.success) {
        throw new Error(data.error || "Failed to generate image")
      }

      setImageUrl(data.imageUrl)
    } catch (err) {
      console.error("Error generating image:", err)
      setError(err instanceof Error ? err.message : "Failed to generate image")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    imageUrl,
    isLoading,
    error,
    generate,
  }
} 