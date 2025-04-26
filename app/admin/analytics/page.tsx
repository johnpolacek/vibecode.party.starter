import { requireAdmin } from "@/lib/auth-utils"
import { AdminBreadcrumb } from "@/components/nav/admin-breadcrumb"
import { Heading } from "@/components/typography/heading"
import { Card, CardHeader } from "@/components/ui/card"
import { getAllVisits } from "@/lib/services/visits"

function getThirtyDaysAgo() {
  const date = new Date()
  date.setDate(date.getDate() - 30)
  return date
}

export default async function AdminAnalyticsPage() {
  // Check if the user is an admin
  await requireAdmin()

  // Fetch all visits (or use a Convex query to filter by date if available)
  const allVisits = await getAllVisits()
  const thirtyDaysAgo = getThirtyDaysAgo().getTime()

  // Filter visits from the last 30 days
  const analyticsData = allVisits.filter((visit) => visit.createdAt >= thirtyDaysAgo)

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
                  {analyticsData.slice(0, 10).map((visit) => (
                    <tr key={visit._id} className="border-b text-sm">
                      <td className="p-2">{visit.path}</td>
                      <td className="p-2">{new Date(visit.createdAt).toLocaleString()}</td>
                      <td className="p-2">{visit.userId || "Anonymous"}</td>
                      <td className="p-2">{visit.metadata?.referrer || "-"}</td>
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
