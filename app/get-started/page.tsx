import { Icon } from "@/components/graphics/icon"
import { HeroSection } from "@/components/home/hero-section"
import { Heading } from "@/components/typography/heading"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import GetStartedClerk from "./_components/getstarted-clerk"
import GetStartedSupabase from "./_components/getstarted-supabase"
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

  const isTitleCustomized = siteConfig.title !== "Vibecode Party Starter"
  const isDescriptionCustomized = siteConfig.description !== "A modern Next.js starter with authentication, database, storage, AI, and more."

  const examplePrompts = {
    creative: `Please help me create an AI Creative Studio with:

1. Text-to-image generation with multiple Replicate models
2. AI-powered image editing and variations using OpenAI
3. Text generation with custom system prompts
4. Save generations to AWS S3 and organize in collections
5. Community showcase with likes and comments
6. Export options with watermarking

Please implement this following the project’s architecture patterns and using:
- Replicate for text-to-image models
- OpenAI for variations and text
- AWS S3 for storage
- Supabase for collections and social features
- Clerk for user authentication`,

    marketplace: `Please help me create a marketplace feature with:

1. Product listings with search and filters
2. Shopping cart functionality
3. Stripe checkout integration
4. Order management
5. Seller profiles and ratings
6. Inventory tracking

Please implement this following the project’s architecture patterns and existing payment integration.`,

    community: `Please help me create a community feature with:

1. User profiles with avatars
2. Discussion forums
3. Direct messaging
4. Activity feed
5. Reputation system
6. Content moderation tools

Please implement this following the project’s architecture patterns and using existing auth and storage systems.`,
  }

  const customPrompt = `Please help me enhance the ${siteConfig.title} - the description for this project is: ${siteConfig.description}`

  return (
    <div className="flex min-h-screen flex-col bg-violet-100/10">
      <HeroSection gettingStarted={true} />
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
          <GetStartedSupabase />
          <GetStartedStorage />
          <GetStartedEmail />
          <GetStartedAI />
          <GetStartedPayments />
          <GetStartedAdmin />
          <GetStartedTesting />
        </div>
      </section>

      <section className="flex flex-col gap-8 pb-32 max-w-4xl mx-auto px-4 w-full">
        <Heading variant="h2" className="text-center">
          What’s Next?
        </Heading>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Once you have your starter configured, here are some example features you can build. Click a card to copy the Cursor prompt and get started!
        </p>
        <div className="space-y-6">
          {isTitleCustomized && isDescriptionCustomized ? (
            <GetStartedExample title={siteConfig.title} prompt={customPrompt} />
          ) : (
            <>
              <GetStartedExample title="AI Creative Studio" prompt={examplePrompts.creative} />
              <GetStartedExample title="Marketplace" prompt={examplePrompts.marketplace} />
              <GetStartedExample title="Community Platform" prompt={examplePrompts.community} />
            </>
          )}
        </div>
      </section>
    </div>
  )
}
