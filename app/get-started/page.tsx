import { Icon } from "@/components/graphics/icon"
import { HeroSection } from "@/components/home/hero-section"
import { Heading } from "@/components/typography/heading"
import { Card } from "@/components/ui/card"

export default async function HomePage() {
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
        <p className="text-center">This is a guide to help you get started with the Vibe Code Party project.</p>
        <Card className="p-16 py-8 mt-8 mx-auto text-center">Coming Soon!</Card>
      </section>
    </div>
  )
}
