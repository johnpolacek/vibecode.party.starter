import { Card } from "@/components/ui/card"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Heading } from "@/components/typography/heading"
export default async function GetStartedClerk() {
  // Check if we're on localhost
  const headersList = await headers()
  const host = headersList.get("host") || ""
  const isLocalhost = host.includes("localhost") || host.includes("127.0.0.1")

  // If not localhost, redirect to home
  if (!isLocalhost) {
    redirect("/")
  }

  // Check for Clerk configuration
  const hasClerkConfig = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY

  return (
    <>
      {!hasClerkConfig ? (
        <div className="max-w-4xl mx-auto px-4 w-full">
          <Card className="p-8 mt-8 w-full">
            <Heading variant="h4" className="text-primary">
              Setup Required: Clerk Authentication
            </Heading>
            <p>To get started, you need to set up Clerk authentication:</p>
            <ol className="list-decimal pl-6 space-y-4">
              <li>
                Create a new project on{" "}
                <a href="https://dashboard.clerk.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Clerk Dashboard
                </a>
              </li>
              <li>Copy your API keys from the Clerk Dashboard</li>
              <li>
                Create or update your <code className="px-2 py-1 bg-muted rounded">.env</code> file with the following variables:
                <pre className="mt-2 p-4 bg-muted rounded-md max-w-xl">
                  <code>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key{"\n"}CLERK_SECRET_KEY=your_secret_key</code>
                </pre>
              </li>
              <li>Restart your development server after adding the environment variables</li>
            </ol>
          </Card>
        </div>
      ) : (
        <div className="mx-auto text-center max-w-2xl w-full">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="features">
              <AccordionTrigger className="text-green-600 font-semibold">✓ Clerk is configured!</AccordionTrigger>
              <AccordionContent>
                <div className="text-left">
                  <p className="mb-4">Your authentication system is ready to use. You can now:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Sign up new users</li>
                    <li>Sign in existing users</li>
                    <li>Manage user sessions</li>
                    <li>Access protected routes</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </>
  )
}
