import { Icon } from "@/components/graphics/icon"
import { HeroSection } from "@/components/home/hero-section"
import { Heading } from "@/components/typography/heading"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import GetStartedClerk from "./_components/getstarted-clerk"
import GetStartedConvex from "./_components/getstarted-convex"
import GetStartedStorage from "./_components/getstarted-storage"
import GetStartedEmail from "./_components/getstarted-email"
import GetStartedAI from "./_components/getstarted-ai"
import GetStartedPayments from "./_components/getstarted-payments"
import GetStartedAdmin from "./_components/getstarted-admin"
import GetStartedTesting from "./_components/getstarted-testing"
import GetStartedExample from "./_components/getstarted-example"
import GetStartedConfig from "./_components/getstarted-config"
import { siteConfig } from "@/lib/config"

export default async function GetStartedPage() {
  // Check if localhost
  const headersList = await headers()
  const host = headersList.get("host") || ""
  const isLocalhost = host.includes("localhost") || host.includes("127.0.0.1")

  // If not localhost, redirect to home
  if (!isLocalhost) {
    redirect("/")
  }

  const isTitleCustomized = siteConfig.title !== ("Vibecode Party Starter" as string)
  const isDescriptionCustomized = siteConfig.description !== ("A modern Next.js starter with authentication, database, storage, AI, and more." as string)
  const additionalInstructions = `

Please come up with an implementation plan that follows the project's architecture patterns and uses existing components where possible. Do NOT make any code changes yet, just plan the implementation.
  `

  const examplePrompts = {
    creative: `Please help me create an AI Creative Studio with:

1. Text-to-image generation with multiple Replicate models
2. AI-powered image editing and variations using OpenAI
3. Text generation with custom system prompts
4. Save generations to AWS S3 and organize in collections
5. Community showcase with likes and comments
6. Export options with watermarking

Please implement this following the project's architecture patterns and using:
- Replicate for text-to-image models
- OpenAI for variations and text
- AWS S3 for storage
- Convex for collections and social features
- Clerk for user authentication`,

    marketplace: `Please help me create a marketplace feature with:

1. Product listings with search and filters
2. Shopping cart functionality
3. Stripe checkout integration
4. Order management
5. Seller profiles and ratings
6. Inventory tracking

Please implement this following the project's architecture patterns and existing payment integration.`,

    community: `Please help me create a community feature with:

1. User profiles with avatars
2. Discussion forums
3. Direct messaging
4. Activity feed
5. Reputation system
6. Content moderation tools

Please implement this following the project's architecture patterns and using existing auth and storage systems.`,
  }

  const customPrompt = `I am building a new project starting from a Next.js starter template (see the project README and package.json for more info). Please help me come up with a plan for building ${siteConfig.title} - ${siteConfig.description}`
  const newHomePrompt = `I am building a new project starting from a Next.js starter template. Please update the home page by removing the default starter project content and creating new home page content for ${siteConfig.title} - ${siteConfig.description}. Use our custom Heading component from @/components/typography/heading for any h1-h6 headings. Also update the Icon component with an icon from Lucide or another icon or svg library that would be appropriate for ${siteConfig.title}.`
  const newRoadmapPrompt = `I am building a new project starting from a Next.js starter template. Please update the roadmap page by removing the default starter project content at /app/roadmap/data/features.json and /app/roadmap/data/featureRequests.json with new data for ${siteConfig.title} - ${siteConfig.description}. `

  return (
    <div className="flex min-h-screen flex-col bg-violet-100/10">
      <HeroSection gettingStarted={true} title={siteConfig.title} />
      <div className="w-full flex justify-center -mt-6">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-50 border-4 border-primary/20 ring-8 ring-primary/50 scale-150">
          <div className="scale-125 opacity-80">
            <Icon />
          </div>
        </div>
      </div>
      <section className="flex flex-col gap-4 py-16 px-4">
        <Heading variant="h2" className="text-center">
          Getting Started
        </Heading>
        <div>
          <GetStartedConfig />
          <GetStartedClerk />
          <GetStartedConvex />
          <GetStartedStorage />
          <GetStartedEmail />
          <GetStartedAI />
          <GetStartedPayments />
          <GetStartedAdmin />
          <GetStartedTesting />
        </div>
      </section>

      <section className="flex flex-col gap-8 pb-16 max-w-4xl mx-auto px-4 w-full">
        <Heading variant="h2" className="text-center">
          What&apos;s Next?
        </Heading>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Once you have your starter configured, here are some example features you can build. Click a card to copy the Cursor prompt and get started!
        </p>
        <div className="space-y-6">
          {isTitleCustomized && isDescriptionCustomized ? (
            <>
              <GetStartedExample title="Update the home page" prompt={newHomePrompt} />
              <GetStartedExample title="Come up with a build plan" prompt={customPrompt + additionalInstructions} />
              <GetStartedExample title="Update the roadmap" prompt={newRoadmapPrompt} />
            </>
          ) : (
            <>
              <GetStartedExample title="AI Creative Studio" prompt={examplePrompts.creative + additionalInstructions} />
              <GetStartedExample title="Marketplace" prompt={examplePrompts.marketplace + additionalInstructions} />
              <GetStartedExample title="Community Platform" prompt={examplePrompts.community + additionalInstructions} />
            </>
          )}
          <GetStartedExample isCommand={true} title="Generate llm.txt" prompt={`pnpm generate:llm`}>
            <p>
              Generate llm.txt so you can provide the entire codebase to an AI agent with a large context window like{" "}
              <a className="text-primary" href="https://gemini.google.com" target="_blank" rel="noopener noreferrer">
                Gemini
              </a>
              .
            </p>
          </GetStartedExample>
        </div>
      </section>

      <section className="flex flex-col gap-8 pb-32 max-w-4xl mx-auto px-4 w-full">
        <Heading variant="h2" className="text-center">
          Ship It!
        </Heading>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Once you have your starter configured, we have a collection of npm scripts that can help you deploy your project with Github and Vercel (requires Github and Vercel CLI).
        </p>
        <GetStartedExample isCommand={true} title="Boot Project" prompt={`pnpm boot`}>
          <p>This will install the Github and Vercel CLI, login, and link your project.</p>
        </GetStartedExample>
        <GetStartedExample isCommand={true} title="Ship It" prompt={`pnpm ship`}>
          <p>Lint and build the project, run the tests then generate a commit message and push your code to Github and Vercel.</p>
        </GetStartedExample>
        <GetStartedExample isCommand={true} title="YOLO Deploy" prompt={`pnpm go`}>
          <p>Skip the tests and deploy straight to production.</p>
        </GetStartedExample>
      </section>
    </div>
  )
}
