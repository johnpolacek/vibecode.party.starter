import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Heading } from "@/components/typography/heading"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CursorPrompt } from "./cursor-prompt"

export default async function GetStartedEmail() {
  // Check for required configuration
  const hasRecaptcha = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && process.env.RECAPTCHA_SECRET_KEY
  const hasEmail = process.env.SENDGRID_API_KEY && process.env.SENDGRID_SENDER && process.env.CONTACT_EMAIL && process.env.UNSUBSCRIBE_SECRET

  const cursorPrompt = `Please help me remove email and contact form functionality from my project by:

1. Deleting these files:
   - app/api/contact/route.ts
   - components/forms/contact-form.tsx
   - lib/email.ts

2. Removing these dependencies from package.json:
   - @sendgrid/mail
   - @types/grecaptcha
   - react-google-recaptcha-v3

3. Removing these environment variables from .env:
   - NEXT_PUBLIC_RECAPTCHA_SITE_KEY
   - RECAPTCHA_SECRET_KEY
   - SENDGRID_API_KEY
   - SENDGRID_SENDER
   - CONTACT_EMAIL
   - UNSUBSCRIBE_SECRET

4. And remove getstarted-email from the get-started page

After these changes, please run \`pnpm install\` to update the dependency tree.`

  return (
    <>
      {!hasRecaptcha || !hasEmail ? (
        <div className="max-w-4xl mx-auto px-4 w-full">
          <Card className="p-8 mt-8 w-full">
            <Heading variant="h4" className="text-primary">
              Setup Required: Email & Contact Form
            </Heading>
            <p>To set up email and contact form functionality:</p>
            <ol className="list-decimal pl-6 space-y-4">
              <li>
                <strong>Set up reCAPTCHA:</strong>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>
                    Go to the{" "}
                    <a href="https://www.google.com/recaptcha/admin" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      reCAPTCHA Admin Console
                    </a>
                  </li>
                  <li>Create a new site registration (use reCAPTCHA v3)</li>
                  <li>Add your domain to the allowed domains list</li>
                  <li>Copy your site key and secret key</li>
                </ul>
              </li>
              <li>
                <strong>Set up SendGrid:</strong>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>
                    Create an account on{" "}
                    <a href="https://signup.sendgrid.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      SendGrid
                    </a>
                  </li>
                  <li>Verify your sender identity</li>
                  <li>Create an API key with email sending permissions</li>
                </ul>
              </li>
              <li>
                Create or update your <code className="px-2 py-1 bg-muted rounded">.env</code> file with the following variables:
                <pre className="mt-2 p-4 bg-muted rounded-md max-w-xl overflow-x-auto">
                  <code>
                    # Recaptcha{"\n"}
                    NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key{"\n"}
                    RECAPTCHA_SECRET_KEY=your_secret_key{"\n"}
                    {"\n"}# Email{"\n"}
                    SENDGRID_API_KEY=your_api_key{"\n"}
                    SENDGRID_SENDER=your_verified_sender_email{"\n"}
                    CONTACT_EMAIL=your_contact_form_recipient{"\n"}
                    UNSUBSCRIBE_SECRET=your_unsubscribe_secret_key
                  </code>
                </pre>
              </li>
              <li>Restart your development server after adding the environment variables</li>
            </ol>

            <div className="mt-6 space-y-4">
              <div className="p-4 bg-amber-50 rounded-md">
                <p className="text-amber-800 text-sm">
                  <strong>Security Note:</strong> Never commit your secret keys to version control. Always use environment variables for sensitive data. The UNSUBSCRIBE_SECRET should be a long, random
                  string used to validate unsubscribe links.
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-md">
                <p className="text-blue-800 text-sm">
                  <strong>Testing Tip:</strong> Use SendGrid’s sandbox mode for testing to avoid using your email quota during development.
                </p>
              </div>
            </div>

            <div className="pt-8">
              <CursorPrompt prompt={cursorPrompt} heading="Don’t need email functionality?" />
            </div>
          </Card>
        </div>
      ) : (
        <div className="mx-auto text-center max-w-2xl w-full">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="features">
              <AccordionTrigger className="text-green-600 font-semibold">✓ Email & Contact Form are configured!</AccordionTrigger>
              <AccordionContent>
                <div className="text-left">
                  <p className="mb-4">Your email system is ready to use. You can now:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Use the contact form with reCAPTCHA protection</li>
                    <li>Send emails through SendGrid</li>
                    <li>Receive contact form submissions</li>
                    <li>Process unsubscribe requests securely</li>
                    <li>Customize email templates</li>
                  </ul>
                  <div className="mt-6 p-4 bg-blue-50 rounded-md">
                    <p className="text-blue-800 text-sm">
                      <strong>Tip:</strong> You can monitor your email activity and analytics in the{" "}
                      <a href="https://app.sendgrid.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        SendGrid Dashboard
                      </a>
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Button asChild className="w-[210px]">
                    <Link href="/contact">
                      <Mail className="w-5 h-5 scale-110 text-amber-300" />
                      Open Contact Form
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
