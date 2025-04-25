import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Heading } from "@/components/typography/heading"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sparkles } from "lucide-react"
import { CursorPrompt } from "./cursor-prompt"

export default async function GetStartedAI() {
  // Check for required configuration
  const hasOpenAI = process.env.OPENAI_API_KEY
  const hasReplicate = process.env.REPLICATE_API_TOKEN && process.env.REPLICATE_MODEL

  const cursorPrompt = `Please help me remove AI functionality from my project by:

1. Deleting these files:
   - app/api/ai/generate/text/route.ts
   - app/api/ai/generate/image/route.ts
   - app/api/ai/generate/object/route.ts
   - app/api/ai/generate/strings/route.ts
   - app/_hooks/useGenerateText.ts
   - app/_hooks/useGenerateImage.ts
   - app/_hooks/useGenerateObject.ts
   - app/_hooks/useGenerateStrings.ts
   - app/demo/ai/page.tsx
   - components/demo/ai-demo-client.tsx
   - app/get-started/_components/getstarted-ai.tsx

2. Removing these dependencies from package.json:
   - @ai-sdk/openai
   - @ai-sdk/react
   - @ai-sdk/replicate
   - ai

3. Removing these environment variables from .env:
   - OPENAI_API_KEY
   - REPLICATE_API_TOKEN
   - REPLICATE_MODEL

4. And remove getstarted-ai from the get-started page

After these changes, please run \`pnpm install\` to update the dependency tree.`

  return (
    <>
      {!hasOpenAI || !hasReplicate ? (
        <div className="max-w-4xl mx-auto px-4 w-full">
          <Card className="p-8 mt-8 w-full">
            <Heading variant="h4" className="text-primary">
              Setup Required: AI Integrations
            </Heading>
            <p>To set up AI functionality for text and image generation:</p>
            <ol className="list-decimal pl-6 space-y-4">
              <li>
                <strong>Set up OpenAI:</strong>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>
                    Create an account on{" "}
                    <a href="https://platform.openai.com/signup" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      OpenAI Platform
                    </a>
                  </li>
                  <li>Go to the API keys section</li>
                  <li>Create a new API key</li>
                </ul>
              </li>
              <li>
                <strong>Set up Replicate:</strong>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>
                    Create an account on{" "}
                    <a href="https://replicate.com/signin" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Replicate
                    </a>
                  </li>
                  <li>Go to your account settings</li>
                  <li>Create an API token</li>
                  <li>
                    Choose your preferred model from the{" "}
                    <a href="https://replicate.com/explore" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      model collection
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                Create or update your <code className="px-2 py-1 bg-muted rounded">.env</code> file with the following variables:
                <pre className="mt-2 p-4 bg-muted rounded-md max-w-xl overflow-x-auto">
                  <code>
                    # AI Keys{"\n"}
                    OPENAI_API_KEY=your_openai_api_key{"\n"}
                    REPLICATE_API_TOKEN=your_replicate_token{"\n"}
                    REPLICATE_MODEL=your_chosen_model_id
                  </code>
                </pre>
              </li>
              <li>Restart your development server after adding the environment variables</li>
            </ol>

            <div className="mt-6 space-y-4">
              <div className="p-4 bg-amber-50 rounded-md">
                <p className="text-amber-800 text-sm">
                  <strong>Security Note:</strong> Never commit your API keys to version control. Always use environment variables for sensitive data. Monitor your API usage to avoid unexpected costs.
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-md">
                <p className="text-blue-800 text-sm">
                  <strong>Cost Management Tip:</strong> Set up usage limits in both OpenAI and Replicate dashboards to prevent unexpected charges. Use smaller models during development.
                </p>
              </div>
            </div>

            <div className="pt-8">
              <CursorPrompt prompt={cursorPrompt} heading="Don't need AI integration?" />
            </div>
          </Card>
        </div>
      ) : (
        <div className="mx-auto text-center max-w-2xl w-full">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="features">
              <AccordionTrigger className="text-green-600 font-semibold">✓ AI Integrations are configured!</AccordionTrigger>
              <AccordionContent>
                <div className="text-left">
                  <p className="mb-4">Your AI system is ready to use. You can now:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Generate text content with OpenAI</li>
                    <li>Create AI-powered images with Replicate</li>
                    <li>Customize model parameters</li>
                    <li>Monitor API usage and costs</li>
                  </ul>
                  <div className="mt-6 space-y-4">
                    <div className="p-4 bg-blue-50 rounded-md">
                      <p className="text-blue-800 text-sm">
                        <strong>Tip:</strong> Monitor your usage and costs in the{" "}
                        <a href="https://platform.openai.com/usage" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          OpenAI Dashboard
                        </a>{" "}
                        and{" "}
                        <a href="https://replicate.com/account/usage" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          Replicate Dashboard
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button asChild className="w-[210px]">
                    <Link href="/demo/ai">
                      <Sparkles className="w-5 h-5 scale-110 text-amber-300" />
                      Open AI Demo
                    </Link>
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </>
  )
}
