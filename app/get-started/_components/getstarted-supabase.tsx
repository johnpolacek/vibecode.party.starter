import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default async function GetStartedSupabase() {
  // Check for Supabase configuration
  const hasSupabaseConfig = process.env.SUPABASE_PROJECT_REF && process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.SUPABASE_DB_PASSWORD

  return (
    <div className="max-w-4xl mx-auto px-4 w-full">
      {!hasSupabaseConfig ? (
        <Card className="py-2 px-8 mt-8 w-full">
          <h3 className="text-xl font-semibold">Setup Required: Supabase Database</h3>
          <p>To set up your database with Supabase:</p>
          <ol className="list-decimal pl-6 space-y-4">
            <li>
              Create a new project on{" "}
              <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Supabase Dashboard
              </a>
            </li>
            <li>Go to Project Settings → API to find your project credentials</li>
            <li>
              Create or update your <code className="px-2 py-1 bg-muted rounded">.env</code> file with the following variables:
              <pre className="mt-2 p-4 bg-muted rounded-md max-w-xl overflow-x-auto">
                <code>
                  SUPABASE_PROJECT_REF=your_project_reference{"\n"}
                  NEXT_PUBLIC_SUPABASE_URL=your_project_url{"\n"}
                  SUPABASE_SERVICE_ROLE_KEY=your_service_role_key{"\n"}
                  SUPABASE_DB_PASSWORD=your_database_password{"\n"}
                  SUPABASE_PROD_URL=your_production_url # Optional for production
                </code>
              </pre>
            </li>
            <li>Restart your development server after adding the environment variables</li>
          </ol>
          <div className="mt-6 p-4 bg-amber-50 rounded-md">
            <p className="text-amber-800 text-sm">
              <strong>Note:</strong> Make sure to never commit your <code className="px-1 py-0.5 bg-amber-100 rounded">.env</code> file to version control. Add it to your{" "}
              <code className="px-1 py-0.5 bg-amber-100 rounded">.gitignore</code> file if it's not already there.
            </p>
          </div>
        </Card>
      ) : (
        <Card className="py-2 px-8 mt-8 mx-auto text-center max-w-2xl w-full">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="features">
              <AccordionTrigger className="text-green-600 font-semibold">✓ Supabase is properly configured!</AccordionTrigger>
              <AccordionContent>
                <div className="text-left">
                  <p className="mb-4">Your database is ready to use. You can now:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Create and manage database tables</li>
                    <li>Use the Supabase client for queries</li>
                    <li>Set up real-time subscriptions</li>
                    <li>Manage database access policies</li>
                  </ul>
                  <div className="mt-6 p-4 bg-blue-50 rounded-md">
                    <p className="text-blue-800 text-sm">
                      <strong>Tip:</strong> You can find your project's database configuration and management tools in the{" "}
                      <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Supabase Dashboard
                      </a>
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      )}
    </div>
  )
}
