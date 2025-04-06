"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useGenerateText } from "@/app/_hooks/useGenerateText"
import { useGenerateStrings } from "@/app/_hooks/useGenerateStrings"
import { useGenerateObject } from "@/app/_hooks/useGenerateObject"
import { useGenerateImage } from "@/app/_hooks/useGenerateImage"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export function AIDemoClient({ isMissingReplicateToken }: { isMissingReplicateToken: boolean }) {
  const [generatedText, setGeneratedText] = useState("")
  const [generatedStrings, setGeneratedStrings] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const { streamText } = useGenerateText()
  const { generate: generateStrings } = useGenerateStrings()
  const { generate: generateObject, object: generatedObject, isLoading: isGeneratingObject } = useGenerateObject()
  const { generate: generateImage, imageUrl, isLoading: isGeneratingImage, error: imageError } = useGenerateImage()

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

  const handleGenerateObject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const prompt = formData.get("prompt") as string

    if (!prompt) return

    await generateObject(prompt)
  }

  const handleGenerateImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const prompt = formData.get("prompt") as string

    if (!prompt) return

    await generateImage(prompt)
  }

  return (
    <Tabs defaultValue="text" className="space-y-8">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="text">Text</TabsTrigger>
        <TabsTrigger value="strings">String Array</TabsTrigger>
        <TabsTrigger value="object">Structured Data</TabsTrigger>
        <TabsTrigger value="image">Image</TabsTrigger>
      </TabsList>

      <TabsContent value="text" className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <div>Text Generation</div>
              <div className="font-mono text-sm font-normal text-primary">useGenerateText()</div>
            </CardTitle>
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
            <CardTitle className="flex justify-between items-center">
              <div>String Array Generation</div>
              <div className="font-mono text-sm font-normal text-primary">useGenerateStrings()</div>
            </CardTitle>
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

      <TabsContent value="object" className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <div>Structured Data Generation</div>
              <div className="font-mono text-sm font-normal text-primary">useGenerateObject()</div>
            </CardTitle>
            <CardDescription>Generate structured data about a person. The AI will create a profile with name, age, occupation, interests, and contact information.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerateObject} className="space-y-4">
              <Textarea name="prompt" placeholder="Describe the person you want to generate data for..." className="min-h-[100px]" />
              <Button type="submit" className="w-full" disabled={isGeneratingObject}>
                {isGeneratingObject ? "Generating..." : "Generate Profile"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {generatedObject && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div>
                  <dt className="font-semibold">Name</dt>
                  <dd>{generatedObject.name}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Age</dt>
                  <dd>{generatedObject.age}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Occupation</dt>
                  <dd>{generatedObject.occupation}</dd>
                </div>
                {generatedObject.interests && (
                  <div>
                    <dt className="font-semibold">Interests</dt>
                    <dd>
                      <ul className="list-disc pl-6">
                        {generatedObject.interests.map((interest, index) => (
                          <li key={index}>{interest}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
                {generatedObject.contact && (
                  <div>
                    <dt className="font-semibold">Contact</dt>
                    <dd className="space-y-1">
                      <div>Email: {generatedObject.contact.email}</div>
                      <div>Phone: {generatedObject.contact.phone}</div>
                    </dd>
                  </div>
                )}
              </dl>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="image" className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <div>Image Generation</div>
              <div className="font-mono text-sm font-normal text-primary">useGenerateImage()</div>
            </CardTitle>
            <CardDescription>Generate an image based on your description.</CardDescription>
          </CardHeader>
          <CardContent>
            {isMissingReplicateToken ? (
              <div className="flex flex-col items-center justify-center h-32 p-4 bg-muted rounded-lg text-red-600">
                <p>Please configure your Replicate API token to enable image generation.</p>
              </div>
            ) : (
              <>
                <div className="font-mono text-xs -mt-4 mb-1 w-full text-right text-muted-foreground">black-forest-labs/flux-schnell</div>
                <form onSubmit={handleGenerateImage} className="space-y-4">
                  <Textarea name="prompt" placeholder="Describe the image you want to generate..." className="min-h-[100px]" />
                  <Button type="submit" className="w-full" disabled={isGeneratingImage}>
                    {isGeneratingImage ? "Generating..." : "Generate Image"}
                  </Button>
                </form>
              </>
            )}
          </CardContent>
        </Card>

        {imageError && (
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{imageError}</p>
            </CardContent>
          </Card>
        )}

        {imageUrl && !imageError && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg">
                <Image src={imageUrl} alt="AI generated image" fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority />
              </div>
            </CardContent>
          </Card>
        )}
      </TabsContent>
    </Tabs>
  )
}
