import { Heading } from "@/components/typography/heading"
import { ConfigCard } from "@/components/admin/config-card"
import { AIDemoClient } from "@/components/demo/ai-demo-client"
import { checkAuth } from "@/lib/auth-utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SignInButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"

const requiredEnvVars = {
  OPENAI_API_KEY: "Your OpenAI API key",
}

export default async function AIDemo() {
  // Check authentication
  const { isAuthenticated } = await checkAuth()

  // Check for missing environment variables
  const missingEnvVars = Object.entries(requiredEnvVars).map(([key, description]) => ({
    key,
    description,
    isMissing: !process.env[key],
  }))

  const hasAllEnvVars = missingEnvVars.every((item) => !item.isMissing)
  const isMissingReplicateToken = !process.env.REPLICATE_API_TOKEN

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">AI SDK Integration</span>
        <Heading variant="h2" className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
          AI <span className="text-primary">Demo</span>
        </Heading>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">Try out generating text, images and structured data with AI.</p>
      </div>

      <div className="mx-auto max-w-2xl mt-12">
        {!isAuthenticated ? (
          <Card>
            <CardHeader>
              <CardTitle>Sign in Required</CardTitle>
              <CardDescription>Please sign in to access the AI demo features.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <SignInButton mode="modal">
                <Button size="lg">Sign in to Continue</Button>
              </SignInButton>
            </CardContent>
          </Card>
        ) : !hasAllEnvVars ? (
          <ConfigCard
            title="OpenAI Configuration Required"
            description="To enable AI text or structured data generation, you need to configure OpenAI API key."
            configItems={missingEnvVars}
            filesToRemove={[
              { path: "api/ai/*", description: "AI API routes" },
              { path: "_hooks/*", description: "AI hooks" },
            ]}
            alternativeTitle="Remove AI Feature"
            alternativeDescription="If you don't plan to use AI features, you can remove these files:"
          />
        ) : (
          <AIDemoClient isMissingReplicateToken={isMissingReplicateToken} />
        )}
      </div>
    </div>
  )
}
