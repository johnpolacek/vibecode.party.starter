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
import "./globals.css"

const rethinkSans = Rethink_Sans({
  subsets: ["latin"],
  variable: "--font-rethink-sans",
})

export const metadata: Metadata = {
  title: "Vibecode Party Starter",
  description: "The Next.js Starter for vibecoding.",
  openGraph: {
    title: "Vibecode Party Starter",
    description: "The Next.js Starter for vibecoding.",
    images: [
      {
        url: "/screenshot.png",
        width: 1200,
        height: 630,
        alt: "vibecode.party.starter screenshot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibecode Party Starter",
    description: "The Next.js Starter for vibecoding.",
    images: ["/screenshot.png"],
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { userId } = await auth()
  const adminUserIds = process.env.ADMIN_USER_IDS?.split(",") || []
  const isAdmin = userId ? adminUserIds.includes(userId) : false

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
