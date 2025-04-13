import { requireAdmin } from "@/lib/auth-utils"
import { AdminBreadcrumb } from "@/components/nav/admin-breadcrumb"
import { supabaseAdmin } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MailingListSubscriberTable } from "@/components/admin/mailing-list/mailing-list-subscriber-table"

async function getSubscribers() {
  try {
    const { data, error } = await supabaseAdmin.from("mailing_list_subscriptions").select().order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error fetching subscribers:", JSON.stringify(error, null, 2))
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error in getSubscribers:", JSON.stringify(error, null, 2))
    return []
  }
}

export default async function AdminMailingListPage() {
  // Check if the user is an admin
  await requireAdmin()

  // Fetch subscribers
  const subscribers = await getSubscribers()

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
        <CardContent>
          <MailingListSubscriberTable subscribers={subscribers} />
        </CardContent>
      </Card>
    </div>
  )
}
