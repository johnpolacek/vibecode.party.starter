import { requireAdmin } from "@/lib/auth-utils"
import { AdminBreadcrumb } from "@/components/nav/admin-breadcrumb"
import { supabaseAdmin } from "@/lib/supabase"

async function getAnalyticsData() {
  // Get visits from the last 30 days
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const { data: visits, error } = await supabaseAdmin.from("user_visits").select("*").gte("timestamp", thirtyDaysAgo.toISOString()).order("timestamp", { ascending: false })

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
        <p className="text-muted-foreground">View site analytics and user activity</p>
      </div>

      <div className="grid gap-6">
        {/* Total Visits Card */}
        <div className="rounded-lg border p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Total Visits (30 Days)</h2>
          <p className="text-3xl font-bold">{analyticsData.length}</p>
        </div>

        {/* Recent Visits Table */}
        <div className="rounded-lg border shadow-sm">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Visits</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Path</th>
                    <th className="text-left p-2">Timestamp</th>
                    <th className="text-left p-2">User ID</th>
                    <th className="text-left p-2">Referrer</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsData.slice(0, 10).map((visit, index) => (
                    <tr key={index} className="border-b text-sm">
                      <td className="p-2">{visit.path}</td>
                      <td className="p-2">{new Date(visit.timestamp).toLocaleString()}</td>
                      <td className="p-2">{visit.user_id || "Anonymous"}</td>
                      <td className="p-2">{visit.referrer || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
