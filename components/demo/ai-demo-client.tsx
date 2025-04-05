"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useGenerateText } from "@/app/_hooks/useGenerateText"
import { useGenerateStrings } from "@/app/_hooks/useGenerateStrings"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

export function AIDemoClient() {
  const [generatedText, setGeneratedText] = useState("")
  const [generatedStrings, setGeneratedStrings] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const { streamText } = useGenerateText()
  const { generate: generateStrings } = useGenerateStrings()

  const handleGenerateText = async (e: React.FormEvent<HTMLFormElement>) => {
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

  const handleGenerateStrings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const prompt = formData.get("prompt") as string
    const count = Number(formData.get("count")) || 6

    if (!prompt) return

    setIsGenerating(true)
    try {
      const strings = await generateStrings(prompt, count)
      setGeneratedStrings(strings)
    } catch (error) {
      console.error("Error generating strings:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Tabs defaultValue="text" className="space-y-8">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="text">Text Generation</TabsTrigger>
        <TabsTrigger value="strings">String Array Generation</TabsTrigger>
      </TabsList>

      <TabsContent value="text" className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Text Generation</CardTitle>
            <CardDescription>Enter a prompt and the AI will generate text based on your input.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerateText} className="space-y-4">
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
      </TabsContent>

      <TabsContent value="strings" className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>String Generation</CardTitle>
            <CardDescription>Generate multiple strings based on your prompt. Useful for brainstorming names, titles, or ideas.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerateStrings} className="space-y-4">
              <Textarea name="prompt" placeholder="Enter your prompt here..." className="min-h-[100px]" />
              <div className="flex items-center gap-4">
                <Input type="number" name="count" defaultValue="6" min="1" max="20" className="w-24" />
                <span className="text-sm text-muted-foreground">Number of strings to generate</span>
              </div>
              <Button type="submit" className="w-full" disabled={isGenerating}>
                {isGenerating ? "Generating..." : "Generate Strings"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {generatedStrings.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Strings</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2">
                {generatedStrings.map((string, index) => (
                  <li key={index}>{string}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </TabsContent>
    </Tabs>
  )
}
