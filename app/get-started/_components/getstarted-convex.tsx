import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Heading } from "@/components/typography/heading"
import { CursorPrompt } from "./cursor-prompt"

export default async function GetStartedConvex() {
  const hasConvexConfig = Boolean(process.env.CONVEX_DEPLOYMENT)

  const cursorPrompt = `Add a new table to convex/schema.ts. For example, to add a posts table:\n\n\`\`\`typescript\nposts: defineTable({\n  title: v.string(),\n  content: v.string(),\n  createdAt: v.number(),\n})\n\`\`\`\n\n[ Describe the table you want to add here... ]\n\nThen run \`npx convex codegen\` to update your generated types.`

  if (!hasConvexConfig) {
    return (
      <div className="max-w-4xl mx-auto px-4 w-full">
        <Card className="p-8 mt-8 w-full">
          <Heading variant="h4" className="text-primary">
            Setup Required: Convex Database
          </Heading>
          <p>
            To finish setting up Convex, add your <strong>CONVEX_DEPLOYMENT</strong> to your <code className="px-2 py-1 bg-muted rounded">.env</code> file:
          </p>
          <ol className="list-decimal pl-6 space-y-4 mt-4">
            <li>
              Get your deploy key from the{" "}
              <a href="https://dashboard.convex.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Convex Dashboard
              </a>
              .
            </li>
            <li>
              Add it to your <code className="px-2 py-1 bg-muted rounded">.env</code> file as:
              <pre className="mt-2 p-4 bg-muted rounded-md max-w-xl overflow-x-auto">
                <code>{`CONVEX_DEPLOYMENT=your_deploy_key_here`}</code>
              </pre>
            </li>
            <li>Restart your development server after adding the environment variable.</li>
          </ol>
          <div className="mt-8">
            <Heading variant="h5" className="mb-2 text-primary">
              Next: Add Your First Table
            </Heading>
            <p>
              To finish setting up Convex, add your own table to <code className="px-2 py-1 bg-muted rounded">convex/schema.ts</code>:
            </p>
            <ol className="list-decimal pl-6 space-y-4 mt-4">
              <li>
                Open <code className="px-2 py-1 bg-muted rounded">convex/schema.ts</code> and add a new table. For example:
                <pre className="mt-2 p-4 bg-muted rounded-md max-w-xl overflow-x-auto">
                  <code>{`posts: defineTable({\n  title: v.string(),\n  content: v.string(),\n  createdAt: v.number(),\n})`}</code>
                </pre>
              </li>
              <li>
                Run <code>npx convex codegen</code> to update your generated types.
              </li>
              <li>
                (Optional) Use this prompt in Cursor or your LLM:
                <pre className="mt-2 p-4 bg-muted rounded-md max-w-xl overflow-x-auto">
                  <code>{`Add a new table to convex/schema.ts for blog posts with fields: title (string), content (string), createdAt (number)`}</code>
                </pre>
              </li>
            </ol>
            <div className="pt-8 flex flex-col gap-4">
              <CursorPrompt prompt={cursorPrompt} heading="Need help setting up a Convex table?" />
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto text-center max-w-2xl w-full">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="features">
          <AccordionTrigger className="text-green-600 font-semibold">✓ Convex is configured!</AccordionTrigger>
          <AccordionContent>
            <div className="text-left">
              <p className="mb-4">Your database is ready to use. You can now:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Create and manage Convex tables through <code>schema.ts</code>
                </li>
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
  )
}
