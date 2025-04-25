import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Heading } from "@/components/typography/heading"
import { isClerkConfigured } from "@/lib/auth-utils"
import { CopyOneliner } from "@/components/ui/copy-oneliner"
import { CursorPrompt } from "./cursor-prompt"

export default async function GetStartedTesting() {
  // Check for required configuration
  const hasClerk = isClerkConfigured()
  const hasTestConfig = process.env.TEST_USER_EMAIL && process.env.TEST_USER_PASSWORD && process.env.TEST_USER_ID

  const cursorPrompt = `Please help me remove test user configuration from my project by:

1. Removing these environment variables from .env:
   - TEST_USER_EMAIL
   - TEST_USER_PASSWORD
   - TEST_USER_ID

2. Removing test-specific code and files:
   - Delete all files in /tests directory:
     - /tests/utils/auth-helpers.ts
     - /tests/utils/test-helpers.ts
     - /tests/utils/db-reset.ts
     - /tests/global-setup.ts
     - /tests/auth.spec.ts
     - /tests/admin.spec.ts
     - /tests/subscribe.spec.ts
     - /tests/contact.spec.ts
   - Delete /app/get-started/_components/getstarted-testing.tsx
   - Remove test user section from components/home/content-section.tsx

3. Remove test-related packages:
   - Uninstall @clerk/testing and @playwright/test
   - Remove test-related scripts from package.json

4. Remove test user section from .env and .example-env files`

  return (
    <>
      {!hasClerk || !hasTestConfig ? (
        <div className="max-w-4xl mx-auto px-4 w-full">
          <Card className="p-8 mt-8 w-full">
            <Heading variant="h4" className="text-primary">
              Setup Optional: Test User Configuration
            </Heading>
            <p>To set up test user credentials for automated testing:</p>
            <ol className="list-decimal pl-6 space-y-4">
              {!hasClerk && <li className="text-muted-foreground">First, set up Clerk authentication (see above)</li>}
              <li>
                <strong>Create a Test User:</strong>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Sign up for an account in your application using email/password</li>
                  <li>
                    Get your User ID from the{" "}
                    <a href="https://dashboard.clerk.com/users" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Clerk Dashboard
                    </a>
                  </li>
                  <li>Note down the email and password you used</li>
                </ul>
              </li>
              <li>
                Create or update your <code className="px-2 py-1 bg-muted rounded">.env</code> file with:
                <pre className="mt-2 p-4 bg-muted rounded-md max-w-xl overflow-x-auto">
                  <code>
                    # Replace with your actual test user credentials{"\n"}
                    TEST_USER_EMAIL=john.polacek@gmail.com{"\n"}
                    TEST_USER_PASSWORD=PartyStarter1!{"\n"}
                    TEST_USER_ID=user_2v6r3ksK9AuMtLjLlJnXbti6mCK
                  </code>
                </pre>
              </li>
              <li>Restart your development server after adding the environment variables</li>
            </ol>

            <div className="mt-6 space-y-4">
              <div className="p-4 bg-amber-50 rounded-md">
                <p className="text-amber-800 text-sm">
                  <strong>Security Note:</strong> Never use production credentials for testing. Create a dedicated test account with a strong password.
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-md">
                <p className="text-blue-800 text-sm">
                  <strong>Tip:</strong> You can use these credentials in your end-to-end tests to automate user authentication flows.
                </p>
              </div>
            </div>

            <div className="pt-8">
              <CursorPrompt prompt={cursorPrompt} heading="Don't need test user configuration?" />
            </div>
          </Card>
        </div>
      ) : (
        <div className="mx-auto text-center max-w-2xl w-full">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="features">
              <AccordionTrigger className="text-green-600 font-semibold">
                <div className="flex items-center gap-2">
                  <span>✓ Test User is configured!</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="text-left">
                  <p className="mb-4">Your test configuration is ready. You can now:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Run automated authentication tests</li>
                    <li>Test protected routes and features</li>
                    <li>Simulate user sessions</li>
                    <li>Verify email-based flows</li>
                  </ul>
                </div>
                <CopyOneliner className="w-[210px] mt-4">pnpm pw</CopyOneliner>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </>
  )
}
