"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Rocket, Zap, Check, Terminal, Music, Flame } from "lucide-react"
import { Heading } from "../typography/heading"
import { FeatureCard } from "./feature-card"
import { ContactFormPreview, AuthFlowPreview } from "./feature-previews"
import { ContactIcon, AuthIcon, FileUploadIcon } from "./feature-icons"

export function ContentSection() {
  return (
    <>
      <section id="features" className="container space-y-6 py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">The Good Stuff</span>
          <Heading variant="h2" className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
            Party <span className="text-primary">Favors</span> Included
          </Heading>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">We packed all these awesome goodies so you can focus on vibing, not configuring!</p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <Card className="border-primary/20 bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-all hover:shadow-md hover:shadow-primary/10 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Shadcn/UI Components</CardTitle>
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
              <p className="text-sm text-muted-foreground">Gorgeous UI components that make your app look like a million bucks! 💅</p>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-all hover:shadow-md hover:shadow-primary/10 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
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
              <p className="text-sm text-muted-foreground">Clerk auth that's so easy, you'll set it up before your coffee gets cold! ☕</p>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-all hover:shadow-md hover:shadow-primary/10 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
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
              <p className="text-sm text-muted-foreground">Supabase that's super-powered! Store your data with style. 🗄️</p>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-all hover:shadow-md hover:shadow-primary/10 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
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
              <p className="text-sm text-muted-foreground">AWS S3 storage that's ready to handle all your party pics! 📸</p>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-all hover:shadow-md hover:shadow-primary/10 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
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
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
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
        </div>
      </section>
      <section id="get-started" className="container py-8 md:py-12 lg:py-24 relative">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_70%_30%,hsl(var(--secondary))_0,transparent_50%),radial-gradient(circle_at_30%_70%,hsl(var(--primary))_0,transparent_50%)]"></div>
        </div>
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Let's Go!</span>
          <Heading variant="h2" className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
            Join the <span className="text-primary">Party</span>
          </Heading>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">Follow these simple steps and you'll be vibing in no time! 🕺💃</p>
        </div>
        <div className="mx-auto grid max-w-4xl items-center gap-10 py-12">
          <Tabs defaultValue="install" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="install" className="text-base">
                🚀 Installation
              </TabsTrigger>
              <TabsTrigger value="env" className="text-base">
                ⚙️ Environment Setup
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
                    <div className="flex items-center space-x-2">
                      <Terminal className="h-4 w-4 text-primary" />
                      <p className="font-mono text-sm">Install the party supplies</p>
                    </div>
                    <pre className="mt-2 overflow-x-auto rounded-lg border bg-background p-4">
                      <code className="text-sm font-mono">pnpm install</code>
                    </pre>
                  </div>
                  <div className="rounded-md bg-muted p-4">
                    <div className="flex items-center space-x-2">
                      <Terminal className="h-4 w-4 text-primary" />
                      <p className="font-mono text-sm">Fire up the party</p>
                    </div>
                    <pre className="mt-2 overflow-x-auto rounded-lg border bg-background p-4">
                      <code className="text-sm font-mono">pnpm dev</code>
                    </pre>
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
                      <p className="font-mono text-sm">✨ Clerk Authentication</p>
                    </div>
                    <pre className="mt-2 overflow-x-auto rounded-lg border bg-background p-4">
                      <code className="text-sm font-mono">
                        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
                        <br />
                        CLERK_SECRET_KEY=
                        <br />
                        ADMIN_USER_IDS=user_1234567890,user_0987654321
                      </code>
                    </pre>
                  </div>
                  <div className="rounded-md bg-muted p-4">
                    <div className="flex items-center space-x-2">
                      <p className="font-mono text-sm">🔥 Supabase Database</p>
                    </div>
                    <pre className="mt-2 overflow-x-auto rounded-lg border bg-background p-4">
                      <code className="text-sm font-mono">
                        NEXT_PUBLIC_SUPABASE_URL=
                        <br />
                        SUPABASE_SERVICE_ROLE_KEY=
                      </code>
                    </pre>
                  </div>
                  <div className="rounded-md bg-muted p-4">
                    <div className="flex items-center space-x-2">
                      <p className="font-mono text-sm">💾 AWS S3 Storage</p>
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
                      </code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      <section id="full-stack-components" className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Ready-to-Use</span>
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
            Full-Stack <span className="text-primary">Components</span>
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">Plug-and-play components that just work! No assembly required! 🧩</p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 py-12">
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
            link="/upload"
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
            link="/donate"
            linkText="Try Payment System"
          />
        </div>
      </section>
      <section id="services" className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">The VIP Section</span>
          <Heading variant="h2" className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
            Premium <span className="text-primary">Integrations</span>
          </Heading>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">We've got the hottest services ready to make your app the life of the party! 🔥</p>
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
            <CardContent>
              <p className="text-muted-foreground">
                The components in this starter are so stylish, they make other UIs jealous! Built with Shadcn/UI, TailwindCSS, and Lucide icons. Mix, match, and make magic! ✨
              </p>
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
                  className="h-5 w-5 text-primary"
                >
                  <path d="M16 16v-3a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2v3"></path>
                  <circle cx="12" cy="7" r="3"></circle>
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
                </svg>
                Clerk for Auth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Authentication so smooth, users will think they're already logged in! Create a Clerk project, add some env vars, and boom—you've got auth that rocks! 🔐
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>User auth components ready to party</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>VIP admin access configuration</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Social login that's actually social</span>
                </li>
              </ul>
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
                  className="h-5 w-5 text-primary"
                >
                  <path d="M12 2C6.5 2 2 4 2 7v10c0 3 4.5 5 10 5s10-2 10-5V7c0-3-4.5-5-10-5z"></path>
                  <path d="M2 7c0 3 4.5 5 10 5s10-2 10-5"></path>
                  <path d="M2 12c0 3 4.5 5 10 5s10-2 10-5"></path>
                </svg>
                Supabase for Cloud Database
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">A database that's super in name AND function! Supabase gives you PostgreSQL powers with real-time updates that'll make your data dance! 💃</p>
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
                  className="h-5 w-5 text-primary"
                >
                  <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <path d="M2 15h10"></path>
                  <path d="M9 18l3-3-3-3"></path>
                </svg>
                AWS S3 for File Storage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Store files like a boss! AWS S3 with Cloudfront makes your images load faster than a DJ drops the beat! 🎧</p>
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
                  className="h-5 w-5 text-primary"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                SendGrid for Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Emails that actually arrive! SendGrid makes sure your messages don't get ghosted. Plus, our contact form has ReCAPTCHA to keep the party crashers out! 📧
              </p>
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
                  className="h-5 w-5 text-primary"
                >
                  <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                  <line x1="2" y1="10" x2="22" y2="10"></line>
                </svg>
                Stripe for Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Ka-ching! Stripe makes taking payments so easy, you'll wonder why you ever worried about it. Money moves in, stress stays out! 💰</p>
            </CardContent>
          </Card>
        </div>
      </section>
      <section id="development" className="container py-8 md:py-12 lg:py-24 bg-primary/5 rounded-lg">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Party Tricks</span>
          <Heading variant="h2" className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
            Dev <span className="text-primary">Superpowers</span>
          </Heading>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">Tools to keep your code quality high and your vibes even higher! 🚀</p>
        </div>
        <div className="mx-auto grid max-w-4xl gap-8 py-12 lg:grid-cols-2">
          <Card className="border-primary/20 bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-all hover:shadow-md hover:shadow-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-primary" />
                Linting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Code so clean it sparkles! ✨ Our eslint and prettier setup automatically formats your code with every save and paste. No more messy code at this party!
              </p>
              <div className="mt-4 rounded-md bg-muted p-4">
                <div className="flex items-center space-x-2">
                  <Terminal className="h-4 w-4 text-primary" />
                  <p className="font-mono text-sm">Run the clean machine</p>
                </div>
                <pre className="mt-2 overflow-x-auto rounded-lg border bg-background p-4">
                  <code className="text-sm font-mono">pnpm lint</code>
                </pre>
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-all hover:shadow-md hover:shadow-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="h-5 w-5 text-primary" />
                Testing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Keep the party going without crashes! Our Playwright testing setup lets you vibe with confidence. Even AI can't break your app when you've got tests! 🧪
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
        </div>
      </section>
    </>
  )
}
