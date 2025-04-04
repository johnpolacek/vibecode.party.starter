"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useGenerateText } from "@/app/_hooks/useGenerateText"

export function AIDemoClient() {
  const [generatedText, setGeneratedText] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const { streamText } = useGenerateText()

  const handleGenerate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const prompt = formData.get("prompt") as string

    if (!prompt) return

    setIsGenerating(true)
    try {
      await streamText(prompt, (output: string) => {
        setGeneratedText(output)
      })
    } catch (error) {
      console.error("Error generating text:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Text Generation</CardTitle>
          <CardDescription>Enter a prompt and the AI will generate text based on your input.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleGenerate} className="space-y-4">
            <Textarea name="prompt" placeholder="Enter your prompt here..." className="min-h-[100px]" />
            <Button type="submit" className="w-full" disabled={isGenerating}>
              {isGenerating ? "Generating..." : "Generate Text"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {generatedText && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Text</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-wrap">{generatedText}</div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
