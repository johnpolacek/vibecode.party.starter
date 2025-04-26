/* eslint-disable max-lines */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Rocket, Zap, Terminal, FileCode, FileCode2, Sparkles, CloudUpload, ShieldCheck, Blocks, Database } from "lucide-react"
import { Heading } from "@/components/typography/heading"
import { FeatureCard } from "./feature-card"
import { ContactFormPreview, AuthFlowPreview } from "./feature-previews"
import { ContactIcon, AuthIcon, FileUploadIcon } from "./feature-icons"
import { CopyToClipboard } from "@/components/ui/copy-to-clipboard"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { isDev } from "@/lib/auth-utils"
import Link from "next/link"
import { Button } from "../ui/button"
import { BoltIcon } from "@heroicons/react/24/solid"
import { CopyOneliner } from "../ui/copy-oneliner"

export function ContentSection() {
  return (
    <>
      <section className="container mt-12 lg:-mb-8">
        <div className="mx-auto max-w-[58rem]">
          <Card className="border-primary/30 border-dotted border-2 bg-background/60 backdrop-blur-sm">
            <CardContent>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-4">
                  <svg viewBox="0 0 24 24" className="h-9 w-9" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <div className="flex flex-col">
                    <a href="https://github.com/johnpolacek/vibecode.party.starter" className="text-lg font-semibold hover:text-primary">
                      vibecode.party.starter
                    </a>
                    <p className="text-sm text-muted-foreground">A Next.js starter template for building full-stack apps with auth, database, storage, and more! 🚀</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a
                    href="https://github.com/johnpolacek/vibecode.party.starter/stargazers"
                    className="inline-flex items-center justify-center gap-1 rounded-md bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/20"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    Star
                  </a>
                  <a
                    href="https://github.com/johnpolacek/vibecode.party.starter/watchers"
                    className="inline-flex items-center justify-center gap-1 rounded-md bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/20"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    Watch
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      {isDev() && (
        <section id="welcome" className="container mt-20">
          <Card className="text-center lg:p-8 !bg-linear-to-tl from-primary/20 to-primary/5 dark:!bg-black/70 text-primary max-w-3xl mx-auto">
            <CardHeader>
              <Heading variant="h3" className="dark:text-white">
                Welcome to the Vibecode Party Starter!
              </Heading>
            </CardHeader>
            <CardContent>
              <p className="text-balance dark:text-purple-300 text-sm sm:text-base">
                This is a dev environment where you can build your app locally before you&apos;re ready to ship it to production.
              </p>
              <div className="flex justify-center pt-6">
                <Button
                  asChild
                  size="lg"
                  className="text-2xl h-auto py-3 px-12 font-extrabold hover:scale-105 !bg-primary hover:bg-primary transition-all duration-300 hover:ring-8 hover:ring-primary/20"
                >
                  <Link href="/get-started" className="font-extrabold tracking-wide">
                    <BoltIcon className="h-5 w-5 text-amber-300 scale-150" />
                    Get Started
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      )}
      <section id="features" className="container space-y-6 pt-8 md:pt-12 lg:pt-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">The Good Stuff</span>
          <Heading variant="h2" className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
            Party <span className="text-primary">Favors</span> Included
          </Heading>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">We packed all these awesome goodies so you can focus on vibing, not configuring!</p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <Card className="border-primary/20 bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-all hover:shadow-md hover:shadow-primary/10 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">UI Components</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-primary"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Gorgeous Shadcn/UI components that make your app look like a million bucks! 💅</p>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-all hover:shadow-md hover:shadow-primary/10 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Authentication</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-primary"
              >
                <path d="M16 16v-3a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2v3"></path>
                <circle cx="12" cy="7" r="3"></circle>
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
              </svg>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Clerk auth that&apos;s so easy, you&apos;ll set it up before your coffee gets cold! ☕</p>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-all hover:shadow-md hover:shadow-primary/10 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Database</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-primary"
              >
                <path d="M12 2C6.5 2 2 4 2 7v10c0 3 4.5 5 10 5s10-2 10-5V7c0-3-4.5-5-10-5z"></path>
                <path d="M2 7c0 3 4.5 5 10 5s10-2 10-5"></path>
                <path d="M2 12c0 3 4.5 5 10 5s10-2 10-5"></path>
              </svg>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Keep the party going with Convex! Our database setup lets you vibe with real-time data and automatic scaling. 🔥</p>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-all hover:shadow-md hover:shadow-primary/10 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">File Storage</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-primary"
              >
                <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <path d="M2 15h10"></path>
                <path d="M9 18l3-3-3-3"></path>
              </svg>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">AWS S3 storage that&apos;s ready to handle all your party pics! 📸</p>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-all hover:shadow-md hover:shadow-primary/10 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Email Service</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-primary"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">SendGrid to make sure your messages slide into inboxes, not spam! 📨</p>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-all hover:shadow-md hover:shadow-primary/10 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Payments</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-primary"
              >
                <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                <line x1="2" y1="10" x2="22" y2="10"></line>
              </svg>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Stripe integration so smooth, money just slides right in! 💸</p>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-all hover:shadow-md hover:shadow-primary/10 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">AI SDK Integration</CardTitle>
              <Sparkles className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Use AI to generate text, structured data, and images.</p>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-all hover:shadow-md hover:shadow-primary/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">End-to-End Testing</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-primary"
              >
                <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                <line x1="16" y1="8" x2="2" y2="22"></line>
                <line x1="17.5" y1="15" x2="9" y2="15"></line>
              </svg>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Playwright testing with visual regression and CI/CD integration! 🧪</p>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-all hover:shadow-md hover:shadow-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-primary"
                >
                  <path d="M3 3v18h18"></path>
                  <path d="M18 17V9"></path>
                  <path d="M13 17V5"></path>
                  <path d="M8 17v-3"></path>
                </svg>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Built-in visit tracking and route analytics with Convex! 📊</p>
            </CardContent>
          </Card>
        </div>
      </section>
      <section id="get-started" className="container pt-8 md:pt-12 lg:pt-24 relative">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_70%_30%,hsl(var(--secondary))_0,transparent_50%),radial-gradient(circle_at_30%_70%,hsl(var(--primary))_0,transparent_50%)]"></div>
        </div>
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Let&apos;s Go!</span>
          <Heading variant="h2" className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
            Join the <span className="text-primary">Party</span>
          </Heading>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">Follow these simple steps and you&apos;ll be vibing in no time! 🕺💃</p>
        </div>
        <div className="mx-auto grid max-w-4xl items-center gap-10 py-12">
          <Tabs defaultValue="install" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="install" className="text-base">
                🚀 Installation
              </TabsTrigger>
              <TabsTrigger value="env" className="text-base">
                ⚙️ Environment
              </TabsTrigger>
              <TabsTrigger value="vibes" className="text-base">
                ✨ Vibes
              </TabsTrigger>
            </TabsList>
            <TabsContent value="install" className="mt-6">
              <Card className="border-primary/20 bg-background/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Rocket className="h-5 w-5 text-primary" />
                    Installation
                  </CardTitle>
                  <CardDescription>Get the party started on your machine in seconds!</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-md bg-muted p-4">
                    <div className="flex items-center space-x-1">
                      <Terminal className="h-4 w-4 text-primary" />
                      <p className="font-medium">Run the command and follow the prompts...</p>
                    </div>
                    <CopyOneliner className="mt-2 bg-background border-primary/70">npx vibecode-party-starter</CopyOneliner>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="env" className="mt-6">
              <Card className="border-primary/20 bg-background/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Environment Setup
                  </CardTitle>
                  <CardDescription>Set the mood with these environment variables! 🌈</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Create a <code className="rounded-md bg-muted px-1.5 py-0.5">.env</code> file in the root of your project and add these magic spells:
                  </p>
                  <div className="rounded-md bg-muted p-4">
                    <div className="flex items-center space-x-2">
                      <p className="font-mono text-sm">🌐 App URLs</p>
                    </div>
                    <pre className="mt-2 overflow-x-auto rounded-lg border bg-background p-4">
                      <code className="text-sm font-mono">NEXT_PUBLIC_APP_URL=</code>
                    </pre>
                  </div>
                  <div className="rounded-md bg-muted p-4">
                    <div className="flex items-center space-x-2">
                      <p className="font-mono text-sm">✨ Clerk Authentication</p>
                    </div>
                    <pre className="mt-2 overflow-x-auto rounded-lg border bg-background p-4">
                      <code className="text-sm font-mono">
                        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
                        <br />
                        CLERK_SECRET_KEY=
                        <br />
                        <br />
                        # Replace with your Clerk user ID after signing in
                        <br />
                        ADMIN_USER_IDS=
                      </code>
                    </pre>
                  </div>
                  <div className="rounded-md bg-muted p-4">
                    <div className="flex items-center space-x-2">
                      <p className="font-mono text-sm flex items-center gap-2">
                        <Database className="h-4 w-4 text-amber-600" /> Convex Database
                      </p>
                    </div>
                    <pre className="mt-2 overflow-x-auto rounded-lg border bg-background p-4">
                      <code className="text-sm font-mono">CONVEX_DEPLOY_KEY=</code>
                    </pre>
                  </div>
                  <div className="rounded-md bg-muted p-4">
                    <div className="flex items-center space-x-2">
                      <p className="font-mono text-sm">💾 AWS S3 & CloudFront</p>
                    </div>
                    <pre className="mt-2 overflow-x-auto rounded-lg border bg-background p-4">
                      <code className="text-sm font-mono">
                        AWS_KEY=
                        <br />
                        AWS_SECRET=
                        <br />
                        AWS_REGION=
                        <br />
                        AWS_BUCKET_PUBLIC=
                        <br />
                        CLOUDFRONT_DOMAIN=
                      </code>
                    </pre>
                  </div>
                  <div className="rounded-md bg-muted p-4">
                    <div className="flex items-center space-x-2">
                      <p className="font-mono text-sm">📨 Contact Form & Mailing List</p>
                    </div>
                    <pre className="mt-2 overflow-x-auto rounded-lg border bg-background p-4">
                      <code className="text-sm font-mono">
                        NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
                        <br />
                        RECAPTCHA_SECRET_KEY=
                        <br />
                        SENDGRID_API_KEY=
                        <br />
                        SENDGRID_SENDER=
                        <br />
                        CONTACT_EMAIL=
                        <br />
                        UNSUBSCRIBE_SECRET=
                      </code>
                    </pre>
                  </div>
                  <div className="rounded-md bg-muted p-4">
                    <div className="flex items-center space-x-2">
                      <p className="font-mono text-sm">💳 Stripe Payments</p>
                    </div>
                    <pre className="mt-2 overflow-x-auto rounded-lg border bg-background p-4">
                      <code className="text-sm font-mono">
                        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
                        <br />
                        STRIPE_SECRET_KEY=
                      </code>
                    </pre>
                  </div>
                  <div className="rounded-md bg-muted p-4">
                    <div className="flex items-center space-x-2">
                      <p className="font-mono text-sm">🧪 Testing</p>
                    </div>
                    <pre className="mt-2 overflow-x-auto rounded-lg border bg-background p-4">
                      <code className="text-sm font-mono">
                        TEST_USER_EMAIL=
                        <br />
                        TEST_USER_PASSWORD=
                        <br />
                        TEST_USER_ID=
                      </code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="vibes" className="mt-6">
              <Card className="border-primary/20 bg-background/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Vibecoding Workflows
                  </CardTitle>
                  <CardDescription>Get inspired with these example prompts to enhance your project! 🎨</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-md bg-muted p-4">
                    <div className="flex items-center space-x-2">
                      <FileCode className="h-4 w-4 text-primary" />
                      <p className="font-mono text-sm">Import components from a v0 project</p>
                    </div>
                    <pre className="mt-2 overflow-x-auto rounded-lg border bg-background p-4">
                      <code className="text-sm font-mono font-medium">{`npx shadcn@latest add "https://v0.dev/chat/b/asdfghjkl1234567890"`}</code>
                    </pre>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Visit{" "}
                      <a href="https://v0.dev" className="text-primary hover:underline">
                        v0.dev
                      </a>{" "}
                      to generate components and import them into your project by selecting the &quot;Add to Codebase&quot; option.
                    </p>
                    <div className="flex items-center space-x-2 mt-6">
                      <FileCode2 className="h-4 w-4 text-primary" />
                      <p className="font-mono text-sm">Import shadcn/ui compatible components from the community.</p>
                    </div>
                    <pre className="mt-2 overflow-x-auto rounded-lg border bg-background p-4">
                      <code className="text-sm font-mono font-medium">{`pnpm dlx shadcn@latest add "https://21st.dev/r/designali-in/gradient-text"`}</code>
                    </pre>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Find libraries and components like{" "}
                      <a href="https://21st.dev" className="text-primary hover:underline">
                        21st.dev
                      </a>
                      ,{" "}
                      <a href="https://magicui.design/" className="text-primary hover:underline">
                        Magic UI
                      </a>{" "}
                      &{" "}
                      <a href="https://bundui.io/docs/components/animated-gradient-text" className="text-primary hover:underline">
                        bundui
                      </a>{" "}
                      on{" "}
                      <a href="https://github.com/birobirobiro/awesome-shadcn-ui" className="text-primary hover:underline">
                        awesome-shadcn-ui
                      </a>
                    </p>
                  </div>
                  <div className="rounded-md bg-muted p-4">
                    <div className="flex items-center space-x-2">
                      <Terminal className="h-4 w-4 text-primary" />
                      <p className="font-mono text-sm">Example Cursor prompts</p>
                    </div>
                    <div id="cursor-prompts" className="mt-4 space-y-4">
                      <div className="rounded-lg border bg-background p-3">
                        <p className="font-mono text-sm text-primary mb-2"># Use shadcn/ui compatible components</p>
                        <div className="relative text-sm py-3 px-3 rounded-md border">
                          <CopyToClipboard position="top-right" className="!absolute !right-2 !top-1.5">
                            {"Update the header text to use the new @animated-gradient-text component."}
                          </CopyToClipboard>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md bg-muted p-4">
                    <div className="flex items-center space-x-2">
                      <Terminal className="h-4 w-4 text-primary" />
                      <p className="font-mono text-sm">Vibe-code Friendly NPM Scripts</p>
                    </div>
                    <div id="npm-scripts" className="mt-4 space-y-4">
                      <div className="rounded-lg border bg-background p-3">
                        <p className="font-mono text-sm text-primary mb-2"># Go straight to production without even writing a commit message.</p>
                        <pre className="mt-2 overflow-x-auto rounded-lg border bg-background p-4">
                          <code className="text-sm font-mono">pnpm go</code>
                        </pre>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Requires{" "}
                          <a href="https://github.com/Nutlope/aicommits" className="text-primary hover:underline">
                            aicommits
                          </a>{" "}
                          to be installed on your local dev environment.
                        </p>
                      </div>
                      <div className="rounded-lg border bg-background p-3">
                        <p className="font-mono text-sm text-primary mb-2"># Ship it to production with full CI checks.</p>
                        <pre className="mt-2 overflow-x-auto rounded-lg border bg-background p-4">
                          <code className="text-sm font-mono">pnpm ship</code>
                        </pre>
                        <p className="mt-2 text-sm text-muted-foreground">Runs linting, runs tests, backs up the database then pushes db changes to production - all in one command! 🚀</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      <section id="full-stack-components" className="container pt-4 md:pt-8 lg:pt-12">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Ready-to-Use</span>
          <Heading variant="h2" className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
            Full-Stack <span className="text-primary">Components</span>
          </Heading>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 text-balance">
            Plug-and-play full stack components that integrate with <span className="whitespace-nowrap">best-in-class</span> services! Just add your API keys and you&apos;re good to go!
          </p>
        </div>

        <div className="w-full pt-8 flex justify-center items-center">
          <iframe
            width="720"
            height="405"
            src="https://www.youtube.com/embed/1gzCvATzUdM?si=XSGrKNvWvSIcOiAW"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>

        <div id="feature-cards" className="mx-auto grid max-w-6xl gap-8 py-12">
          <FeatureCard
            title="Complete Auth Flow"
            description="A fully implemented authentication system with Clerk, including sign-up, login, password reset, and profile management."
            icon={<AuthIcon />}
            badgeText="Authentication"
            features={["Social login with Google, GitHub, etc.", "Email verification and password reset", "Protected routes and middleware", "Admin user role management"]}
            envVars={["NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY", "CLERK_SECRET_KEY"]}
            preview={<AuthFlowPreview />}
            gradientFrom="from-fuchsia-500/5"
            gradientTo="to-fuchsia-500/30"
            gradientCirclePosition="70% 30%"
            link="/account"
            linkText="Go to Account Page"
          />

          {/* File Upload Card */}
          <FeatureCard
            title="S3 File Upload System"
            description="A complete file upload system with AWS S3 integration, progress tracking, and image optimization."
            icon={<FileUploadIcon />}
            badgeText="File Upload"
            features={["Drag-and-drop file uploads", "Image preview and optimization", "Progress tracking with cancel option", "CloudFront CDN integration"]}
            envVars={["AWS_KEY", "AWS_SECRET", "AWS_BUCKET_PUBLIC"]}
            preview={
              <div className="bg-background/80 backdrop-blur-sm rounded-lg border border-blue-500/20 shadow-xl w-full max-w-md p-6">
                <div className="border-2 border-dashed border-blue-500/30 rounded-lg p-8 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 mb-4 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8 text-blue-500"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                  </div>
                  <div className="h-4 w-48 bg-blue-500/20 rounded mb-2"></div>
                  <div className="h-4 w-32 bg-muted rounded mb-6"></div>
                  <div className="h-8 w-36 bg-blue-500/70 rounded"></div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-muted rounded mr-3"></div>
                    <div className="flex-1">
                      <div className="h-4 w-32 bg-muted rounded mb-2"></div>
                      <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-blue-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
            gradientFrom="from-blue-500/5"
            gradientTo="to-blue-500/30"
            gradientCirclePosition="50% 50%"
            link="/demo/upload"
            linkText="Try File Upload"
          />

          {/* Payment Processing Card */}
          <FeatureCard
            title="Stripe Payment System"
            description="A complete payment processing system with Stripe, including checkout, subscriptions, and webhooks."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 mr-1">
                <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                <line x1="2" y1="10" x2="22" y2="10"></line>
              </svg>
            }
            badgeText="Payments"
            features={["One-time and subscription payments", "Secure checkout with Stripe Elements", "Webhook handling for payment events", "Customer portal for subscription management"]}
            envVars={["NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY", "STRIPE_SECRET_KEY"]}
            preview={
              <div className="bg-background/80 backdrop-blur-sm rounded-lg border border-emerald-500/20 shadow-xl w-full max-w-md p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-6">
                    <div className="h-8 w-24 bg-emerald-500/20 rounded"></div>
                    <div className="h-8 w-16 bg-muted rounded"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-emerald-500/20 rounded"></div>
                    <div className="h-10 w-full bg-muted rounded"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="h-4 w-16 bg-emerald-500/20 rounded"></div>
                      <div className="h-10 w-full bg-muted rounded"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 w-16 bg-emerald-500/20 rounded"></div>
                      <div className="h-10 w-full bg-muted rounded"></div>
                    </div>
                  </div>
                  <div className="h-10 w-full bg-emerald-500/70 rounded mt-4"></div>
                  <div className="flex justify-center">
                    <div className="h-4 w-48 bg-muted/50 rounded"></div>
                  </div>
                </div>
              </div>
            }
            gradientFrom="from-emerald-500/5"
            gradientTo="to-emerald-500/30"
            gradientCirclePosition="30% 70%"
            link="/pay"
            linkText="Try Payment System"
          />

          <FeatureCard
            title="Ready-to-Use Contact Form"
            description="A complete contact form solution with SendGrid email integration and Google ReCAPTCHA protection against bots."
            icon={<ContactIcon />}
            badgeText="Contact Form + SendGrid"
            features={["Sends emails via SendGrid API", "Protected with Google ReCAPTCHA v3", "Configurable recipient email via env vars", "Form validation with error handling"]}
            envVars={["SENDGRID_API_KEY", "CONTACT_EMAIL", "RECAPTCHA_SECRET_KEY"]}
            preview={<ContactFormPreview />}
            link="/contact"
            linkText="Go to Contact Form"
          />

          <FeatureCard
            title="Cloud Database"
            description="A complete database management interface with table views, data editing, and backup management."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 mr-1">
                <path d="M12 2C6.5 2 2 4 2 7v10c0 3 4.5 5 10 5s10-2 10-5V7c0-3-4.5-5-10-5z"></path>
                <path d="M2 7c0 3 4.5 5 10 5s10-2 10-5"></path>
                <path d="M2 12c0 3 4.5 5 10 5s10-2 10-5"></path>
              </svg>
            }
            badgeText="Cloud DB"
            features={["Easy local development database setup", "Basic user analytics tracking"]}
            envVars={["CONVEX_DEPLOY_KEY", "NEXT_PUBLIC_CONVEX_URL"]}
            preview={
              <div className="bg-background/80 backdrop-blur-sm rounded-lg border border-violet-500/20 shadow-xl w-full max-w-md p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-6">
                    <div className="h-8 w-32 bg-violet-500/20 rounded"></div>
                    <div className="h-8 w-20 bg-muted rounded"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="grid grid-cols-4 gap-2">
                      <div className="h-8 w-full bg-violet-500/20 rounded"></div>
                      <div className="h-8 w-full bg-violet-500/20 rounded"></div>
                      <div className="h-8 w-full bg-violet-500/20 rounded"></div>
                      <div className="h-8 w-full bg-violet-500/20 rounded"></div>
                    </div>
                    <div className="space-y-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-12 w-full bg-muted rounded flex items-center px-4 gap-2">
                          <div className="h-4 w-1/4 bg-violet-500/20 rounded"></div>
                          <div className="h-4 w-1/4 bg-violet-500/20 rounded"></div>
                          <div className="h-4 w-1/4 bg-violet-500/20 rounded"></div>
                          <div className="h-4 w-1/4 bg-violet-500/20 rounded"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            }
            gradientFrom="from-violet-500/5"
            gradientTo="to-violet-500/30"
            gradientCirclePosition="40% 60%"
            link="/admin"
            linkText="Admin Dashboard"
          />

          <FeatureCard
            title="AI SDK Hooks"
            description="A complete AI integration with OpenAI and Replicate, including text generation, structured data, and image generation."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 mr-1">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
                <circle cx="7.5" cy="8.5" r="1" />
                <circle cx="16.5" cy="8.5" r="1" />
                <path d="M12 18.5c-2.5 0-4-1.5-4-1.5" />
                <path d="M16 18.5c-2.5 0-4-1.5-4-1.5" />
              </svg>
            }
            badgeText="AI Integration"
            features={["Text generation with useGenerateText() and useGenerateTextStrings()", "Structured data generation with useGenerateObject()", "Image generation with useGenerateImage()"]}
            envVars={["OPENAI_API_KEY", "REPLICATE_API_TOKEN"]}
            preview={
              <div className="bg-background/80 backdrop-blur-sm rounded-lg border border-indigo-500/20 shadow-xl w-full max-w-md p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-6">
                    <div className="h-8 w-32 bg-indigo-500/20 rounded"></div>
                    <div className="h-8 w-20 bg-muted rounded"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-24 w-full bg-muted rounded p-3">
                      <div className="h-4 w-3/4 bg-indigo-500/20 rounded mb-2"></div>
                      <div className="h-4 w-1/2 bg-indigo-500/20 rounded"></div>
                    </div>
                    <div className="h-10 w-full bg-indigo-500/70 rounded"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-32 w-full bg-muted rounded"></div>
                    <div className="space-y-2">
                      <div className="h-6 w-full bg-indigo-500/20 rounded"></div>
                      <div className="h-6 w-3/4 bg-indigo-500/20 rounded"></div>
                      <div className="h-6 w-1/2 bg-indigo-500/20 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            }
            gradientFrom="from-indigo-500/5"
            gradientTo="to-indigo-500/30"
            gradientCirclePosition="60% 40%"
            link="/demo/ai"
            linkText="Try AI Demo"
          />

          <FeatureCard
            title="Built-In Cursor Rules"
            description="A complete set of project guidelines and best practices enforced through Cursor rules, helping maintain consistency and quality across your codebase."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 mr-1">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <path d="M12 18v-6" />
                <path d="m9 15 3 3 3-3" />
              </svg>
            }
            badgeText="Project Guidelines"
            features={[
              "Project structure and file organization guidelines",
              "Component location and naming conventions",
              "Authentication patterns and best practices",
              "Database and frontend development rules",
            ]}
            preview={
              <div className="bg-background/80 backdrop-blur-sm rounded-lg border border-amber-500/20 shadow-xl w-full max-w-md p-6">
                <div className="space-y-3 font-mono text-amber-700/60 divide-y divide-amber-700/20">
                  <div className="pb-2 px-8">000-tooling</div>
                  <div className="pb-2 px-8">100-architecture</div>
                  <div className="pb-2 px-8">200-database</div>
                  <div className="pb-2 px-8">300-auth</div>
                  <div className="pb-2 px-8">400-frontend</div>
                  <div className="pb-2 px-8">999-meta</div>
                </div>
              </div>
            }
            gradientFrom="from-amber-500/5"
            gradientTo="to-amber-500/30"
            gradientCirclePosition="45% 55%"
            link="/.cursor/rules"
            linkText="View Cursor Rules"
          />

          <FeatureCard
            title="End-to-End Testing"
            description="A complete end-to-end testing setup with Playwright, including visual regression and CI/CD integration."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 mr-1">
                <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                <line x1="16" y1="8" x2="2" y2="22"></line>
                <line x1="17.5" y1="15" x2="9" y2="15"></line>
              </svg>
            }
            badgeText="E2E Tests"
            features={["Interactive test development with `pnpm pw`", "Visual regression testing built-in", "CI/CD ready test automation", "Cross-browser test coverage"]}
            envVars={["TEST_USER_EMAIL", "TEST_USER_PASSWORD", "TEST_USER_ID"]}
            preview={
              <div className="bg-background/80 backdrop-blur-sm rounded-lg border border-indigo-500/20 shadow-xl w-full max-w-xl sm:w-md p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="h-8 w-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                      <div className="h-4 w-4 bg-emerald-500/30 rounded-full"></div>
                    </div>
                    <div className="h-8 flex-1 bg-emerald-500/20 rounded"></div>
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="h-4 w-4 bg-emerald-500/20 rounded-full flex-shrink-0"></div>
                        <div className="h-8 flex-1 bg-emerald-500/10 rounded flex items-center px-4">
                          <div className="h-3 w-3/4 bg-emerald-500/20 rounded"></div>
                        </div>
                        <div className="h-6 w-16 bg-emerald-500/20 rounded flex items-center justify-center">
                          <div className="h-2 w-8 bg-emerald-500/50 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="h-24 bg-emerald-500/10 rounded p-3">
                    <div className="space-y-2">
                      <div className="h-3 w-3/4 bg-emerald-500/20 rounded"></div>
                      <div className="h-3 w-1/2 bg-emerald-500/20 rounded"></div>
                      <div className="h-3 w-2/3 bg-emerald-500/20 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            }
            gradientFrom="from-emerald-500/5"
            gradientTo="to-emerald-500/30"
            gradientCirclePosition="60% 40%"
          />
        </div>
      </section>
      <section id="services" className="container py-8 md:py-12">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">The VIP Section</span>
          <Heading variant="h2" className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
            Built for <span className="text-primary">Vibecoding</span>
          </Heading>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">We&apos;ve got the hottest services ready to make your app the life of the party! 🔥</p>
        </div>
        <div className="mx-auto grid max-w-5xl gap-8 py-12 lg:grid-cols-2">
          <Card className="border-primary/20 bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-all hover:shadow-md hover:shadow-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-primary"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
                Shadcn/UI for Components
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-pretty">
              <p className="text-muted-foreground">
                Built on a foundation of{" "}
                <a href="https://ui.shadcn.com/" className="text-primary">
                  Shadcn/UI
                </a>{" "}
                with{" "}
                <a href="https://tailwindcss.com/" className="text-primary">
                  TailwindCSS
                </a>
                , you will be able to prompt Cursor and other LLMs to produce great UI/UX designs with components that are accessible and easy to use.
              </p>
              <p className="text-muted-foreground">
                Add more components auto-magically with{" "}
                <a href="https://v0.dev" className="text-primary">
                  v0
                </a>{" "}
                or other AI tools.
              </p>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-all hover:shadow-md hover:shadow-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCode className="h-5 w-5 text-primary" />
                Vibecode-Friendly NPM Scripts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-pretty">
              <p className="text-muted-foreground">
                Deploy your code quickly with scripts like <code className="rounded-md text-foreground text-semibold bg-muted px-1.5 py-0.5">pnpm go</code> or{" "}
                <code className="rounded-md text-foreground text-semibold bg-muted px-1.5 py-0.5">pnpm ship</code> that automatically run tests, write commit messages and get your changes into
                production so you can keep vibing.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      <section id="development" className="container py-8 md:py-12 bg-primary/5 rounded-lg">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Party Tricks</span>
          <Heading variant="h2" className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
            Dev <span className="text-primary">Superpowers</span>
          </Heading>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">Tools to keep your code quality high and your vibes even higher! 🚀</p>
        </div>
        <div className="mx-auto grid max-w-4xl gap-8 py-12 lg:grid-cols-2">
          <Card className="border-primary/20 bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-all hover:shadow-md hover:shadow-primary/10 col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI SDK Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Use AI to generate text, structured data and images.</p>
              <div className="mt-4 space-y-6">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <FileCode className="h-4 w-4 text-primary" />
                    <p className="text-sm">Text Generation with Streaming</p>
                  </div>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="text" className="ring ring-foreground/10 rounded-lg">
                      <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted [&[data-state=open]>svg]:rotate-180">
                        <code className="text-sm font-mono">{"const { generate, isLoading } = useGenerateText()"}</code>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <pre className="overflow-x-auto rounded-lg bg-background">
                          <code className="text-sm font-mono">
                            {`// Generate text with streaming
const handleGenerate = async () => {
  await generate({
    prompt: "Write a story about...",
    onStream: (text) => {
      // Handle streaming text updates
    }
  })
}`}
                          </code>
                        </pre>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <FileCode className="h-4 w-4 text-primary" />
                    <p className="text-sm">Structured Data Generation</p>
                  </div>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="object" className="ring ring-foreground/10 rounded-lg">
                      <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted [&[data-state=open]>svg]:rotate-180">
                        <code className="text-sm font-mono">{"const { generate, isLoading } = useGenerateObject()"}</code>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <pre className="overflow-x-auto rounded-lg bg-background">
                          <code className="text-sm font-mono">
                            {`// Generate structured data
const handleGenerate = async () => {
  const result = await generate({
    prompt: "Generate a profile for...",
    schema: {
      name: z.string(),
      age: z.number(),
      bio: z.string(),
      interests: z.array(z.string())
    }
  })
}`}
                          </code>
                        </pre>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <FileCode className="h-4 w-4 text-primary" />
                    <p className="text-sm">String Array Generation</p>
                  </div>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="strings" className="ring ring-foreground/10 rounded-lg">
                      <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted [&[data-state=open]>svg]:rotate-180">
                        <code className="text-sm font-mono">{"const { generate, isLoading } = useGenerateStrings()"}</code>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <pre className="overflow-x-auto rounded-lg bg-background">
                          <code className="text-sm font-mono">
                            {`// Generate array of strings
const handleGenerate = async () => {
  const strings = await generate({
    prompt: "Generate 5 creative names for...",
    count: 5
  })
}`}
                          </code>
                        </pre>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <FileCode className="h-4 w-4 text-primary" />
                    <p className="text-sm">Image Generation</p>
                  </div>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="image" className="ring ring-foreground/10 rounded-lg">
                      <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted [&[data-state=open]>svg]:rotate-180">
                        <code className="text-sm font-mono">{"const { generate, isLoading } = useGenerateImage()"}</code>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <pre className="overflow-x-auto rounded-lg bg-background">
                          <code className="text-sm font-mono">
                            {`// Generate an image
const handleGenerate = async () => {
  const imageUrl = await generate({
    prompt: "A beautiful landscape with...",
    width: 1024,
    height: 1024
  })
}`}
                          </code>
                        </pre>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-all hover:shadow-md hover:shadow-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Test
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Keep the party going without crashes! Our Playwright testing setup lets you vibe with confidence. Even AI can&apos;t break your app when you&apos;ve got tests! 🧪
              </p>
              <div className="mt-4 space-y-4">
                <div className="rounded-md bg-muted p-4">
                  <div className="flex items-center space-x-2">
                    <Terminal className="h-4 w-4 text-primary" />
                    <p className="font-mono text-sm">Open the test console</p>
                  </div>
                  <pre className="mt-2 overflow-x-auto rounded-lg border bg-background p-4">
                    <code className="text-sm font-mono">pnpm pw</code>
                  </pre>
                </div>
                <div className="rounded-md bg-muted p-4">
                  <div className="flex items-center space-x-2">
                    <Terminal className="h-4 w-4 text-primary" />
                    <p className="font-mono text-sm">Run the whole test suite</p>
                  </div>
                  <pre className="mt-2 overflow-x-auto rounded-lg border bg-background p-4">
                    <code className="text-sm font-mono">pnpm test</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-all hover:shadow-md hover:shadow-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CloudUpload className="h-5 w-5 text-primary" />
                Ship
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Vibe-code friendly NPM scripts 🌊</p>
              <div className="mt-4 space-y-4">
                <div className="rounded-md bg-muted p-4">
                  <div className="flex items-start space-x-2">
                    <Terminal className="h-4 w-4 relative top-0.5 text-primary flex-shrink-0" />
                    <p className="font-mono text-sm">Go straight to production without even writing a commit message.</p>
                  </div>
                  <pre className="mt-2 overflow-x-auto rounded-lg border bg-background p-4">
                    <code className="text-sm font-mono">pnpm go</code>
                  </pre>
                </div>
                <div className="rounded-md bg-muted p-4">
                  <div className="flex items-start space-x-2">
                    <Terminal className="h-4 w-4 relative top-0.5 text-primary flex-shrink-0" />
                    <p className="font-mono text-sm">Ship it to production with full CI checks.</p>
                  </div>
                  <pre className="mt-2 overflow-x-auto rounded-lg border bg-background p-4">
                    <code className="text-sm font-mono">pnpm ship</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Stay Connected</span>
          <Heading variant="h2" className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
            Join the <span className="text-primary">Vibe Tribe</span>
          </Heading>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 text-balance">
            Sign up for our mailing list and stay up to date with the latest features, updates, and community vibes! 🎉
          </p>
          <Button asChild size="lg" className="mt-4">
            <Link href="/mailing-list" className="gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10c0-.63.3-1.22.8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
                <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
              </svg>
              Sign Up for Mailing List
            </Link>
          </Button>
        </div>
      </section>
      <section className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <Heading variant="h2" className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
            Features <span className="text-green-500">Roadmap</span>
          </Heading>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 text-balance">See what&apos;s coming next and share your ideas.</p>
          <Button asChild size="lg" className="mt-4 bg-green-500 hover:bg-green-600">
            <Link href="/roadmap">
              <Blocks className="h-5 w-5 scale-125" />
              View Roadmap
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
