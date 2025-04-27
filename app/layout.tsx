import Link from "next/link"
import { Rethink_Sans } from "next/font/google"
import { ThemeProvider } from "@/components/layout/theme-provider"
import { MainNav } from "@/components/nav/main-nav"
import { MobileNav } from "@/components/nav/mobile-nav"
import { ThemeToggle } from "@/components/nav/theme-toggle"
import AuthButtons from "@/components/nav/auth-buttons"
import { cn } from "@/lib/utils"
import { Toaster } from "sonner"
import { auth } from "@clerk/nextjs/server"
import { headers } from "next/headers"
import { trackVisit } from "@/app/_actions/track-visit"
import { RouteTracker } from "@/components/analytics/route-tracker"
import { siteConfig } from "@/lib/config"
import "./globals.css"
import { Github } from "lucide-react"
import { Providers } from "./providers"

const rethinkSans = Rethink_Sans({
  subsets: ["latin"],
  variable: "--font-rethink-sans",
})

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

  const currentYear = new Date().getFullYear()

  return (
    <html lang="en" suppressHydrationWarning className={`${rethinkSans.variable}`}>
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <Providers>
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
              <footer className="border-t py-6">
                <div className="container px-4 md:px-6">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-sm">
                    <p>
                      © {currentYear} {siteConfig.title}. All rights reserved.
                    </p>
                    <nav className="flex gap-4">
                      <Link href="#" className="hover:underline underline-offset-4">
                        Terms
                      </Link>
                      <Link href="#" className="hover:underline underline-offset-4">
                        Privacy
                      </Link>
                      <Link href="#" className="hover:underline underline-offset-4">
                        Contact
                      </Link>
                    </nav>
                  </div>
                </div>
              </footer>
            </div>
            <Toaster position="top-center" />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
