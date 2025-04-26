import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Heading } from "@/components/typography/heading"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { isClerkConfigured, isAdminConfigured } from "@/lib/auth-utils"
import { ShieldUser } from "lucide-react"
import { CursorPrompt } from "./cursor-prompt"

export default function GetStartedAdmin() {
  const hasClerk = isClerkConfigured()
  const hasAdminConfig = isAdminConfigured()

  const cursorPrompt = `Please help me remove admin functionality from my project by:

1. Deleting these files:
   - app/admin/page.tsx
   - app/admin/layout.tsx
   - app/admin/components/
   - lib/admin.ts

2. Removing these environment variables from .env:
   - ADMIN_USER_IDS

3. And remove getstarted-admin from the get-started page`

  return (
    <>
      {!hasClerk || !hasAdminConfig ? (
        <div className="max-w-4xl mx-auto px-4 w-full">
          <Card className="p-8 mt-8 w-full">
            <Heading variant="h4" className="text-primary">
              Setup Required: Admin Dashboard
            </Heading>
            <p>To set up the admin dashboard functionality:</p>
            <ol className="list-decimal pl-6 space-y-4">
              {!hasClerk && <li className="text-muted-foreground">First, set up Clerk authentication (see above)</li>}
              <li>
                <strong>Configure Admin Access:</strong>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Sign in to your application using Clerk</li>
                  <li>
                    Get your Clerk User ID from the{" "}
                    <a href="https://dashboard.clerk.com/users" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Clerk Dashboard
                    </a>
                  </li>
                  <li>Add your User ID to the environment variables</li>
                </ul>
              </li>
              <li>
                Create or update your <code className="px-2 py-1 bg-muted rounded">.env</code> file with:
                <pre className="mt-2 p-4 bg-muted rounded-md max-w-xl overflow-x-auto">
                  <code>
                    # Replace with your Clerk user ID after signing in{"\n"}
                    ADMIN_USER_IDS=your_user_id
                  </code>
                </pre>
              </li>
              <li>Restart your development server after adding the environment variables</li>
            </ol>

            <div className="mt-6 space-y-4">
              <div className="p-4 bg-amber-50 rounded-md">
                <p className="text-amber-800 text-sm">
                  <strong>Security Note:</strong> Only add trusted user IDs to the admin list. These users will have full access to your application’s admin features.
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-md">
                <p className="text-blue-800 text-sm">
                  <strong>Tip:</strong> You can add multiple admin users by separating their IDs with commas (e.g., <code className="text-blue-600">user_123,user_456</code>)
                </p>
              </div>
            </div>

            <div className="pt-8">
              <CursorPrompt prompt={cursorPrompt} heading="Don't need admin functionality?" />
            </div>
          </Card>
        </div>
      ) : (
        <div className="mx-auto text-center max-w-2xl w-full">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="features">
              <AccordionTrigger className="text-green-600 font-semibold">✓ Admin Dashboard is configured!</AccordionTrigger>
              <AccordionContent>
                <div className="text-left">
                  <p className="mb-4">Your admin system is ready to use. You can now:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-6">
                    <li>Access the admin dashboard</li>
                    <li>Manage users and content</li>
                    <li>View analytics and reports</li>
                    <li>Configure system settings</li>
                  </ul>
                </div>
                <div className="mt-4">
                  <Button asChild>
                    <Link href="/admin">
                      <ShieldUser className="w-5 h-5 scale-110 text-amber-300" />
                      Open Admin Dashboard
                    </Link>
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </>
  )
}
