import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Heading } from "@/components/typography/heading"
import { CursorPrompt } from "./cursor-prompt"

// Simple check for Firebase configuration
const isFirebaseConfigured = () => {
  return Boolean(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID && process.env.NEXT_PUBLIC_FIREBASE_API_KEY && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY)
}

export default async function GetStartedFirebase() {
  const hasFirebaseConfig = isFirebaseConfigured()

  const cursorPrompt = `Please help me set up Firebase in my project by:

1. Installing dependencies:
   \`\`\`bash
   pnpm add firebase firebase-admin
   \`\`\`

2. Creating these files:
   - lib/firebase/config.ts (Firebase client config)
   - lib/firebase/admin.ts (Firebase Admin SDK config)
   - lib/firebase/utils.ts (Firestore utility functions)

3. Setting up environment variables in .env:
   - NEXT_PUBLIC_FIREBASE_PROJECT_ID
   - NEXT_PUBLIC_FIREBASE_API_KEY
   - FIREBASE_CLIENT_EMAIL
   - FIREBASE_PRIVATE_KEY

4. Initialize Firebase locally:
   \`\`\`bash
   pnpm db:local:init
   \`\`\`

5. Install Java for Firebase Emulator:
   - Visit java.com to download and install Java
   - Verify installation with \`java -version\`

6. Remove the getstarted-firebase section from the get-started page

After these changes, you can start the Firebase emulator with \`pnpm db:emulator:start\`.`

  return (
    <>
      {!hasFirebaseConfig ? (
        <div className="max-w-4xl mx-auto px-4 w-full">
          <Card className="p-8 mt-8 w-full">
            <Heading variant="h4" className="text-primary">
              Setup Required: Firebase Database
            </Heading>
            <p>To set up your database with Firebase:</p>
            <ol className="list-decimal pl-6 space-y-4">
              <li>
                Create a new project on{" "}
                <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Firebase Console
                </a>
              </li>
              <li>Enable Firestore in your project (for the web)</li>
              <li>
                Get your firebase config and update <code className="px-2 py-1 bg-muted rounded">lib/config.ts</code>
              </li>
              <li>
                Go to Project Settings &gt; Service accounts then generate a new service account key and update your <code className="px-2 py-1 bg-muted rounded">.env</code> file with the following
                variables:
                <pre className="mt-2 p-4 bg-muted rounded-md max-w-xl overflow-x-auto">
                  <code>
                    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id{"\n"}
                    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key{"\n"}
                    FIREBASE_CLIENT_EMAIL=your_service_account_email{"\n"}
                    FIREBASE_PRIVATE_KEY=&quot;-----BEGIN PRIVATE KEY-----\nYour Private Key\n-----END PRIVATE KEY-----\n&quot;
                  </code>
                </pre>
              </li>
              <li>
                Install Java for the Firebase Emulator:
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>
                    Download and install Java from{" "}
                    <a href="https://www.java.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      java.com
                    </a>
                  </li>
                  <li>
                    Verify installation by running <code className="px-2 py-1 bg-muted rounded">java -version</code>
                  </li>
                </ul>
              </li>
              <li>
                Initialize Firebase locally by running <code className="px-2 py-1 bg-muted rounded">pnpm db:local:init</code>
              </li>
              <li>Restart your development server after adding the environment variables</li>
            </ol>

            <div className="pt-8">
              <CursorPrompt prompt={cursorPrompt} heading="Don’t need Firebase?" />
            </div>
          </Card>
        </div>
      ) : (
        <div className="mx-auto text-center max-w-2xl w-full">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="features">
              <AccordionTrigger className="text-green-600 font-semibold">✓ Firebase is configured!</AccordionTrigger>
              <AccordionContent>
                <div className="text-left">
                  <p className="mb-4">Your database is ready to use. You can now:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Create and manage Firestore collections</li>
                    <li>Use the Firebase client for queries</li>
                    <li>Set up real-time listeners</li>
                    <li>Manage security rules and indexes</li>
                  </ul>
                  <div className="mt-6 p-4 bg-amber-50 rounded-md">
                    <p className="text-amber-800 text-sm">
                      <strong>Tip:</strong> You can manage your Firebase project, including database, authentication, and more in the{" "}
                      <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">
                        Firebase Console
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
