"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Heading } from "@/components/typography/heading"
import { CursorPrompt } from "./cursor-prompt"
import { Button } from "@/components/ui/button"

export default function GetStartedConvex() {
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDismissed(localStorage.getItem("convexConfigured") === "true")
    }
  }, [])

  function handleDismiss() {
    localStorage.setItem("convexConfigured", "true")
    setDismissed(true)
  }

  const cursorPrompt = `Add a new table to convex/schema.ts. For example, to add a posts table:

\`\`\`typescript
posts: defineTable({
  title: v.string(),
  content: v.string(),
  createdAt: v.number(),
})
\`\`\`

Then run \`npx convex codegen\` to update your generated types.`

  if (dismissed) {
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

  return (
    <div className="max-w-4xl mx-auto px-4 w-full">
      <Card className="p-8 mt-8 w-full">
        <Heading variant="h4" className="text-primary">
          Setup Required: Convex Database
        </Heading>
        <p>
          To finish setting up Convex, add your own table to <code className="px-2 py-1 bg-muted rounded">convex/schema.ts</code>:
        </p>
        <ol className="list-decimal pl-6 space-y-4 mt-4">
          <li>
            Open <code className="px-2 py-1 bg-muted rounded">convex/schema.ts</code> and add a new table. For example:
            <pre className="mt-2 p-4 bg-muted rounded-md max-w-xl overflow-x-auto">
              <code>{`posts: defineTable({
  title: v.string(),
  content: v.string(),
  createdAt: v.number(),
})`}</code>
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
          <li>When you are done, click Dismiss below to hide this card.</li>
        </ol>
        <div className="pt-8 flex flex-col gap-4">
          <CursorPrompt prompt={cursorPrompt} heading="Need help setting up a Convex table?" />
          <div className="flex justify-end pt-4">
            <Button className="px-8" variant="outline" onClick={handleDismiss}>
              Dismiss
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
