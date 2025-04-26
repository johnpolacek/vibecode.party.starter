import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Heading } from "@/components/typography/heading"
import { CursorPrompt } from "./cursor-prompt"

// Simple check for Convex configuration
const isConvexConfigured = () => {
  return Boolean(process.env.NEXT_PUBLIC_CONVEX_URL)
}

export default async function GetStartedConvex() {
  const hasConvexConfig = isConvexConfigured()

  const cursorPrompt = `Please help me set up Convex in my project by:

1. Installing dependencies:
   \`\`\`bash
   pnpm add convex
   \`\`\`

2. Initialize Convex:
   \`\`\`bash
   npx convex dev
   \`\`\`

3. Setting up environment variables in .env:
   - NEXT_PUBLIC_CONVEX_URL (from your Convex dashboard, e.g. https://your-app-name.convex.cloud)

4. Create the schema in convex/schema.ts
5. Create your first mutation and query in convex/visits.ts
6. Remove the getstarted-convex section from the get-started page

After these changes, you can start the development server with \`pnpm dev\`.

**Vercel Deploy Note:**
Add \`npx convex codegen\` before your build step (e.g. \`npx convex codegen && npm run build\`) in your Vercel build settings to ensure Convex client files are generated.`

  return (
    <>
      {!hasConvexConfig ? (
        <div className="max-w-4xl mx-auto px-4 w-full">
          <Card className="p-8 mt-8 w-full">
            <Heading variant="h4" className="text-primary">
              Setup Required: Convex Database
            </Heading>
            <p>To set up your database with Convex:</p>
            <ol className="list-decimal pl-6 space-y-4">
              <li>
                Create a new project on{" "}
                <a href="https://dashboard.convex.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Convex Dashboard
                </a>
              </li>
              <li>
                Install the Convex CLI and initialize your project:
                <pre className="mt-2 p-4 bg-muted rounded-md max-w-xl overflow-x-auto">
                  <code>
                    pnpm add convex{"\n"}
                    npx convex dev
                  </code>
                </pre>
              </li>
              <li>
                Get your Convex URL from the dashboard and update your <code className="px-2 py-1 bg-muted rounded">.env</code> file:
                <pre className="mt-2 p-4 bg-muted rounded-md max-w-xl overflow-x-auto">
                  <code>NEXT_PUBLIC_CONVEX_URL=https://your-app-name.convex.cloud</code>
                </pre>
                <div className="text-xs text-muted-foreground mt-2">
                  Find this in your{" "}
                  <a href="https://dashboard.convex.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Convex dashboard
                  </a>{" "}
                  under “Deployment URL”.
                </div>
              </li>
              <li>
                <strong>Vercel Deploy:</strong> In your Vercel project settings, set your build command to <code>npx convex codegen && npm run build</code> (or <code>pnpm build</code> if you use pnpm)
                to ensure Convex client files are generated.
              </li>
              <li>Restart your development server after adding the environment variables</li>
            </ol>

            <div className="pt-8">
              <CursorPrompt prompt={cursorPrompt} heading="Need help setting up Convex?" />
            </div>
          </Card>
        </div>
      ) : (
        <div className="mx-auto text-center max-w-2xl w-full">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="features">
              <AccordionTrigger className="text-green-600 font-semibold">✓ Convex is configured!</AccordionTrigger>
              <AccordionContent>
                <div className="text-left">
                  <p className="mb-4">Your database is ready to use. You can now:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Create and manage Convex tables through schema.ts</li>
                    <li>Write queries and mutations in your Convex functions</li>
                    <li>Set up real-time subscriptions</li>
                    <li>Use optimistic updates for better UX</li>
                  </ul>
                  <div className="mt-6 p-4 bg-amber-50 rounded-md">
                    <p className="text-amber-800 text-sm">
                      <strong>Tip:</strong> You can manage your Convex project, monitor queries, and view your data in the{" "}
                      <a href="https://dashboard.convex.dev" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">
                        Convex Dashboard
                      </a>
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </>
  )
}
