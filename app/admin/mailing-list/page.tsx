import { requireAdmin } from "@/lib/auth-utils"
import { AdminBreadcrumb } from "@/components/nav/admin-breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MailingListSubscriberTable } from "@/components/admin/mailing-list/mailing-list-subscriber-table"
import { getMailingListSubscriptions } from "@/lib/services/mailing-list"
import { Doc } from "@/convex/_generated/dataModel"

type ConvexSubscription = Doc<"mailing_list_subscriptions">

function serializeForClient(subscriber: ConvexSubscription) {
  return {
    id: subscriber._id,
    userId: subscriber.userId,
    email: subscriber.email,
    name: subscriber.name ?? null,
    preferences: subscriber.preferences,
    subscribedAt: new Date(subscriber.subscribedAt).toISOString(),
    unsubscribedAt: subscriber.unsubscribedAt ? new Date(subscriber.unsubscribedAt).toISOString() : null,
    createdAt: new Date(subscriber.createdAt).toISOString(),
    updatedAt: new Date(subscriber.updatedAt).toISOString(),
  }
}

export default async function AdminMailingListPage() {
  // Check if the user is an admin
  await requireAdmin()

  // Fetch subscribers through the service layer
  const subscribers = await getMailingListSubscriptions()

  // Serialize the data for client components
  const serializedSubscribers = subscribers.map(serializeForClient)

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
          <MailingListSubscriberTable subscribers={serializedSubscribers} />
        </CardContent>
      </Card>
    </div>
  )
}
