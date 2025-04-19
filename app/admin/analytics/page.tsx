import { requireAdmin } from "@/lib/auth-utils"
import { AdminBreadcrumb } from "@/components/nav/admin-breadcrumb"
import { supabaseAdmin } from "@/lib/supabase"
import { Heading } from "@/components/typography/heading"
import { Card, CardHeader } from "@/components/ui/card"

async function getAnalyticsData() {
  // Get visits from the last 30 days
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  // Try using timestamp column first, fall back to created_at if timestamp doesn't exist
  const { data: visits, error } = await supabaseAdmin.from("user_visits").select("*").gte("created_at", thirtyDaysAgo.toISOString()).order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching analytics data:", error)
    return []
  }

  return visits
}

export default async function AdminAnalyticsPage() {
  // Check if the user is an admin
  await requireAdmin()

  // Fetch analytics data
  const analyticsData = await getAnalyticsData()

  return (
    <div className="container py-8">
      <AdminBreadcrumb items={[{ label: "Analytics" }]} />

      <div className="mb-8">
        <h1 className="text-4xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">View and manage user visits</p>
      </div>

      <div className="grid gap-6">
        {/* Total Visits Card */}
        <Card>
          <CardHeader>
            <Heading variant="h4" className="text-primary">
              Total Visits (30 Days)
            </Heading>
          </CardHeader>
          <div className="px-6">
            <p className="text-3xl font-bold">{analyticsData.length}</p>
          </div>
        </Card>

        {/* Recent Visits Table */}
        <Card>
          <CardHeader>
            <Heading variant="h4" className="text-primary">
              Recent Visits
            </Heading>
          </CardHeader>
          <div className="px-6 pb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Path</th>
                    <th className="text-left p-2">Time</th>
                    <th className="text-left p-2">User ID</th>
                    <th className="text-left p-2">Referrer</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsData.slice(0, 10).map((visit, index) => (
                    <tr key={index} className="border-b text-sm">
                      <td className="p-2">{visit.path}</td>
                      <td className="p-2">{new Date(visit.created_at).toLocaleString()}</td>
                      <td className="p-2">{visit.user_id || "Anonymous"}</td>
                      <td className="p-2">{visit.referrer || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
