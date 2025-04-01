"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/nextjs"
import { Copy, ShieldUser } from "lucide-react"
import { toast } from "sonner"

export function AdminConfigMessage() {
  const { user } = useUser()

  const handleCopyId = () => {
    if (user?.id) {
      navigator.clipboard.writeText(user.id)
      toast.success("User ID copied to clipboard!")
    }
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex justify-center mb-4">
          <div className="p-2 rounded-full bg-amber-500/10">
            <ShieldUser className="w-8 h-8 text-amber-600" />
          </div>
        </div>
        <h3 className="text-lg font-medium text-center">Configure Admin Access</h3>
        <p className="text-sm text-muted-foreground text-center text-balance">
          To access admin features, you need to add your Clerk User ID to the <code className="px-1.5 py-0.5 rounded-md bg-muted">ADMIN_USER_IDS</code> environment variable.
        </p>
        <div className="p-4 rounded-lg bg-muted space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Your Clerk User ID:</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 px-3 py-2 rounded bg-background">{user?.id || "Not signed in"}</code>
              <Button size="icon" variant="outline" onClick={handleCopyId} disabled={!user?.id}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Add to your .env file:</p>
            <code className="block px-3 py-2 rounded bg-background text-sm">ADMIN_USER_IDS={user?.id || "your_user_id"}</code>
          </div>
        </div>
        <p className="text-xs text-muted-foreground text-center">After updating your .env file, restart your development server for changes to take effect.</p>
      </div>
    </Card>
  )
}
