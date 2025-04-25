import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Heading } from "@/components/typography/heading"
import { BadgeDollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CursorPrompt } from "./cursor-prompt"

export default async function GetStartedPayments() {
  // Check for required configuration
  const hasStripe = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY && process.env.STRIPE_SECRET_KEY

  const cursorPrompt = `Please help me remove Stripe payment functionality from my project by:

1. Deleting these files:
   - app/api/stripe/webhook/route.ts
   - app/api/stripe/create-checkout/route.ts
   - lib/stripe.ts
   - components/payments/checkout-button.tsx

2. Removing these dependencies from package.json:
   - stripe
   - @stripe/stripe-js

3. Removing these environment variables from .env:
   - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
   - STRIPE_SECRET_KEY

4. And remove getstarted-payments from the get-started page

After these changes, please run \`pnpm install\` to update the dependency tree.`

  return (
    <>
      {!hasStripe ? (
        <div className="max-w-4xl mx-auto px-4 w-full">
          <Card className="p-8 mt-8 w-full">
            <Heading variant="h4" className="text-primary">
              Setup Required: Payments (Stripe)
            </Heading>
            <p>To set up payment processing with Stripe:</p>
            <ol className="list-decimal pl-6 space-y-4">
              <li>
                <strong>Create a Stripe Account:</strong>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>
                    Sign up at{" "}
                    <a href="https://dashboard.stripe.com/register" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Stripe Dashboard
                    </a>
                  </li>
                  <li>Complete the account verification process</li>
                  <li>Switch between test and live modes as needed</li>
                </ul>
              </li>
              <li>
                <strong>Get API Keys:</strong>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>
                    Go to the{" "}
                    <a href="https://dashboard.stripe.com/apikeys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Stripe API Keys page
                    </a>
                  </li>
                  <li>Copy your publishable key and secret key</li>
                  <li>Make sure you’re using the correct mode (test/live) keys</li>
                </ul>
              </li>
              <li>
                Create or update your <code className="px-2 py-1 bg-muted rounded">.env</code> file with the following variables:
                <pre className="mt-2 p-4 bg-muted rounded-md max-w-xl overflow-x-auto">
                  <code>
                    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key{"\n"}
                    STRIPE_SECRET_KEY=your_secret_key
                  </code>
                </pre>
              </li>
              <li>Restart your development server after adding the environment variables</li>
            </ol>

            <div className="mt-6 space-y-4">
              <div className="p-4 bg-amber-50 rounded-md">
                <p className="text-amber-800 text-sm">
                  <strong>Security Note:</strong> Never expose your Stripe secret key in client-side code or commit it to version control. Only the publishable key should be public.
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-md">
                <p className="text-blue-800 text-sm">
                  <strong>Testing Tip:</strong> Use Stripe’s test mode and{" "}
                  <a href="https://stripe.com/docs/testing#cards" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    test card numbers
                  </a>{" "}
                  for development.
                </p>
              </div>
            </div>

            <div className="pt-8">
              <CursorPrompt prompt={cursorPrompt} heading="Don’t need payments?" />
            </div>
          </Card>
        </div>
      ) : (
        <div className="mx-auto text-center max-w-2xl w-full">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="features">
              <AccordionTrigger className="text-green-600 font-semibold">✓ Stripe Payments are configured!</AccordionTrigger>
              <AccordionContent>
                <div className="text-left">
                  <p className="mb-4">Your payment system is ready to use. You can now:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Process one-time payments</li>
                    <li>Set up recurring subscriptions</li>
                    <li>Handle payment webhooks</li>
                    <li>Access payment analytics</li>
                  </ul>
                  <div className="mt-6 p-4 bg-blue-50 rounded-md">
                    <p className="text-blue-800 text-sm">
                      <strong>Tip:</strong> Monitor your payments and manage settings in the{" "}
                      <a href="https://dashboard.stripe.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Stripe Dashboard
                      </a>
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Button asChild className="w-[210px]">
                    <Link href="/demo/upload">
                      <BadgeDollarSign className="w-5 h-5 scale-110 text-amber-300" />
                      Open Payment Form
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
