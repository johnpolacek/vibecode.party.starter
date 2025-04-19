import { requireAdmin } from "@/lib/auth-utils"
import { AdminBreadcrumb } from "@/components/nav/admin-breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MailingListSubscriberTable } from "@/components/admin/mailing-list/mailing-list-subscriber-table"
import { getMailingListSubscriptions } from "@/lib/services/mailing-list"

export default async function AdminMailingListPage() {
  // Check if the user is an admin
  await requireAdmin()

  // Fetch subscribers through the service layer
  const subscribers = await getMailingListSubscriptions()

  return (
    <div className="container py-8">
      <AdminBreadcrumb items={[{ label: "Mailing List" }]} />

      <div className="mb-8">
        <h1 className="text-4xl font-bold">Mailing List Subscribers</h1>
        <p className="text-muted-foreground">View and manage newsletter subscribers</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Subscribers</CardTitle>
        </CardHeader>
        <CardContent className="pb-6">
          <MailingListSubscriberTable subscribers={subscribers} />
        </CardContent>
      </Card>
    </div>
  )
}
