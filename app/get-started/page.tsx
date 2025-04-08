import { Icon } from "@/components/graphics/icon"
import { HeroSection } from "@/components/home/hero-section"
import { Heading } from "@/components/typography/heading"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import GetStartedClerk from "./_components/getstarted-clerk"
import GetStartedSupabase from "./_components/getstarted-supabase"
import GetStartedStorage from "./_components/getstarted-storage"
import GetStartedEmail from "./_components/getstarted-email"

export default async function GetStartedPage() {
  // Check if we're on localhost
  const headersList = await headers()
  const host = headersList.get("host") || ""
  const isLocalhost = host.includes("localhost") || host.includes("127.0.0.1")

  // If not localhost, redirect to home
  if (!isLocalhost) {
    redirect("/")
  }

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
      <section className="flex flex-col gap-4 py-16">
        <Heading variant="h2" className="text-center">
          Getting Started
        </Heading>
        <div className="space-y-8">
          <GetStartedClerk />
          <GetStartedSupabase />
          <GetStartedStorage />
          <GetStartedEmail />
        </div>
      </section>
    </div>
  )
}
