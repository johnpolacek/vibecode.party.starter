"use client"

import Link from "next/link"
import { Github, PartyPopper } from "lucide-react"
import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import AnimateIn from "@/components/ui/animate-in"
import { CopyOneliner } from "../ui/copy-oneliner"
import { Heading } from "@/components/typography/heading"

type RandomStyle = {
  top: string
  left: string
  transform: string
  opacity: number
}

export function HeroSection({ gettingStarted, title }: { gettingStarted?: boolean; title?: string }) {
  const [randomStyles, setRandomStyles] = useState<RandomStyle[]>([])
  const { user } = useUser()

  useEffect(() => {
    const styles: RandomStyle[] = Array.from({ length: 50 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      transform: `scale(${Math.random() * 0.8 + 0.2})`,
      opacity: Math.random() * 0.5 + 0.1,
    }))
    setRandomStyles(styles)
  }, [])

  return (
    <section
      className={cn(
        "relative overflow-hidden dark:bg-linear-to-br dark:from-indigo-700/30 dark:via-purple-600 dark:to-blue-500/70 bg-linear-to-br from-indigo-700 via-purple-600 to-blue-600 py-12 text-white md:py-16 border-b-8 border-purple-100 dark:border-background/80",
        gettingStarted && "!pt-8 !pb-"
      )}
    >
      <AnimateIn from="opacity-0" to="opacity-100" duration={8000}>
        <div className="absolute inset-0 z-0 opacity-20">
          {randomStyles.map((style, i) => (
            <div key={i} className="absolute h-16 w-16 rounded-full bg-white animate-float" style={style} />
          ))}
        </div>
      </AnimateIn>

      <div className="absolute bottom-0 left-0 h-48 w-full bg-gradient-to-b from-transparent to-background/30 via-background/5 pointer-events-none" />

      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <Heading variant="h1" className="mb-6 sm:mb-12 scale-x-110 tracking-wide" style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.5)" }}>
            {title && title !== "Vibecode Party Starter" ? (
              title
            ) : (
              <>
                <span className="text-5xl tracking-wide">vibe code</span>
                <span className="block leading-12">party starter</span>
              </>
            )}
          </Heading>
          {!gettingStarted && (
            <>
              <Heading variant="h2" className="mb-8 text-lg md:text-xl font-medium text-balance">
                The Next.js starter project for vibe coding full stack web apps.
              </Heading>
              <div className="pt-4 pb-8 max-w-lg mx-auto">
                <CopyOneliner
                  iconClassName="w-4 sm:w-6 h-4 sm:h-6 opacity-70 mx-1"
                  className="bg-black/30 ring-8 hover:ring-[12px] transition-all duration-300 ease-in-out ring-black/10 tracking-wide font-semibold sm:text-lg"
                >
                  npx vibecode-party-starter
                </CopyOneliner>
              </div>
              <div className="flex flex-col justify-center gap-4 sm:gap-6 sm:flex-row pb-4 sm:pb-0">
                <>
                  <Button
                    asChild
                    size="xl"
                    className={cn(
                      "bg-gradient-to-br hover:drop-shadow-lg from-white via-fuchsia-50 to-fuchsia-300 text-indigo-900/80 hover:text-indigo-900 font-bold saturate-150 hover:scale-105 hover:saturate-200 transition-all duration-300 ease-out",
                      user === undefined ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
                    )}
                  >
                    <Link href="https://github.com/johnpolacek/vibecode.party.starter">
                      View on GitHub
                      <Github className="ml-1 h-4 w-4 scale-150" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="xl"
                    className={cn(
                      "bg-gradient-to-br from-purple-400 via-purple-600 to-purple-500 saturate-[1.66] hover:saturate-[1.8] text-white hover:scale-105 transition-all duration-300 ease-out delay-100",
                      user === undefined ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
                    )}
                  >
                    <Link href="https://vibecode.party">
                      Go Party
                      <PartyPopper className="ml-1 h-6 w-6 scale-150 text-yellow-300 relative -top-px" />
                    </Link>
                  </Button>
                </>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
