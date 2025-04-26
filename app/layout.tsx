import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { Rethink_Sans } from "next/font/google"
import { ThemeProvider } from "@/components/layout/theme-provider"
import { MainNav } from "@/components/nav/main-nav"
import { MobileNav } from "@/components/nav/mobile-nav"
import { ThemeToggle } from "@/components/nav/theme-toggle"
import AuthButtons from "@/components/nav/auth-buttons"
import { cn } from "@/lib/utils"
import { Toaster } from "sonner"
import { ClerkProvider } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { headers } from "next/headers"
import { trackVisit } from "@/app/_actions/track-visit"
import { RouteTracker } from "@/components/analytics/route-tracker"
import { siteConfig } from "@/lib/config"
import "./globals.css"
import { Github } from "lucide-react"
import "@/lib/firebase/config.dev"

const rethinkSans = Rethink_Sans({
  subsets: ["latin"],
  variable: "--font-rethink-sans",
})

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.shareImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title + " screenshot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.shareImage],
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  let userId: string | null = null
  let isAdmin = false

  try {
    const { userId: id } = await auth()
    userId = id
    const adminUserIds = process.env.ADMIN_USER_IDS?.split(",") || []
    isAdmin = userId ? adminUserIds.includes(userId) : false
  } catch (error) {
    // Silently handle auth initialization errors
    console.warn("Auth initialization error during initialization (this can be expected in development):", error)
  }

  // Track the visit
  const headersList = await headers()

  // Get path from x-matched-path, fallback to x-url, then x-invoke-path, then /
  const path = headersList.get("x-matched-path") || (headersList.get("x-url") ? new URL(headersList.get("x-url")!).pathname : null) || headersList.get("x-invoke-path") || "/"

  await trackVisit(path)

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className={`${rethinkSans.variable}`}>
        <body className={cn("min-h-screen bg-background font-sans antialiased")}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <RouteTracker />
            <div className="relative flex min-h-screen flex-col">
              <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
                <div className="px-4 sm:px-8 md:px-16 flex h-16 items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-6">
                    <MobileNav />
                    <MainNav isAdmin={isAdmin} />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center pr-2 gap-2">
                      {siteConfig.x && (
                        <Link href={`https://x.com/${siteConfig.x}`} target="_blank" className="text-muted-foreground hover:text-primary">
                          <span className="text-xl font-extrabold px-2 mx-1">𝕏</span>
                        </Link>
                      )}
                      {siteConfig.github && (
                        <Link href={siteConfig.github} target="_blank" className="px-1 mx-1 text-muted-foreground hover:text-primary">
                          <Github className="w-5 h-5" />
                        </Link>
                      )}
                    </div>
                    <ThemeToggle />
                    <AuthButtons />
                  </div>
                </div>
              </header>
              <main className="flex-1">{children}</main>
              <footer className="border-t-4 border-primary/10 bg-primary/5 py-6 md:py-0">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
                  <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">© 2025 vibecode.party. All rights reserved.</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Link href="/privacy" className="hover:underline">
                      Privacy
                    </Link>
                    <Link href="/terms" className="hover:underline">
                      Terms
                    </Link>
                  </div>
                </div>
              </footer>
            </div>
            <Toaster position="top-center" />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
