import { Metadata } from "next"
import { requireAdmin } from "@/lib/auth-utils"
import { AdminBreadcrumb } from "@/components/nav/admin-breadcrumb"
import { SendNotificationForm } from "@/components/admin/send-notification-form"
import { supabaseAdmin } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Admin - Notifications",
  description: "Send and manage notifications",
}

export default async function AdminNotificationsPage() {
  // Check if the user is an admin
  await requireAdmin()

  // Fetch recent notifications
  const { data: recentNotifications } = await supabaseAdmin
    .from("notifications")
    .select(
      `
      *,
      hackathon:hackathons (
        title,
        slug
      )
    `
    )
    .order("created_at", { ascending: false })
    .limit(50)

  return (
    <div className="container py-10">
      <AdminBreadcrumb items={[{ label: "Notifications" }]} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Notifications</h1>
        <p className="text-muted-foreground">Send notifications to hackathon participants.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Send Notification Form */}
        <div>
          <SendNotificationForm />
        </div>

        {/* Recent Notifications */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Notifications</h2>
          <div className="space-y-4">
            {recentNotifications && recentNotifications.length > 0 ? (
              recentNotifications.map((notification) => (
                <Card key={notification.id}>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{notification.title}</h3>
                        <span className="text-xs text-muted-foreground">{formatDate(notification.created_at)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      {notification.hackathon && <p className="text-xs text-muted-foreground">Sent to participants in: {notification.hackathon.title}</p>}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">No notifications sent yet.</CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
