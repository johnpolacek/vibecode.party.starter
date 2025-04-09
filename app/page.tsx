import { Icon } from "@/components/graphics/icon"
import { HeroSection } from "@/components/home/hero-section"
import { ContentSection } from "@/components/home/content-section"
import { siteConfig } from "@/lib/config"
import Image from "next/image"

export default async function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-violet-100/10">
      <HeroSection title={siteConfig.title} />
      <div className="w-full flex justify-center -mt-6">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-50 border-4 border-primary/20 ring-8 ring-primary/50 scale-150">
          <div className="scale-125 opacity-80">{siteConfig.logo ? <Image src={siteConfig.logo} alt={siteConfig.title + " logo"} width={32} height={32} /> : <Icon />}</div>
        </div>
      </div>
      <ContentSection />
    </div>
  )
}
