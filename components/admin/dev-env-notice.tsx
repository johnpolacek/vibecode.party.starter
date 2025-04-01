import { Card, CardContent } from "@/components/ui/card"
import { Heading } from "../typography/heading"

export function DevEnvNotice() {
  return (
    <Card className="mb-8 bg-blue-500/5 border-blue-500/20">
      <CardContent>
        <div className="flex items-start gap-4">
          <div className="space-y-4 text-balance">
            <Heading variant="h5" className="font-medium">
              Development Environment
            </Heading>
            <p className="text-sm text-muted-foreground">
              You are running this application in a local development environment. The <code className="px-1.5 py-0.5 rounded-md bg-muted">ADMIN_USER_IDS</code> environment variable is currently set
              to:
            </p>
            <div className="mt-2">
              <code className="block w-full px-3 py-2 text-sm bg-muted rounded-md">{process.env.ADMIN_USER_IDS || "Not configured"}</code>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              To add more admin users, update this variable in your <code className="px-1 py-0.5 rounded-md bg-muted">.env</code> file with a comma-separated list of Clerk user IDs.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
