import { requireAdmin } from "@/lib/auth-utils"
import { AdminBreadcrumb } from "@/components/nav/admin-breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MailingListSubscriberTable } from "@/components/admin/mailing-list/mailing-list-subscriber-table"
import { getMailingListSubscriptions } from "@/lib/services/mailing-list"
import { Timestamp } from "firebase-admin/firestore"
import { ClientMailingListSubscription, MailingListSubscription } from "@/types/firebase"

interface TimestampLike {
  _seconds: number
  _nanoseconds: number
}

// Helper to serialize timestamps
function serializeSubscriber(subscriber: MailingListSubscription): ClientMailingListSubscription {
  const serializeTimestamp = (timestamp: Timestamp | null) => {
    if (!timestamp) return null
    if (timestamp instanceof Timestamp) {
      return timestamp.toDate().toISOString()
    }
    if (typeof timestamp === "object" && "_seconds" in timestamp) {
      const timestampLike = timestamp as TimestampLike
      return new Date(timestampLike._seconds * 1000).toISOString()
    }
    return null
  }

  return {
    ...subscriber,
    subscribed_at: serializeTimestamp(subscriber.subscribed_at) || new Date().toISOString(),
    unsubscribed_at: serializeTimestamp(subscriber.unsubscribed_at),
    created_at: serializeTimestamp(subscriber.created_at) || new Date().toISOString(),
    updated_at: serializeTimestamp(subscriber.updated_at) || new Date().toISOString(),
  }
}

export default async function AdminMailingListPage() {
  // Check if the user is an admin
  await requireAdmin()

  // Fetch subscribers through the service layer
  const subscribers = await getMailingListSubscriptions()

  // Serialize the data for client components
  const serializedSubscribers = subscribers.map(serializeSubscriber)

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
